<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="{
      tooltip: true,
    }"
  >
    <div
      class="icon-container"
      @mouseenter="() => (showTooltip = true)"
      @mouseleave="() => (showTooltip = false)"
    >
      <i class="pi pi-info-circle"></i>
    </div>
    <div
      :class="{ active: showTooltip, 'tooltip-text': true, 'shadow-lg': true }"
    >
      <div class="carat"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showTooltip = ref(false);
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}

.icon-container {
  display: flex;
  cursor: pointer;
}

.tooltip-text {
  position: absolute;
  visibility: hidden;
  background-color: #ffc681;
  border: 2px solid #f9a339;
  color: #444;
  padding: 10px;
  border-radius: 4px;
  white-space: normal;
  left: 25px; /* Adjust the distance from the icon */
  top: 50%;
  transform: translateY(-50%);
  width: 250px;
  max-height: 200px;
  overflow-wrap: anywhere;
}

.tooltip-text.active {
  visibility: visible;
}
.carat {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #f9a339;
}
</style>
