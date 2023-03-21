<template>
  <div class="icon-items">
    <font-awesome-icon class="icon" :icon="iconComputedName" />
    <p class="description w-4/5 text-center lg:w-full">
      {{ iconDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  iconName: string;
  iconDescription: string;
}>();

const iconComputedName = computed(() => {
  return "fa-solid " + props.iconName;
});
</script>

<style scoped>
.icon-items {
  display: flex;
  flex-direction: column;
}
.icon {
  height: 35px;
  width: 35px;
  padding: 1rem;
  color: #f9a339;
  background-color: #f8dcba;
  border-radius: 50%;
  margin-bottom: 2rem;
  align-self: center;
}

.description {
  line-height: 1.6;
  font-weight: 400;
  margin: 0 auto;
}
</style>
