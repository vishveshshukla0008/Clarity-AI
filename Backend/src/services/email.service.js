import { createTransport } from "nodemailer";

const emailTransporter = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});


emailTransporter.verify()
    .then(() => { console.log("Email Transporter is ready to send emails"); })
    .catch((err) => console.log(err));


export async function sendEmail({ to, subject, html, text }) {

    if (!to) {
        throw new Error("Recipient email (to) is required");
    }

    const mailOptions = {
        from: "Perplexity AI",
        to,
        subject,
        html,
        text
    };

    const details = await emailTransporter.sendMail(mailOptions);

    console.log("Email sent:", details);
}














// Steps :

// 1. Goto google console and make a project :
// 2. Make the gmail api enable
// 3. goto o auth consent screen option : and get started and fill some details :
// 4. come back and go to the credentials option and create credentials for o auth client id and secret :
