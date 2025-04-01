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
			cid: `ii_${image.trim().replace(/^.*\//g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`,
			filename: image.trim().replace(/^.*\//g, '')
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
`Colin Bendell (Cambodia, Rotary Wheels for Learning)	cambodia+colin@rotarywheelsforlearning.com	t2coulth@gmail.com	colin@bendell.ca	Todd	$100	Colin	2 bicycles	Kampot Province	Colin	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01849.JPG
Colin Bendell (Cambodia, Rotary Wheels for Learning)	cambodia+colin@rotarywheelsforlearning.com	derosadeanna@gmail.com	colin@bendell.ca	Deanna	$50	Colin	1 bicycle	Kampot Province	Colin	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01857.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	alyssa-joyce@hotmail.com	derfinpet@gmail.com	Alyssa	$200	Fred	4 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01860.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	amberwhitephn@gmail.com	derfinpet@gmail.com	Amber	$200	Fred	4 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01871.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	ashleym_taylor@outlook.com	derfinpet@gmail.com	Ashley	$200	Fred	4 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01884.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	autumnrosewhite@gmail.com	derfinpet@gmail.com	Autumn	$200	Fred	4 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01894.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	karen.yvp@gmail.com	derfinpet@gmail.com	Robert	$200	Fred	4 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01901.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	Carolbkr00@gmail.com	derfinpet@gmail.com	Carol	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01909.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	christinecrawford0410@gmail.com	derfinpet@gmail.com	Christine	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01920.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	Claudeheon@sympatico.ca	derfinpet@gmail.com	Claude	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01926.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	cspiers8@gmail.com	derfinpet@gmail.com	Connie	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01933.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	dg.marshall@rogers.com	derfinpet@gmail.com	David	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01937.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	gillieguignion1@gmail.com	derfinpet@gmail.com	Gillie	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01942.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	jbevand@hotmail.com	derfinpet@gmail.com	John	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01944.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	lorne.eastaugh@globalserve.net	derfinpet@gmail.com	Lorne	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01954.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	mikebidal@gmail.com	derfinpet@gmail.com	Mike	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01960.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	vonrosenstiel@globalserve.net	derfinpet@gmail.com	Frank Von	$100	Fred	2 bicycles	Kampot Province	Fred	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01960.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	hchayter@gmail.com	derfinpet@gmail.com	Helen	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01972.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	hjwpriestley@hotmail.com	derfinpet@gmail.com	Holly	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01978.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	jbooner@hotmail.ca	derfinpet@gmail.com	Johana	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01982.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	krbps23@gmail.com	derfinpet@gmail.com	Kevin	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01986.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	Lmgrant6219@icloud.com	derfinpet@gmail.com	Lynda	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01991.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	rosekirkman3@gmail.com	derfinpet@gmail.com	Rose	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01995.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	sueceq@hotmail.com	derfinpet@gmail.com	Susan	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01998.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	wendyk23@icloud.com	derfinpet@gmail.com	Wendy	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02004.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	alfred2375@outlook.com	derfinpet@gmail.com	Harry	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02008.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	brutusband2@gmail.com	derfinpet@gmail.com	Dan	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02010.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	cmlebel61@gmail.com	derfinpet@gmail.com	Cynthia	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01972.JPG
Fred White (Cambodia, Rotary Wheels for Learning)	cambodia+fred@rotarywheelsforlearning.com	crawford.rosalind@gmail.com	derfinpet@gmail.com	Rosalind	$50	Fred	1 bicycle	Kampot Province	Fred	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC01978.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	marsha1@rogers.com	dwong11@gmail.com	Marsha	$250	Danny	5 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02012.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	esterik@yorku.ca	dwong11@gmail.com	Penny	$200	Danny	4 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02015.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	rcwong@shaw.ca	dwong11@gmail.com	Richard and Carol	$200	Danny	4 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02019.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	anders.hayden@gmail.com	dwong11@gmail.com	Anders	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02021.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	dabm5678@hotmail.com	dwong11@gmail.com	David	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02024.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	dianne.bradley@sympatico.ca	dwong11@gmail.com	Dianne	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02027.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	kposgate@cogeco.ca	dwong11@gmail.com	Ken	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02031.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	mariaacalleja16@gmail.com	dwong11@gmail.com	Maria	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02034.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	marinakern@hotmail.com	dwong11@gmail.com	Marina	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02036.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	saposgate@gmail.com	dwong11@gmail.com	Susan	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02040.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	volsencat@gmail.com	dwong11@gmail.com	Virginia	$100	Danny	2 bicycles	Kampot Province	Danny	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02042.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	rick.beaver@rogers.com	dwong11@gmail.com	Rick	$50	Danny	1 bicycle	Kampot Province	Danny	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02044.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	s_cangialosi@bell.net	dwong11@gmail.com	Sam	$50	Danny	1 bicycle	Kampot Province	Danny	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02047.JPG
Danny Wong (Cambodia, Rotary Wheels for Learning)	cambodia+dannywong@rotarywheelsforlearning.com	harpreetkaurneelam@gmail.com	dwong11@gmail.com	Harpreet	$50	Danny	1 bicycle	Kampot Province	Danny	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02053.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	rovenm@yahoo.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Roven	$100	Jennifer & Patrick	2 bicycles	Kampot Province	Jennifer & Patrick	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02055.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	stephaniepopovitch@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Stephanie	$100	Jennifer & Patrick	2 bicycles	Kampot Province	Jennifer & Patrick	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC02057.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	countygal8@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Rhonda	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02049.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	denisesnow68@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Denise	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02061.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	durbandean@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Sean	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02063.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	karrox2000_ca@yahoo.ca	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Roxane	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02065.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	kphilip@hpedsb.on.ca	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Karrie	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02070.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	sharbel49@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Sharon	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02072.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	suemargreid@yahoo.ca	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Susan	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02096.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	countygal8@gmail.com	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Rhonda	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02107.JPG
Jennifer Menard (Cambodia, Rotary Wheels for Learning)	cambodia+jennifer@rotarywheelsforlearning.com	srogers28@cogeco.ca	jennifermenard@royallepage.ca,tapdranem@hotmail.com	Shirley	$50	Jennifer & Patrick	1 bicycle	Kampot Province	Jennifer & Patrick	kid	Build 7 - Teuk Chou Pong Rok Primary School/DSC02110.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	mikejamescole@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Mike	$100	Patrick, Louise & Liam	2 bicycles	Kampot Province	Patrick, Louise & Liam	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01911.JPG
Patrick Bongers (Cambodia, Rotary Wheels for Learning)	cambodia+patrickbongers@rotarywheelsforlearning.com	mikejamescole@gmail.com	bongers.pr@gmail.com, louise.paynterbongers@gmail.com, liambongers@gmail.com,	Mike	$100	Patrick, Louise & Liam	2 bicycles	Kampot Province	Patrick, Louise & Liam	kids	Build 7 - Teuk Chou Pong Rok Primary School/DSC01918.JPG`;

let email_list = SOURCE.split('\n').map(line => line.split('\t'));

async function createEmails() {
	for (const email of email_list) {
		await createEmailContent(imapConfig, ...email)
	}
	await closeConnection();
}

createEmails();

