<template>
  <AppNav v-if="store.authState.isAuthenticated" />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppNav from "@/components/layout/AppNav.vue";
import { onMounted, onUnmounted } from "vue";
import { getAuth } from "@firebase/auth";
import { useAuthStore } from "./stores/auth";

const store = useAuthStore();

onMounted(() => {
  if (window.localStorage.getItem("authenticated") === "true") {
    store.setAuthState({
      user: getAuth().currentUser,
      isAuthenticated: true,
    });
  }
});

onUnmounted(() => {
  window.localStorage.setItem("authenticated", "false");
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
body,
html {
  color: #444;
  font-family: "Rubik", sans-serif;
}
</style>
