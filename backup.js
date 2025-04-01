// const fs = require('fs');
// const path = require('path');
// const { gmail } = require('./email');

// async function createDraftEmail() {
//     try {
//         // Read the image file and convert to base64
//         const imagePath = path.join(__dirname, 'example-image.jpg');

// 				const to_email = ""

// 				const from_name = "Colin Bendell (Cambodia, Rotary Wheels for Learning)"
// 				const from_email = "cambodia+colin@rotarywheelsforlearning.com"

// 				const donation = "$200"

// 				const team_first_name = "Colin"
// 				const bicles = "4 bicycles"
// 				const province = "Phnom Sampov"
// 				const kids = "kids"
// 				const pictured = "Colin"

// 				const from_email_line = `"${from_email}" <${from_name}>`

// 				const bicycleImageData = fs.readFileSync(path.join(__dirname, bicycleImage));
// 				const bicycleImageBase64 = bicycleImageData.toString('base64');

// 				const rotaryLogoData = fs.readFileSync(path.join(__dirname, rotaryLogo));
// 				const rotaryLogoBase64 = rotaryLogoData.toString('base64');

//         // Create email content
//         const emailContent = [
//             `From: ${from_email_line}`,
//             `To: ${to_email}`,
//             'Subject: See Your Impact: Bicycles 🚲 Delivered to Cambodian Kids! 🇰🇭',
// 						'Content-Type: multipart/alternative; boundary="00000000000016f56e062cc01f90"',
// 						'',
// 						'--00000000000016f56e062cc01f90',
// 						'Content-Type: multipart/alternative; boundary="000000000000d91b8e062cc06a4a"',
// 						'',
// 						'--000000000000d91b8e062cc06a4a',
// 						'Content-Type: text/plain; charset="UTF-8"',
// 						'Content-Transfer-Encoding: quoted-printable',
// 						'',
// 						'Chom reap sour from Cambodia! =F0=9F=87=B0=F0=9F=87=AD=F0=9F=9A=B2',
// 						'',
// 						`Thank you for your ${donation} donation to Rotary Wheels for Learning. Because of`,
// 						`your generosity, ${team_first_name} and team were able to refurbish and provide ${bicles}`,
// 						`to children in the ${province} of Cambodia, enabling`,
// 						`easier access to education! =F0=9F=93=96`,
// 						'',
// `(See the picture of ${pictured} and the ${kids} you helped below)`,
// '',
// 'This year, thanks to supporters like you, we are distributing 644 bicycles',
// 'across six Cambodian provinces and 7 schools. That=E2=80=99s 12,062 bicycle\'s over',
// 'the last 13 years!',
// '',
// 'This project also provides 8 schools:',
// '',
// '   -',
// '',
// '   =F0=9F=9A=B0 water-filtration systems & latrines',
// '   -',
// '   =F0=9F=8D=9A food',
// '   -',
// '   =E2=9C=8F=EF=B8=8F school supplies',
// '   -',
// '   =E2=9C=8F=EF=B8=8F school supplies',
// '   -',
// '   =F0=9F=98=81 dental hygiene',
// '   -',
// '   =E2=9A=BD=F0=9F=A5=8F sports equipment',
// '',
// 'For more updates and stories, check out our Facebook page.',
// '',
// 'Best regards,',
// '',
// 'Your 2025 Rotary Team - Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, Mike C (lead), Mike M, Nola, Pat B, Patrick M, Ross, Ryan, Sokhal (local coordinator), Theresa, Troy',
// '',
// '',
// '',
// '',
// '=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87',
// '',
// '',
// '=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87',
// '',
// '',
// 'If you have read this far, you might be interested read more: =F0=9F=91=87=',
// '=F0=9F=91=87',
// '',
// 'This year=E2=80=99s project includes:',
// '',
// '   -',
// '',
// '   Andong Roveang Primary School in Kampong Chhnang province',
// '   <https://en.wikipedia.org/wiki/Kampong_Chhnang_Province> (82)',
// '   -',
// '',
// '   Dach Proat Primary School, in Bavel District, Battambang',
// '   <https://en.wikipedia.org/wiki/Battambang_Province> (102)',
// '   -',
// '',
// '   Kantout Commune in Svay Leu District, Siem Reap Province',
// '   <https://en.wikipedia.org/wiki/Siem_Reap_Province> (102)',
// '   -',
// '',
// '   Ron Ta Ek Primary School in Banteay Srey District',
// '   <https://en.wikipedia.org/wiki/Banteay_Srei_District> (102)',
// '   -',
// '',
// '   Team Ler Primary School in Ratanakiri Province',
// '   <https://en.wikipedia.org/wiki/Ratanakiri_Province> (72)',
// '   -',
// '',
// '   Chhlong Primary School in Chhloung District, Kratie Province',
// '   <https://en.wikipedia.org/wiki/Kratie_Province> (82)',
// '   -',
// '',
// '   Teuk Chou Pong Rok Primary School, Kampot Province',
// '   <https://en.wikipedia.org/wiki/Kampot_Province> (102)',
// '',
// '',
// 'You can see these locations on Google Maps:',
// 'https://maps.app.goo.gl/ujosoFrbKGxEoUDs5',
// '',
// '--000000000000d91b8e062cc06a4a',
// 'Content-Type: text/html; charset="UTF-8"',
// 'Content-Transfer-Encoding: quoted-printable',
// '',
// splitLongString(`<div dir="ltr"><span id="gmail-docs-internal-guid-62a99682-7fff-59c7-dbb1-4f7138ebef51"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;font-style:italic;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Chom reap sour</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> from Cambodia! =F0=9F=87=B0=F0=9F=87=AD</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=9A=B2</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Thank you for your ${donation} donation to Rotary Wheels for Learning. Because of your generosity, ${team_first_name} and team were able to refurbish and provide ${bicycles} =F0=9F=9A=B2to children in the ${province} province of Cambodia, enabling easier access to education! =F0=9F=93=96=C2=A0</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">(See the picture of ${pictured} and the ${kids} you helped below)</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">This year, thanks to supporters like you, we are distributing </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">644 bicycles</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> across six Cambodian provinces and 7 schools. That=E2=80=99s 12,062 bicycles over the last 13 years!</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">This project also provides </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">8 schools</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">:</span></p><ul style="margin-top:0px;margin-bottom:0px"><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=9A=B0 water-filtration systems &amp; latrines</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=8D=9A food</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=E2=9C=8F=EF=B8=8F school supplies</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=98=81 dental hygiene</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=E2=9A=BD=F0=9F=A5=8F sports equipment</span></p></li></ul><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">For more updates and stories, check out our </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Facebook page</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">.</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Best regards,=C2=A0</span></p><br><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Your 2025 Rotary Team - </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(55,65,81);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(55,65,81);background-color:transparent;font-weight:700;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Mike C (lead)</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(55,65,81);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">, Mike M, Nola, Pat B, Patrick M, Ross, Ryan, </span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(55,65,81);background-color:transparent;font-weight:700;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Sokhal (local coordinator)</span><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(55,65,81);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">, Theresa, Troy</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><br></p><br><div class="gmail_chip gmail_chip_bubble gmail_spinner" style="width:542px;height:542px;border:1px dashed #e0e0e0;background-color:#f0f0f0;display:inline-block"><img src="//ssl.gstatic.com/ui/v1/icons/mail/inline_image_placeholder.png" style="padding-top: 188px; margin: auto; width: 108px; height: 106px; display: block; opacity: 0.07"><img src="//ssl.gstatic.com/ui/v1/icons/mail/flapper-gray-EE-60.gif" style="padding-top: 30px; padding-bottom: 30px; margin: auto; width: 30px; height: 30px; display: block;"></div><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt"><br></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87</span></p><br>
// <p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt">
// <span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">
// // <span style="border:none;display:inline-block;overflow:hidden;width:576px;height:138px">
// // <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdQEbMoD8dxrz5dTGSGPc-NY-bA9b-4_4BT8cHxU5yJoSDjJTu4_iJqQ47EvT-rB7YkvvflVijnxkakP10LnrUexypIwevpfctgTWZxTvcypBz1ZatCcFTmjp_EiTmGwUst_ENPlg?key=vUr1mgV1HwVb5C91yynReVog" width="576" height="138" style="margin-left: 0px; margin-top: 0px;">
// // </span>
// // </span>
// // </p>
// // <br>
// // <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87=F0=9F=91=87</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"><br></span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">If you have read this far, you might be interested read more: =F0=9F=91=87=F0=9F=91=87</span></p><br><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">This year=E2=80=99s project includes:</span></p><ul style="margin-top:0px;margin-bottom:0px"><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Andong Roveang Primary School in </span><a href="https://en.wikipedia.org/wiki/Kampong_Chhnang_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Kampong Chhnang province</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (82)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Dach Proat Primary School, in Bavel District, </span><a href="https://en.wikipedia.org/wiki/Battambang_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Battambang</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (102)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Kantout Commune in Svay Leu District, </span><a href="https://en.wikipedia.org/wiki/Siem_Reap_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Siem Reap Province</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (102)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Ron Ta Ek Primary School in </span><a href="https://en.wikipedia.org/wiki/Banteay_Srei_District" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Banteay Srey District</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (102)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Team Ler Primary School in </span><a href="https://en.wikipedia.org/wiki/Ratanakiri_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Ratanakiri Province</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (72)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Chhlong Primary School in Chhloung District, </span><a href="https://en.wikipedia.org/wiki/Kratie_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Kratie Province</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (82)</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:12pt;font-family:Arial,sans-serif;color:rgb(0,0,0);background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline;white-space:pre"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt" role="presentation"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">Teuk Chou Pong Rok Primary School, </span><a href="https://en.wikipedia.org/wiki/Kampot_Province" style="text-decoration-line:none"><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">Kampot Province</span></a><span style="font-size:12pt;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline"> (102)</span></p></li></ul><br><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt"><span style="font-size:12pt;font-family:Arial,sans-serif;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;vertical-align:baseline">You can see these locations on Google Maps: </span><a href="https://maps.app.goo.gl/ujosoFrbKGxEoUDs5" style="text-decoration-line:none"><span style="font-size:12pt;font-family:Arial,sans-serif;background-color:transparent;font-variant-numeric:normal;font-variant-east-asian:normal;font-variant-alternates:normal;text-decoration-line:underline;vertical-align:baseline">https://maps.app.goo.gl/ujosoFrbKGxEoUDs5</span></a></p><br></span></div>`),
// '',
// '--000000000000d91b8e062cc06a4a--',
// '--00000000000016f56e062cc01f90,',
// 'Content-Type: image/jpeg; name="Colin 2 Children 1.jpg"',
// 'Content-Disposition: inline; filename="Colin 2 Children 1.jpg"',
// 'Content-Transfer-Encoding: base64',
// 'Content-ID: <ii_m6g845kj0>',
// 'X-Attachment-Id: ii_m6g845kj0',
// '',
// imageBase64,
// '',
// '--00000000000016f56e062cc01f90--',
//         ].join('\n');

//         // Create the draft
//         const draft = await gmail.users.drafts.create({
//             userId: 'me',
//             requestBody: {
//                 message: {
//                     raw: Buffer.from(emailContent).toString('base64url')
//                 }
//             }
//         });

//         console.log('Draft created successfully:', draft.data);
//         return draft.data;
//     } catch (error) {
//         console.error('Error creating draft:', error);
//         throw error;
//     }
// }

// Gmail API requires authentication and proper setup
const path = require('path');
const fs = require('fs');
const fs = require('fs');
const path = require('path');

const Imap = require('imap')
const inspect = require('util').inspect;

const imap = new Imap({
  user: 'mygmailname@gmail.com',
  password: 'mygmailpassword',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
fUVV/vf9KCouH0/TnZin68LTfvvEnFZ5hhzHPH3ei35Kr5/Rt6KnjPHTcK7oGZhSVPWvsBtVnqLv
function splitLongString(str, len = 75, suffix = '=') {
	const chunks = [];
	let i = 0;
	while (i < str.length) {
			if (i + len < str.length) {
					chunks.push(str.slice(i, i + len) + '=');
			} else {
					chunks.push(str.slice(i));
			}
			i += len;
	}
	return chunks.join('\n');
}

async function createEmailContent() {
    try {
        // Read the image file and convert to base64
				const bicycleImage = 'bicycle.jpg';
        const rotaryLogo = 'rotary-wheels-for-learning-logo.jpg';

        const to_email = ""
        const from_name = "Colin Bendell (Cambodia, Rotary Wheels for Learning)"
        const from_email = "cambodia+colin@rotarywheelsforlearning.com"
        const donation = "$200"
        const team_first_name = "Colin"
        const bicycles = "4 bicycles"
        const province = "Phnom Sampov"
        const kids = "kids"
        const pictured = "Colin"

        const from_email_line = `${from_name} <${from_email}>`
				const bicycleImageData = fs.readFileSync(path.join(__dirname, bicycleImage));
				const bicycleImageBase64 = bicycleImageData.toString('base64');

				const rotaryLogoData = fs.readFileSync(path.join(__dirname, rotaryLogo));
				const rotaryLogoBase64 = rotaryLogoData.toString('base64');

        // Create the plain text version
        const plainText = `
Chom reap sour from Cambodia! 🇰🇭🚲

Thank you for your ${donation} donation to Rotary Wheels for Learning. Because of your generosity, ${team_first_name} and team were able to refurbish and provide ${bicycles} 🚲 to children in the ${province} of Cambodia, enabling easier access to education! 📖

(See the picture of ${pictured} and the ${kids} you helped below)

This year, thanks to supporters like you, we are distributing 644 bicycles across six Cambodian provinces and 7 schools. That's 12,062 bicycle's over the last 13 years!

This project also provides 8 schools:

   - 🚰 water-filtration systems & latrines
   - 🍚 food
   - ✏️ school supplies
   - 😁 dental hygiene
   - ⚽🥏 sports equipment

For more updates and stories, check out our Facebook page: https://www.facebook.com/groups/1854040031526486/

Best regards,

Your 2025 Rotary Team - Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, Mike C (lead), Mike M, Nola, Pat B, Patrick M, Ross, Ryan, Sokhal (local coordinator), Theresa, Troy

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
        const htmlContent = `
<div style="font-family: Arial, sans-serif;">
    <p><strong><em>Chom reap sour</em></strong> from Cambodia! 🇰🇭🚲</p>
		<br>
    <p>Thank you for your ${donation} donation to Rotary Wheels for Learning. Because of your generosity, ${team_first_name} and team were able to refurbish and provide ${bicycles} 🚲 to children in the ${province} of Cambodia, enabling easier access to education! 📖</p>
		<br>
    <p>(See the picture of ${pictured} and the ${kids} you helped below)</p>
		<br>
    <p>This year, thanks to supporters like you, we are distributing <strong>644 bicycles</strong> across six Cambodian provinces and 7 schools. That's 12,062 bicycles over the last 13 years!</p>
		<br>
    <p>This project also provides <strong>8 schools</strong>:</p>
    <ul>
        <li>🚰 water-filtration systems & latrines</li>
        <li>🍚 food</li>
        <li>✏️ school supplies</li>
        <li>😁 dental hygiene</li>
        <li>⚽🥏 sports equipment</li>
    </ul>
		<br>
    <p>For more updates and stories, check out our <a href="https://www.facebook.com/groups/1854040031526486/">Facebook page</a>.</p>
		<br>
    <p>Best regards,</p>
		<br>
    <p>Your 2025 Rotary Team - Ciara, Colin, Dan, Danny, David, Elizabeth, Fred, Jennifer, Liam, Liam, Louise, Meridith, <strong>Mike C (lead)</strong>, Mike M, Nola, Pat B, Patrick M, Ross, Ryan, <strong>Sokhal (local coordinator)</strong>, Theresa, Troy</p>
		<br>
    <img src="cid:donation-image" alt="Picture of ${pictured} and the ${kids} you helped" style="max-width: 100%; height: auto;">

		<br>
		<img src="cid:rotary-logo" alt="${rotaryLogo}" width="576" height="138">
		<br>
		<br>
		<img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdQEbMoD8dxrz5dTGSGPc-NY-bA9b-4_4BT8cHxU5yJoSDjJTu4_iJqQ47EvT-rB7YkvvflVijnxkakP10LnrUexypIwevpfctgTWZxTvcypBz1ZatCcFTmjp_EiTmGwUst_ENPlg?key=vUr1mgV1HwVb5C91yynReVog" width="576" height="138" style="margin-left: 0px; margin-top: 0px;">
		<br>
		<p>👇👇👇👇</p>
		<br>
		<p>If you have read this far, you might be interested read more: 👇👇</p>
		<br>
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
		<br>
		<p>You can see these locations on Google Maps: https://maps.app.goo.gl/ujosoFrbKGxEoUDs5</p>
		<br>
</div>`;

        // Create email content with multipart structure
        const emailContent = [
            `From: ${from_email_line}`,
            `To: ${to_email}`,
            'Subject: See Your Impact: Bicycles 🚲 Delivered to Cambodian Kids! 🇰🇭',
            'MIME-Version: 1.0',
            'Content-Type: multipart/mixed; boundary="mixed-boundary"',
            '',
            '--mixed-boundary',
            'Content-Type: multipart/alternative; boundary="alt-boundary"',
            '',
            '--alt-boundary',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: quoted-printable',
            '',
            plainText,
            '',
            '--alt-boundary',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: quoted-printable',
            '',
            htmlContent,
            '',
            '--alt-boundary--',
            '',
            '--mixed-boundary',
            `Content-Type: image/jpeg; name="${bicycleImage}"`,
            `Content-Disposition: inline; filename="${bicycleImage}"`,
            'Content-Transfer-Encoding: base64',
            'Content-ID: <donation-image>',
            'X-Attachment-Id: donation-image',
            '',
            bicycleImageBase64,
            '',
            '--mixed-boundary',
            `Content-Type: image/jpeg; name="${rotaryLogo}"`,
            `Content-Disposition: inline; filename="${rotaryLogo}"`,
            'Content-Transfer-Encoding: base64',
            'Content-ID: <rotary-logo>',
            'X-Attachment-Id: rotary-logo',
            '',
            rotaryLogoBase64,
            '',
            '--mixed-boundary--'
        ].join('\n');

				return emailContent;

    } catch (error) {
        console.error('Error creating draft:', error);
        throw error;
    }
}


// Call the function
createEmailContent();
;const fs = require('fs');
const Imap = require('imap');
const path = require('path');

