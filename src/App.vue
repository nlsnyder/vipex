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
import router from "@/router";

const store = useAuthStore();

onMounted(() => {
  if (window.localStorage.getItem("authenticated") === "true" && getAuth()) {
    const lastLogin = window.localStorage.getItem("lastLogin");
    if (lastLogin) {
      if (!shouldRelogin(lastLogin)) {
        store.setAuthState({
          user: getAuth().currentUser,
          isAuthenticated: true,
        });
      } else {
        redirectToLogin();
      }
    } else {
      redirectToLogin();
    }
  } else {
    redirectToLogin();
  }
});

onUnmounted(() => {
  window.localStorage.setItem("authenticated", "false");
});

const shouldRelogin = (lastLoginTime: string) => {
  // Convert both
  const currentEpochTime = Date.parse(new Date().toLocaleString());
  const lastLoginEpochTime = Date.parse(lastLoginTime);
  // redirect to login if more than 60 minutes has passed since visiting the site
  if (currentEpochTime - lastLoginEpochTime > 3600000) {
    return true;
  } else {
    return false;
  }
};

const redirectToLogin = () => {
  window.localStorage.clear();
  store.clearAuthState();
  router.push("/signin");
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
body,
html {
  color: #444;
  font-family: "Rubik", sans-serif;
}
</style>
