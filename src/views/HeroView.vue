<template>
  <HeroSection class="hero" />
  <HeroIconList />
</template>

<script setup lang="ts">
import HeroSection from "@/components/hero/HeroSection.vue";
import HeroIconList from "@/components/hero/HeroIconList.vue";
</script>

<style scoped>
.hero {
  background: rgb(249, 163, 57);
  background: linear-gradient(
    180deg,
    rgba(249, 163, 57, 1) 0%,
    rgba(255, 198, 129, 0.9458377100840336) 10%,
    rgba(247, 245, 251, 1) 30%
  );
}
</style>
