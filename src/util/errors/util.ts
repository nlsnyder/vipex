export const convertFirebaseAuthError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Unable to create account. Email is already in use.";
    case "auth/credential-already-in-use":
      return "Account already exists with that email and password.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
    default:
      return "Something went wrong while creating your account. Please try again.";
  }
};
