<template>
  <div class="flex items-center flex-col gap-6 py-12">
    <h1 class="text-4xl tracking-wide font-medium">Login</h1>
    <SignInForm :errors="errors" />
    <span class="uppercase font-medium">or</span>
    <button
      @click="signInWithGoogle"
      class="shadow-md py-2 px-4 text-gray-500 rounded border-slate-500 border hover:bg-slate-100 flex items-center gap-2"
    >
      <img class="w-8 h-8" src="../assets/google-svg.webp" alt="google logo" />
      <span>Sign in with Google</span>
    </button>
    <div class="flex items-center gap-2">
      <p class="text-slate-600 flex-auto">Don't have an account?</p>
      <router-link
        class="text-orange-400 hover:underline hover:underline-offset-2"
        to="/register"
        >Create one.</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInForm from "@/components/auth/SignInForm.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { convertFirebaseAuthError } from "@/util/errors/util";
import { FirebaseError } from "@firebase/util";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from "vue";

const store = useAuthStore();

const errors = ref<string[]>([]);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(getAuth(), provider);
    // Update auth store with user credentials and logged in state
    window.localStorage.setItem("authenticated", "true");
    window.localStorage.setItem("lastLogin", new Date().toLocaleString());
    router.push("/");
    store.setAuthState({
      isAuthenticated: true,
      user: user,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      errors.value.push(convertFirebaseAuthError(error.code));
    }
  }
};
</script>
