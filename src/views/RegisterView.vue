<template>
  <div class="flex items-center flex-col gap-6 py-12">
    <h1 class="text-4xl tracking-wide font-medium">Create account</h1>
    <RegisterForm />
    <div class="flex items-center gap-2">
      <p class="text-slate-600 flex-auto">Already have an account?</p>
      <router-link
        class="text-orange-400 hover:underline hover:underline-offset-2"
        to="/signin"
        >Sign in.</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/auth/RegisterForm.vue";
</script>
