<template>
  <AppNav v-if="store.authState.user" />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppNav from "@/components/layout/AppNav.vue";
import { useAuthStore } from "./stores/auth";

const store = useAuthStore();
console.log(store.authState.user);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
body,
html {
  color: #444;
  font-family: "Rubik", sans-serif;
}
</style>
