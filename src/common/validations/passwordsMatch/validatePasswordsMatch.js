function validatePasswordsMatch(
  passwordKey = 'password',
  passwordConfirmationKey = 'passwordConfirmationKey',
) {
  return this.parent[passwordKey] === this.parent[passwordConfirmationKey];
}

export default validatePasswordsMatch;
