export function resetPasswordTemplate({ name, resetLink }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>

  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td style="background:#0f172a;color:#ffffff;padding:24px;text-align:center;font-size:20px;font-weight:600;">
                Clarity AI
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 30px;color:#333333;font-size:16px;line-height:1.6;">
                
                <p style="margin-top:0;">Hi ${name},</p>

                <p>
                  We received a request to reset the password for your 
                  <strong>Clarity AI</strong> account.
                </p>

                <p>
                  Click the button below to set a new password.
                </p>

                <p style="text-align:center;margin:35px 0;">
                  <a href="${resetLink}" 
                    style="
                      background:#2563eb;
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:600;
                      display:inline-block;
                    ">
                    Reset Password
                  </a>
                </p>

                <p>
                  If the button above doesn't work, copy and paste this link into your browser:
                </p>

                <p style="word-break:break-all;color:#2563eb;">
                  ${resetLink}
                </p>

                <p>
                  This password reset link will expire in <strong>15 Minutes</strong>.
                </p>

                <p>
                  If you did not request a password reset, you can safely ignore this email.  
                  Your password will remain unchanged.
                </p>

                <p style="margin-bottom:0;">
                  Best regards,<br/>
                  <strong>Clarity AI Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9;padding:20px;text-align:center;font-size:12px;color:#64748b;">
                © ${new Date().getFullYear()} Clarity AI. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}