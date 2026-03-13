import { createVerificationLink } from "../utils/createEmailVerificationLink.js";
import { generateToken } from "../utils/generateVerificationToken.js";
import { sendEmail } from "./email.service.js";
import { verificationEmailTemplate } from "../templates/emails/verifyEmail.template.js";
import { emailVerifiedTemplate } from "../templates/emails/emailConfirmation.template.js";

export async function sendVerificationEmail(user) {
    const token = generateToken();
    user.emailVerificationToken = token;
    user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const link = createVerificationLink(token);

    await sendEmail({
        to: user.email,
        subject: "Email Verification",
        html: verificationEmailTemplate({ name: user.fullname, verificationLink: link })
    });
}


export async function sendVerificationConfirmationEmail(user) {
    await sendEmail({
        to: user.email,
        subject: "Verification Confirmation",
        html: emailVerifiedTemplate(user.fullname),
    })
}