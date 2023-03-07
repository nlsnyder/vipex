<template>
  <div class="flex items-center flex-col gap-6 py-12">
    <h1 class="text-4xl tracking-wide font-medium">Create account</h1>
    <RegisterForm />
    <span class="uppercase font-medium">or</span>
    <button
      @click="signInWithGoogle"
      class="p-2 rounded border-slate-500 border-2 hover:bg-slate-100"
    >
      Sign in with Google
    </button>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/auth/RegisterForm.vue";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const store = useAuthStore();

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
