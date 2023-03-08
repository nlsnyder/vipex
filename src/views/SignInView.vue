<template>
  <div class="flex items-center flex-col gap-6 py-12">
    <h1 class="text-4xl tracking-wide font-medium">Login</h1>
    <SignInForm :errors="errors" />
    <span class="uppercase font-medium">or</span>
    <button
      @click="signInWithGoogle"
      class="p-2 rounded border-slate-500 border-2 hover:bg-slate-100"
    >
      Sign in with Google
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
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from "vue";

const store = useAuthStore();

const errors = ref<string[]>([]);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(getAuth(), provider);
    window.localStorage.setItem("authenticated", "true");
    // Update auth store with user credentials and logged in state
    store.setAuthState({
      isAuthenticated: true,
      user: result.user,
    });
    router.push("/");
  } catch (err) {
    console.log(err);
    // Show error modal with message
  }
};
</script>
