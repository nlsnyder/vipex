<template>
  <Teleport to="#modal">
    <Transition name="pop" appear>
      <div v-if="showModal">
        <div class="overlay">
          <Transition name="pop-slide" appear>
            <div v-if="showModal">
              <div class="modal rounded overflow-hidden">
                <ModalHeader
                  v-if="props.type !== ModalType.CUSTOM"
                  :type="props.type"
                  @close-modal="emit('closeModal')"
                />

                <header v-else class="py-3 px-5 background-main">
                  <h2 class="text-2xl font-medium">
                    {{ props.heading ?? "Modal" }}
                  </h2>
                  <font-awesome-icon
                    @click="emit('closeModal')"
                    class="text-lg hover:cursor-pointer absolute top-5 right-4"
                    icon="fa-solid fa-x"
                  />
                </header>
                <slot name="body"></slot>
                <slot name="footer-actions"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ModalHeader from "@/components/common/ModalHeader.vue";
import { ModalType } from "@/util/enums";

interface CommonModalProps {
  type: ModalType;
  heading?: string;
  showModal: boolean;
}

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const props = defineProps<CommonModalProps>();
</script>

<style>
.overlay {
  z-index: 50;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
}

.modal {
  z-index: 999;
  background-color: #f7f5fb;
  position: relative;
  width: 90%;
  top: 80px;
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
    width: 40%;
    left: 30%;
  }
}

.pop-slide-enter-from {
  transform: translateY(-3rem);
  opacity: 0;
}

.pop-slide-enter-active {
  transition: all 0.3s ease-out;
}

.pop-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
