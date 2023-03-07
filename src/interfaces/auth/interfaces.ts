import { User as FirebaseUser } from "firebase/auth";

export interface BaseAuthProfile {
  isAuthenticated: boolean | string;
  user: FirebaseUser | null | undefined;
}

export interface RegisterFormState {
  showPw: boolean;
  showConfirmPw: boolean;
  errors: string[];
}
