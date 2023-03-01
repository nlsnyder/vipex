<template>
  <div v-if="showModal">
    <div @click="$emit('closeModal')" class="overlay"></div>
    <div class="modal rounded overflow-hidden">
      <header class="pt-6 flex flex-col items-center gap-3 text-2xl">
        <font-awesome-icon
          class="text-white p-2 rounded-full w-7 h-7"
          :class="{ 'bg-green-400': !errors, 'bg-red-500': errors }"
          :icon="`fa-solid ${errors ? 'fa-question' : 'fa-check'}`"
        />
        <h2
          class="grow uppercase font-medium tracking-wide"
          :class="{ 'text-green-400': !errors, 'text-red-500': errors }"
        >
          {{ errors ? "Error" : "Success" }}
        </h2>
        <font-awesome-icon
          @click="$emit('closeModal')"
          class="text-lg hover:cursor-pointer absolute top-3 right-3"
          icon="fa-solid fa-x"
        />
      </header>

      <slot name="body"></slot>
      <slot name="footer-actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showModal: boolean;
  errors: boolean;
}>();
</script>

<style scoped>
.overlay {
  z-index: 50;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}

.modal {
  z-index: 999;
  background-color: #f7f5fb;
  position: absolute;
  width: 90%;
  top: 25%;
  left: 5%;
}

@media (min-width: 768px) {
  .modal {
    width: 80%;
    left: 10%;
  }
}

@media (min-width: 992px) {
  .modal {
    width: 50%;
    left: 25%;
  }
}
</style>
