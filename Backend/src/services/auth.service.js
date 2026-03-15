import {
    createResetPasswordLink,
    createVerificationLink,
} from "../utils/createEmailVerificationLink.js";
import { generateToken } from "../utils/generateVerificationToken.js";
import { sendEmail } from "./email.service.js";
import { verificationEmailTemplate } from "../templates/emails/verifyEmail.template.js";
import { emailVerifiedTemplate } from "../templates/emails/emailConfirmation.template.js";
import { resetPasswordTemplate } from "../templates/emails/resetPassword.template.js";

export async function sendVerificationEmail(user) {
    const token = generateToken();
    user.emailVerificationToken = token;
    user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const link = createVerificationLink(token);

    await sendEmail({
        to: user.email,
        subject: "Email Verification",
        html: verificationEmailTemplate({
            name: user.fullname,
            verificationLink: link,
        }),
    });
}

export async function sendForgetPasswordLink(user) {
    const token = generateToken();
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const link = createResetPasswordLink(token);

    await sendEmail({
        to: user.email,
        subject: "Reset Password",
        html: resetPasswordTemplate({
            name: user.fullname,
            resetLink: link,
        }),
    });
}

export async function sendVerificationConfirmationEmail(user) {
    await sendEmail({
        to: user.email,
        subject: "Verification Confirmation",
        html: emailVerifiedTemplate(user.fullname),
    });
}


export async function sendResetPasswordConfirmationEmail(user) {
    await sendEmail({
        to: user.email,
        subject: "Password Reset Success !",
        html: emailVerifiedTemplate(user.fullname),
    });
}
