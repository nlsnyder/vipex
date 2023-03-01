<template>
  <AppNav />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppNav from "@/components/layout/AppNav.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap");
body,
html {
  color: #444;
  font-family: "Rubik", sans-serif;
}
</style>
