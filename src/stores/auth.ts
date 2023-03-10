import { defineStore } from "pinia";
import { BaseAuthProfile } from "@/interfaces/auth/interfaces";
import { ref } from "vue";

const initialState = { isAuthenticated: false, user: undefined };

export const useAuthStore = defineStore("auth", () => {
  const authState = ref<BaseAuthProfile>(initialState);

  function setAuthState(state: BaseAuthProfile) {
    authState.value = state;
  }

  function clearAuthState() {
    authState.value = initialState;
  }

  return { authState, setAuthState, clearAuthState };
});
