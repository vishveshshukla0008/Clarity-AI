export function createVerificationLink(token) {
  return `http://localhost:8080/api/auth/verify-email/${token}`;
}