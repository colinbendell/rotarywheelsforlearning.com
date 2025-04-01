const path = require("path");
const fs = require("fs");
const Imap = require('imap-iobroker');

/**
 * Sleep for specified milliseconds
 * @param {number} ms - milliseconds to sleep
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function splitLongString(str, len = 75, suffix = '=') {
	const chunks = [];
	let i = 0;
	while (i < str.length) {
			if (i + len < str.length) {
					chunks.push(str.slice(i, i + len) + suffix);
			} else {
					chunks.push(str.slice(i));
			}
			i += len;
	}
	return chunks.join('\n');
}

let globalImap = null;
let isConnecting = false;

/**
 * Gets or creates an IMAP connection
 * @param {ImapConfig} imapConfig - IMAP configuration
 * @returns {Promise<Imap>} IMAP connection
 */
async function getImapConnection(imapConfig) {
	if (globalImap?.state === "authenticated") {
		return globalImap;
	}

	// Wait if another connection is being established
	while (isConnecting) {
		await sleep(1000);
	}

	isConnecting = true;
	try {
		if (globalImap) {
			try {
				globalImap.end();
			} catch (e) {
				console.log("Error closing existing connection:", e);
			}
		}

		globalImap = new Imap({
			user: imapConfig.user,
			password: imapConfig.password,
			host: imapConfig.host || "imap.gmail.com",
			port: imapConfig.port || 993,
			tls: imapConfig.tls !== false,
			tlsOptions: { servername: imapConfig.host || "imap.gmail.com" },
			keepalive: true,
		});

		await new Promise((resolve, reject) => {
			globalImap.once("isready", () => resolve());
			globalImap.once("error", (err) => reject(err));
			globalImap.connect();
		});

		// Set up error handler for connection
		globalImap.on("error", async (err) => {
			console.error("IMAP connection error:", err);
			if (err.code === "ECONNRESET") {
				console.log("Connection reset, waiting 20s before reconnect...");
				await sleep(20000);
				globalImap = null; // Force new connection on next use
			}
		});

		return globalImap;
	} finally {
		isConnecting = false;
	}
}

async function closeConnection() {
	if (globalImap) {
		await globalImap.end();
		globalImap = null;
	}
}

/**
 * Creates a draft email using IMAP
 * @param {EmailMessage} message - Email message object
 * @param {ImapConfig} imapConfig - IMAP configuration
 * @returns {Promise<void>}
 */
async function saveDraftEmail(message, imapConfig) {
	try {
		const imap = await getImapConnection(imapConfig);
		// Process attachments
		const attachmentData = await Promise.all(
			message.attachments.map(async (attachment) => {
				const data = await fs.promises.readFile(attachment.path);
				return {
					data: data.toString("base64"),
					...attachment,
				};
			})
		);

		// Create email content with multipart structure
		const emailContent = [
			`From: ${message.from}`,
			`To: ${message.to}`,
			`Cc: ${message.cc}`,
			`Subject: ${message.subject}`,
			"MIME-Version: 1.0",
			'Content-Type: multipart/mixed; boundary="mixed-boundary"',
			"",
			"--mixed-boundary",
			'Content-Type: multipart/alternative; boundary="alt-boundary"',
			"",
			"--alt-boundary",
			"Content-Type: text/plain; charset=UTF-8",
			"",
			message.textContent,
			"",
			"--alt-boundary",
			"Content-Type: text/html; charset=UTF-8",
			"",
			message.htmlContent,
			"",
			"--alt-boundary--",
		];

		// Add attachments
		for (const attachment of attachmentData) {
			const fileExtension = path.extname(attachment.filename).toLowerCase();
			const mimeType =
				fileExtension === ".png"
					? "image/png"
					: fileExtension === ".jpg" || fileExtension === ".jpeg"
					? "image/jpeg"
					: "application/octet-stream";

			emailContent.push(
				"--mixed-boundary",
				`Content-Type: ${mimeType}; name="${attachment.filename}"`,
				`Content-Disposition: attachment; filename="${attachment.filename}"`,
				"Content-Transfer-Encoding: base64",
				`X-Attachment-Id: ${attachment.cid}`,
				`Content-ID: <${attachment.cid}>`,
				"",
				splitLongString(attachment.data, 76, "")
			);
		}

		emailContent.push("--mixed-boundary--");

		// Open the Drafts folder
		await new Promise((res, rej) => {
			imap.openBox("[Gmail]/Drafts", false, (err) => {
				if (err) rej(err);
				else res();
			});
		});

		// Append the email to Drafts folder
		await new Promise((res, rej) => {
			imap.append(
				emailContent.join("\n"),
				{
					flags: ["\\Draft"],
					date: new Date(),
				},
				(err) => {
					if (err) rej(err);
					else res();
				}
			);
		});

		console.log(`Draft for ${message.to} saved successfully`);
	} catch (error) {
		if (error.code === "ECONNRESET") {
			return saveDraftEmail(message, imapConfig);
		}
		throw error;
	}
}

/**
 * Reads all draft emails using IMAP
 * @param {ImapConfig} imapConfig - IMAP configuration
 * @returns {Promise<Array<string>>} Array of raw email contents
 */
async function readDraftEmails(imapConfig) {
	const emails = [];
	let retryCount = 0;
	const maxRetries = 3;

	while (retryCount < maxRetries) {
		try {
			const imap = await getImapConnection(imapConfig);

			await new Promise((resolve, reject) => {
				imap.openBox("[Gmail]/Drafts", false, (err, box) => {
					if (err) reject(err);
					else resolve(box);
				});
			});

			const results = await new Promise((resolve, reject) => {
				imap.search(["ALL"], (err, results) => {
					if (err) reject(err);
					else resolve(results);
				});
			});

			if (!results || !results.length) {
				return [];
			}

			await new Promise((resolve, reject) => {
				const fetch = imap.fetch(results, {
					bodies: "",
					struct: true,
				});

				fetch.on("message", (msg) => {
					msg.on("body", (stream) => {
						let buffer = "";
						stream.on("data", (chunk) => {
							buffer += chunk.toString("utf8");
						});
						stream.once("end", () => {
							emails.push(buffer);
						});
					});
				});

				fetch.once("error", (err) => reject(err));
				fetch.once("end", () => resolve());
			});

			return emails;
		} catch (error) {
			console.error(`Attempt ${retryCount + 1} failed:`, error);
			if (error.code === "ECONNRESET") {
				retryCount++;
				if (retryCount < maxRetries) {
					console.log(`Waiting 20s before retry ${retryCount + 1}...`);
					await sleep(20000);
					continue;
				}
			}
			throw error;
		}
	}

	throw new Error("Max retries exceeded");
}

// Example usage:
async function listDrafts(imapConfig) {
	try {
		const drafts = await readDraftEmails(imapConfig);
		console.log("Found", drafts.length, "drafts");
		drafts.forEach((draft, index) => {
			console.log(`\n--- Draft ${index + 1} ---\n${draft}`);
		});
	} catch (error) {
		console.error("Error reading drafts:", error);
	}
}

module.exports = {
	saveDraftEmail,
	readDraftEmails,
	listDrafts,
	closeConnection,
};
