export function emailVerifiedTemplate(name) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Email Verified</title>
  </head>

  <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">

    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">

          <table width="600" style="background:white; border-radius:8px; padding:40px; text-align:center;">

            <tr>
              <td>

                <h2 style="color:#22c55e; margin-bottom:10px;">
                  Email Successfully Verified
                </h2>

                <p style="color:#555; font-size:16px;">
                  Hello ${name || "User"},
                </p>

                <p style="color:#555; font-size:16px;">
                  Your email address has been successfully verified.
                  You now have full access to your account.
                </p>

                <p style="color:#555; font-size:16px;">
                  You can now log in and start using all features of the platform.
                </p>

                <div style="margin:30px 0;">
                  <a 
                    href="${process.env.CLIENT_URL}/login"
                    style="
                      background:#4f46e5;
                      color:white;
                      padding:12px 24px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                    "
                  >
                    Login to your account
                  </a>
                </div>

                <p style="font-size:14px; color:#999;">
                  If you did not perform this action, please contact our support team immediately.
                </p>

                <p style="margin-top:30px; font-size:14px; color:#999;">
                  © ${new Date().getFullYear()} Clarity AI. All rights reserved.
                </p>

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