<template>
  <sync-loader
    :loading="props.loading"
    color="#F9A339"
    size="15px"
    class="center"
  ></sync-loader>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
}>();
</script>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
