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
    <div :class="{ active: showTooltip, 'tooltip-text': true }">
      <div class="carat"></div>
      <div class="tooltip-message"><slot></slot></div>
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
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f9a339;
  color: #333;
  padding: 10px;
  border-radius: 4px;
  opacity: 1;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
  z-index: 1000;
  inline-size: 300px;
  overflow-wrap: break-word;
}

.tooltip-text.active {
  visibility: visible;
}

.tooltip-message {
  width: 300px;
  max-height: 200px;
  overflow-wrap: anywhere;
}

.carat {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #f9a339;
}
</style>
