import { defineStore } from "pinia";
import { BaseAuthProfile } from "@/interfaces/auth/interfaces";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const authState = ref<BaseAuthProfile>({
    isAuthenticated: false,
    user: undefined,
  });

  function setAuthState(state: BaseAuthProfile) {
    authState.value = state;
  }

  return { authState, setAuthState };
});
