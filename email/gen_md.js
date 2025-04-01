// Gmail API requires authentication and proper setup
const path = require('path');
const fs = require('fs')
const crypto = require("crypto")

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  const data = crypto.createHash('md5').update(bytes).digest();
	return Array.from(data).map(v => v.toString(16).padStart(2, '0')).join('')
}

function fs_safe(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/gi, "_");
}

async function create_mark_down_file(
	from_name, from_email, to_email, cc_email,
	donor_first_name, donation,
	team_first_name, bicycles, province, pictured, kids,
	bicycle_image_name
) {
	// Read the image file and convert to base64

	const school = "Teuk Chou Pong Rok Primary School"
	const rotaryLogo = 'rotary-wheels-for-learning-logo.png';
	const output_filename = `${fs_safe(team_first_name)}_${fs_safe(donor_first_name)}_-_${fs_safe(bicycles)}_${md5(to_email + donation)}.md`
	const bicycle_image_names = bicycle_image_name.split(',');
	const image_list = bicycle_image_names.map(image => ({
		filename: `${fs_safe(team_first_name)}_${fs_safe(donor_first_name)}_-_${fs_safe(bicycles)}_-_${fs_safe(school)}.jpg`,
		original_path: image.trim(),
	})).map(image => ({
		...image,
		cid: `ii_${md5(image.filename)}`,
	}));

	for (image of image_list) {
		fs.copyFileSync(image.original_path, "data/" + image.filename)
	}

	// Create the plain text version
	const md = fs.readFileSync('bike_email_thank_you.md', 'utf-8')

	const output = md.replaceAll("${from_name}", from_name)
		.replaceAll("${from_email}", from_email)
		.replaceAll("${to_email}", to_email)
		.replaceAll("${cc_email}", cc_email)
		.replaceAll("${donor_first_name}", donor_first_name)
		.replaceAll("${donation}", donation)
		.replaceAll("${team_first_name}", team_first_name)
		.replaceAll("${bicycles}", bicycles)
		.replaceAll("${province}", province)
		.replaceAll("${pictured}", pictured)
		.replaceAll("${kids}", kids)
		.replaceAll("${bicycle_image_name}", image_list.map(image => image.filename).join(','))
		.replaceAll("${bicycle_image_1}", `${image_list[0]?.filename}`)
		.replaceAll("${bicycle_image_2}", `${image_list[1]?.filename}`)
		.replaceAll("${bicycle_image_3}", `${image_list[2]?.filename}`)
		.replaceAll("${bicycle_image_4}", `${image_list[3]?.filename}`)
		.replace(/.*\!\[[^\]]+\]\(undefined\)\n/g, '')

		fs.writeFileSync('data/' + output_filename, output)
}

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
		await create_mark_down_file(...email)
	}
}

createEmails();

