<template>
  <div v-if="modalState.loading" class="overlay"></div>
  <sync-loader
    v-if="modalState.loading"
    :loading="modalState.loading"
    color="#F9A339"
    size="15px"
    class="center"
  ></sync-loader>
  <CommonModal
    @close-modal="closeModal"
    :show-modal="modalState.show"
    :errors="modalState.errors"
  >
    <template #body>
      <div class="p-4 w-4/6 m-auto text-center text-slate-600 mb-4">
        <p>
          {{
            modalState.messages
              ? modalState.messages[0]
              : "No modal body given. Must've been a success!"
          }}
        </p>
      </div>
    </template>
    <template #footer-actions>
      <div
        :class="{
          'bg-green-400': !modalState.errors,
          'bg-red-500': modalState.errors,
        }"
        class="text-white font-medium justify-center gap-2 p-3 border-neutral-300 border-t flex items-center"
      >
        <router-link
          v-if="!modalState.errors"
          class="hover:underline hover:underline-offset-4"
          to="/view-expenses"
          >View expenses</router-link
        >
        <span
          v-else
          @click="closeModal"
          class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
          >Continue</span
        >
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </div>
    </template>
  </CommonModal>
  <div class="bg-sky-200 custom-height flex items-center">
    <div class="w-11/12 md:w-3/5 m-auto justify-center items-center py-10">
      <div class="grow py-5 px-10 rounded-lg shadow bg-white">
        <h2 class="text-2xl font-semibold tracking-wide mb-10 text-center">
          Add an expense
        </h2>
        <AddExpenseForm
          @formSubmit="handleFormSubmit"
          @updateLoading="setLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddExpenseForm from "@/components/add-expense/AddExpenseForm.vue";
import CommonModal from "@/components/common/CommonModal.vue";
import { BaseFirebaseResponse } from "@/interfaces/expenses/interfaces";
import { reactive } from "vue";

interface Modal {
  show: boolean;
  errors: boolean;
  loading: boolean;
  messages?: string[];
}

const modalState: Modal = reactive({
  show: false,
  errors: false,
  loading: false,
  messages: [],
});

const setLoading = (value: boolean) => {
  modalState.loading = value;
};

// Component functions
const closeModal = () => {
  modalState.show = false;
};

const handleFormSubmit = (res: BaseFirebaseResponse) => {
  modalState.show = true;
  modalState.messages = res.messages;
  if (res.ok) {
    modalState.errors = false;
  } else {
    modalState.errors = true;
  }
};
</script>

<style scoped>
.shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.custom-height {
  height: 90vh;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
