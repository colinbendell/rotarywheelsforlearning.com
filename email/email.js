// Gmail API requires authentication and proper setup
const path = require('path');
const { saveDraftEmail, closeConnection } = require('./imap-utils');

/**
 * @typedef {Object} EmailMessage
 * @property {string} to - Recipient email address
 * @property {string} from - Sender email address
 * @property {string} subject - Email subject
 * @property {string} textContent - Plain text content
 * @property {string} htmlContent - HTML content
 * @property {Array<{path: string, cid: string, filename: string}>} attachments - Array of attachments
 */

/**
 * @typedef {Object} ImapConfig
 * @property {string} user - Email address
 * @property {string} password - Password or app-specific password
 * @property {string} host - IMAP server host
 * @property {number} port - IMAP server port
 * @property {boolean} tls - Whether to use TLS
 */

async function createEmailContent(
	imapConfig,
	from_name, from_email, to_email, cc_email,
	donor_first_name, donation,
	team_first_name, bicycles, province, pictured, kids,
	bicycle_image_name
) {
	try {
		// Read the image file and convert to base64
		const rotaryLogo = 'rotary-wheels-for-learning-logo.png';
		const bicycleImageList = bicycle_image_name.split(',').map(image => ({
			path: path.join(__dirname, image.trim()),
			cid: `ii_${image.trim().replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`,
			filename: image.trim()
		}));

		// Create the plain text version
		const plainText = `
Chom reap sour from Cambodia! 🇰🇭🚲

Thank you ${donor_first_name}, for your ${donation} donation to Rotary Wheels for Learning. Because of your generosity, ${team_first_name} and team were able to refurbish and provide ${bicycles} 🚲 to children in the ${province} of Cambodia, enabling easier access to education! 📖

(See the picture of ${pictured} and the ${kids} you helped below)

This year, thanks to supporters like you, we are distributing 644 bicycles across six Cambodian provinces and 7 schools. That's 12,062 bicycle's over the last 13 years!

This project also provides 8 schools:

	* 🚰 water-filtration systems & latrines
	* 🍚 food
	* ✏️ school supplies
	* 😁 dental hygiene
	* ⚽🥏 sports equipment

For more photos, updates, and stories about this project, check out our Facebook page: https://www.facebook.com/groups/1854040031526486/

Best regards,

Your 2025 Rotary Team - Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, Mike C (lead), Mike M, Nola, Pat B, Patrick M, Ross, Ryan, Sokhal (local coordinator), Theresa, Troy

![Picture of ${pictured} and the ${kids} you helped](cid:${bicycleImageList[0].cid})

![Rotary Wheels for Learning](cid:ii_rotary_logo)

👇👇👇👇

If you have read this far, you might be interested read more: 👇👇

This year’s project includes:
   - Andong Roveang Primary School in Kampong Chhnang province (82) https://en.wikipedia.org/wiki/Kampong_Chhnang_Province
   - Dach Proat Primary School, in Bavel District, Battambang (102) https://en.wikipedia.org/wiki/Battambang_Province
   - Kantout Commune in Svay Leu District, Siem Reap Province (102) https://en.wikipedia.org/wiki/Siem_Reap_Province
   - Ron Ta Ek Primary School in Banteay Srey District (102) https://en.wikipedia.org/wiki/Banteay_Srei_District
   - Team Ler Primary School in Ratanakiri Province (72) https://en.wikipedia.org/wiki/Ratanakiri_Province
   - Chhlong Primary School in Chhloung District, Kratie Province (82) https://en.wikipedia.org/wiki/Kratie_Province
   - Teuk Chou Pong Rok Primary School, Kampot Province (102) https://en.wikipedia.org/wiki/Kampot_Province

You can see these locations on Google Maps: https://maps.app.goo.gl/ujosoFrbKGxEoUDs5

`;

        // Create the HTML version
        let htmlContent = `
<div style="font-family: Arial, sans-serif;">
    <p><strong><em>Chom reap sour</em></strong> from Cambodia! 🇰🇭🚲</p>
    <p>Thank you ${donor_first_name}, for your ${donation} donation to Rotary Wheels for Learning. Because of your generosity, ${team_first_name} and team were able to refurbish and provide ${bicycles} 🚲 to children in the ${province} of Cambodia, enabling easier access to education! 📖</p>
    <p>(See the picture of ${pictured} and the ${kids} you helped below)</p>
    <p>This year, thanks to supporters like you, we are distributing <strong>644 bicycles</strong> across six Cambodian provinces and 7 schools. That's 12,062 bicycles over the last 13 years!</p>
    <p>This project also provides <strong>8 schools</strong>:</p>
    <ul>
        <li>🚰 water-filtration systems & latrines</li>
        <li>🍚 food</li>
        <li>✏️ school supplies</li>
        <li>😁 dental hygiene</li>
        <li>⚽🥏 sports equipment</li>
    </ul>
    <p>For more photos, updates, and stories about this project, check out our <a href="https://www.facebook.com/groups/1854040031526486/">Facebook page</a>.</p>
    <p>Best regards,</p>
    <p>Your 2025 Rotary Team - Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, <strong>Mike C (lead)</strong>, Mike M, Nola, Pat B, Patrick M, Ross, Ryan, <strong>Sokhal (local coordinator)</strong>, Theresa, Troy</p>
`
for (const image of bicycleImageList) {
htmlContent += `    <p style="display: flex; justify-content: center; align-items: center;">
      <img data-surl="cid:${image.cid}" src="cid:${image.cid}" alt="Picture of ${pictured} and the ${kids} you helped" width="576">
    </>
`
}
htmlContent += `		<p style="display: flex; justify-content: center; align-items: center;">
			<img data-surl="cid:ii_rotary_logo"  src="cid:ii_rotary_logo" alt="${rotaryLogo}" width="576">
		</>
		<br>
		<p>👇👇👇👇</p>
		<p>If you have read this far, you might be interested read more: 👇👇</p>
		<p>This year’s project includes:</p>
		<ul>
			<li>Andong Roveang Primary School in Kampong Chhnang province (82) https://en.wikipedia.org/wiki/Kampong_Chhnang_Province</li>
			<li>Dach Proat Primary School, in Bavel District, Battambang (102) https://en.wikipedia.org/wiki/Battambang_Province</li>
			<li>Kantout Commune in Svay Leu District, Siem Reap Province (102) https://en.wikipedia.org/wiki/Siem_Reap_Province</li>
			<li>Ron Ta Ek Primary School in Banteay Srey District (102) https://en.wikipedia.org/wiki/Banteay_Srei_District</li>
			<li>Team Ler Primary School in Ratanakiri Province (72) https://en.wikipedia.org/wiki/Ratanakiri_Province</li>
			<li>Chhlong Primary School in Chhloung District, Kratie Province (82) https://en.wikipedia.org/wiki/Kratie_Province</li>
			<li>Teuk Chou Pong Rok Primary School, Kampot Province (102) https://en.wikipedia.org/wiki/Kampot_Province</li>
		</ul>
		<p>You can see these locations on Google Maps: https://maps.app.goo.gl/ujosoFrbKGxEoUDs5</p>
</div>`;

		const message = {
			to: to_email,
			cc: cc_email,
			from: `${from_name} <${from_email}>`,
			subject: "See Your Impact: Bicycles 🚲 Delivered to Cambodian Kids! 🇰🇭",
			textContent: plainText,
			htmlContent: htmlContent,
			attachments: [...bicycleImageList,
				{
					path: path.join(__dirname, rotaryLogo),
					cid: "ii_rotary_logo",
					filename: rotaryLogo
				},
			]
		};
		await saveDraftEmail(message, imapConfig);
	}
	catch (error) {
		console.error('Error creating draft:', error);
		throw error;
	}
}

const imapConfig = {
	user: process.env.EMAIL_USER || "10rwfl@gmail.com",
	password: process.env.EMAIL_PASSWORD || "idugciktkpnzbgbd",
	host: 'imap.gmail.com',
	port: 993,
	tls: true
};

// FROM	FROM_EMAIL	TO	CC	DONOR_FIRST_NAME	DONATION	TEAM_MEMBER_DONATION_FIRST	DONACTION_BICYCLE_COUNT	PROVINCE	TEAM_MEMBER_PICTURED	KIDS_SINGLE_OR_PLURAL	IMAGES
const SOURCE =
`Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	robertpjacob@hotmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Robert	$1,000	Patrick, Louise & Liam	20 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00001.JPG, DSC00002.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	bonitadart@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Bonnie	$250	Patrick, Louise & Liam	5 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00009.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	mcdivitt54@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Pam	$200	Patrick, Louise & Liam	4 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00015.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	kenonkahshe@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Ken	$200	Patrick, Louise & Liam	4 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00022.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	marktoday@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Mark	$100	Patrick, Louise & Liam	2 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00024.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	haydee.traviss@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Haydee	$100	Patrick, Louise & Liam	2 bicycles	Kampong Chhnang	Patrick, Louise & Liam	kids	DSC00027.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	davidparekh50@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	David	$50	Patrick, Louise & Liam	1 bicycle	Kampong Chhnang	Patrick, Louise & Liam	kid	DSC00030.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	eric@cashylake.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Eric	$50	Patrick, Louise & Liam	1 bicycle	Kampong Chhnang	Patrick, Louise & Liam	kid	DSC00032.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	bonnie16jean@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Bonnie	$50	Patrick, Louise & Liam	1 bicycle	Kampong Chhnang	Patrick, Louise & Liam	kid	DSC00034.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	cath1402@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Catherine	$50	Patrick, Louise & Liam	1 bicycle	Kampong Chhnang	Patrick, Louise & Liam	kid	DSC00038.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	johnhcooper@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	John Harris	$500	Patrick, Louise, Liam & Ross	10 bicycles	Kampong Chhnang	Patrick, Louise, Liam & Ross	kids	DSC00044.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	augustine@vianet.ca	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Richard	$50	Patrick, Louise, Liam & Ross	1 bicycle	Kampong Chhnang	Patrick, Louise, Liam & Ross	kid	DSC00046.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	dreid@sothebysrealty.ca	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	David	$50	Patrick, Louise, Liam & Ross	1 bicycle	Kampong Chhnang	Patrick, Louise, Liam & Ross	kid	DSC00048.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	visentin@rogers.com	rdjeffery@outlook.com	Karen and David	$500	Ross	10 bicycles	Kampong Chhnang	Ross	kids	DSC00050.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	rdjeffery@outlook.com	rdjeffery@outlook.com	Ross and Diane	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00052.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	allyn.abbott@sympatico.ca	rdjeffery@outlook.com	Allyn	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00053.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	bdart@vianet.ca	rdjeffery@outlook.com	Bruce	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00055.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	stolpmannpeter@gmail.com	rdjeffery@outlook.com	Peter	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00060.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	johnlatour1955@gmail.com	rdjeffery@outlook.com	John	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00064.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	kay70godden@gmail.com	rdjeffery@outlook.com	Kay	$200	Ross	4 bicycles	Kampong Chhnang	Ross	kids	DSC00065.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	jacquiejeffery@yahoo.ca	rdjeffery@outlook.com	Jacqueline	$100	Ross	2 bicycles	Kampong Chhnang	Ross	kids	DSC00069.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	k-jenkins@live.ca	rdjeffery@outlook.com	Kristy	$100	Ross	2 bicycles	Kampong Chhnang	Ross	kids	DSC00076.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	sbuessecker.rmt@gmail.com	rdjeffery@outlook.com	Stephanie	$100	Ross	2 bicycles	Kampong Chhnang	Ross	kids	DSC00080.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	anita.m.jeffery@gmail.com	rdjeffery@outlook.com	Minawattee	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00081.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	coulterbl@sympatico.ca	rdjeffery@outlook.com	William	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00083.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	dave@margonichols.com	rdjeffery@outlook.com	Dave	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00086.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	eharkiss@outlook.com	rdjeffery@outlook.com	Elaine	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00088.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	ijeffery005@gmail.com	rdjeffery@outlook.com	Ian	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00089.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	itytler@hotmail.com	rdjeffery@outlook.com	Ian	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00090.JPG
Ross Jeffery (Cambodia, Rotary Wheels for Learning)	cambodia+ross@rotarywheelsforlearning.com	robin.mccleave@gmail.com	rdjeffery@outlook.com	Robin	$50	Ross	1 bicycle	Kampong Chhnang	Ross	kid	DSC00091.JPG`;

let email_list = SOURCE.split('\n').map(line => line.split('\t'));

async function createEmails() {
	for (const email of email_list) {
		await createEmailContent(imapConfig, ...email)
	}
	closeConnection();
}

createEmails();

