<template>
  <CommonModal
    @close-modal="closeModal"
    :show-modal="showModal"
    :type="modalState.errors ? ModalType.ERROR : ModalType.SUCCESS"
  >
    <template #body>
      <div class="p-4 w-4/6 m-auto text-center text-slate-600 mb-4">
        <p>
          {{ modalState.messages[0] }}
        </p>
      </div>
    </template>
    <template #footer-actions>
      <div
        class="bg-red-500 text-white font-medium justify-center gap-2 p-3 border-neutral-300 border-t flex items-center"
      >
        <button
          @click="closeModal"
          class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          Continue
        </button>
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </div>
    </template>
  </CommonModal>
  <CommonLoader v-if="queryState.loading" :loading="queryState.loading" />
  <div
    v-else-if="expensesExist"
    class="height-custom w-11/12 lg:w-1/2 m-auto my-12 flex flex-col"
  >
    <ViewExpenses :user-expenses="queryState.userExpenses" />
  </div>
  <div v-else class="h-96 flex flex-col items-center justify-center gap-4">
    <NoExpenses />
  </div>
</template>

<script setup lang="ts">
import { UserExpense } from "@/interfaces/expenses/interfaces";
import { getAuth, User } from "@firebase/auth";
import { computed, onMounted, reactive } from "vue";
import { FirebaseService } from "@/services/FirebaseService";
import CommonModal from "@/components/common/CommonModal.vue";
import CommonLoader from "@/components/common/CommonLoader.vue";
import NoExpenses from "@/components/view-expenses/NoExpenses.vue";
import ViewExpenses from "@/components/view-expenses/ViewExpenses.vue";
import { ModalType } from "@/util/enums";
import { useExpensesStore } from "@/stores/expenses";

const firebase = new FirebaseService();
const expenseStore = useExpensesStore();

interface Modal {
  errors: boolean;
  messages: string[];
}

const queryState = reactive<{ userExpenses: UserExpense[]; loading: boolean }>({
  userExpenses: [],
  loading: false,
});
const modalState = reactive<Modal>({
  errors: false,
  messages: [],
});

// Computed Properties
const showModal = computed(() => {
  return modalState.messages.length > 0;
});

const expensesExist = computed(() => {
  return queryState.userExpenses.length > 0;
});

// Component functions
const closeModal = () => {
  modalState.messages = [];
  modalState.errors = false;
};

// Subscribe to whenever the expenses state changes due to edit
// or deletion of expense
expenseStore.$subscribe(
  (_mutation, state) => {
    queryState.userExpenses = state.expenses;
  },
  { detached: true }
);

onMounted(async () => {
  fetchUserSalary();
  fetchUserExpenses();
});

const fetchUserSalary = async () => {
  let user: User | null = getAuth().currentUser;
  if (user != null) {
    try {
      const response = await firebase.getSalaryForUser(user.uid, {});
      if (response != null && response.status === 200) {
        expenseStore.$patch({
          ...expenseStore.$state,
          salary: response.data,
          fetchState: { ...expenseStore.$state.fetchState, salary: true },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const fetchUserExpenses = async () => {
  queryState.loading = true;
  if (expenseStore.expenses.length > 0 && expenseStore.fetchState.expenses) {
    queryState.userExpenses = expenseStore.expenses;
    queryState.loading = false;
    return;
  }
  let user: User | null = getAuth().currentUser;
  if (user != null) {
    let idToken = await user?.getIdToken();
    try {
      const response = await firebase.getExpensesForUser(user.uid, {
        params: {
          auth: idToken,
        },
      });
      if (response.status === 200) {
        if (response.data) {
          let loadedExpenses: UserExpense[] = [];
          for (const [key, value] of Object.entries(response.data)) {
            value.itemId = key;
            loadedExpenses.push(value);
          }
          queryState.userExpenses = loadedExpenses;
          expenseStore.$patch({
            expenses: loadedExpenses,
            fetchState: { ...expenseStore.$state.fetchState, expenses: true },
          });
        }
      }
    } catch (error) {
      modalState.errors = true;
      modalState.messages.push(
        "An error occurred when retrieving your expenses. Please try again."
      );
    }
  }
  queryState.loading = false;
};
</script>
