<template>
  <header class="pt-6 flex flex-col items-center gap-3 text-2xl">
    <font-awesome-icon
      class="text-white p-2 rounded-full w-7 h-7"
      :class="{
        'bg-green-400': props.type === ModalType.SUCCESS,
        'bg-red-500': props.type === ModalType.ERROR,
      }"
      :icon="`fa-solid ${
        props.type === ModalType.ERROR ? 'fa-question' : 'fa-check'
      }`"
    />
    <h2
      class="grow uppercase font-medium tracking-wide"
      :class="{
        'text-green-400': type === ModalType.SUCCESS,
        'text-red-500': type === ModalType.ERROR,
      }"
    >
      {{ props.type === ModalType.ERROR ? "Error" : "Success" }}
    </h2>
    <font-awesome-icon
      @click="emit('closeModal')"
      class="text-lg hover:cursor-pointer absolute top-3 right-3"
      icon="fa-solid fa-x"
    />
  </header>
</template>

<script setup lang="ts">
import { ModalType } from "@/util/enums";

const props = defineProps<{
  type: ModalType;
}>();

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();
</script>
