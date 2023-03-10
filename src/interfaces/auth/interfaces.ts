import { User as FirebaseUser } from "firebase/auth";

export interface BaseAuthProfile {
  isAuthenticated: boolean | string;
  user: FirebaseUser | null | undefined;
}

export interface BaseAuthFormState {
  showPw: boolean;
  errors: string[];
  loading?: boolean;
}

export interface RegisterFormState extends BaseAuthFormState {
  showConfirmPw: boolean;
}
