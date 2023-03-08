export const convertFirebaseAuthError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Unable to create account. Email is already in use.";
    case "auth/credential-already-in-use":
      return "Account already exists with that email and password.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.";
    case "auth/wrong-password":
      return "The password you entered is incorrect.";
    case "auth/invalid-email":
      return "The email entered is not valid. Please enter a valid email.";
    case "auth/user-not-found":
      return "Unable to find user account with the given email.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    default:
      return "Something went wrong while authenticating your account. Please try again.";
  }
};
