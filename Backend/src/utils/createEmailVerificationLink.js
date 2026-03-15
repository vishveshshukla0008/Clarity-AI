export function createVerificationLink(token) {
  return `${process.env.FRONTEND_URL}/api/auth/verify-email/${token}`;
}


export function createResetPasswordLink(token) {
  return `${process.env.FRONTEND_URL}/api/auth/reset-password/${token}`;
}