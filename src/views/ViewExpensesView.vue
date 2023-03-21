<template>
  <CommonModal
    @close-modal="closeModal"
    :show-modal="showModal"
    :errors="modalState.errors"
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
        <span
          @click="closeModal"
          class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
          >Continue</span
        >
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </div>
    </template>
  </CommonModal>
  <sync-loader
    v-if="queryState.loading"
    :loading="queryState.loading"
    color="#F9A339"
    size="15px"
    class="center"
  ></sync-loader>
  <div
    v-else-if="expensesExist"
    class="height-custom w-11/12 lg:w-1/2 m-auto my-12 flex flex-col"
  >
    <h2 class="mb-10 text-3xl text-center">Expenses</h2>
    <div class="background p-3 md:p-10 rounded-lg shadow-lg">
      <ul class="list-none flex flex-col gap-y-6">
        <li
          v-for="expense in queryState.userExpenses"
          :key="expense.itemId"
          class="flex items-stretch gap-x-4 background-light rounded-lg shadow overflow-hidden"
        >
          <div class="bg-white flex flex-col justify-between gap-y-0.5">
            <span
              class="uppercase text-center text-slate-500 font-medium tracking-wider text-sm pt-2"
              >{{ getMonth(expense.datePurchased) }}</span
            >
            <span class="text-center black font-bold text-xl">{{
              getDay(expense.datePurchased)
            }}</span>
            <span
              class="text-center text-slate-500 bg-slate-100 text-sm font-medium px-4 py-px tracking-wider"
            >
              {{ getYear(expense.datePurchased) }}</span
            >
          </div>
          <div class="flex-auto py-3">
            <p class="mb-1 text-xl font-medium">{{ expense.retailerName }}</p>
            <hr />
            <p class="mt-1 text-sm italic text-zinc-600">
              {{ expense.itemDescription }}
            </p>
          </div>
          <span class="text-xl self-center pr-5 py-3">{{
            formattedPrice(expense.cost)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="h-96 flex flex-col items-center justify-center gap-4">
    <h1 class="text-4xl mb-3">You don't have any expenses!</h1>
    <button
      class="p-2 flex gap-2 items-center justify-center addButton border rounded-md border-black"
    >
      <router-link to="/add-expense">Add One Now</router-link>
      <font-awesome-icon class="plusIcon" icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { UserExpense } from "@/interfaces/expenses/interfaces";
import { getAssociatedMonth } from "@/util/enums";
import { getAuth, User } from "@firebase/auth";
import { computed, onMounted, reactive } from "vue";
import { FirebaseService } from "@/services/FirebaseService";
import CommonModal from "@/components/common/CommonModal.vue";
const firebase = new FirebaseService();

interface Modal {
  errors: boolean;
  messages: string[];
}

const queryState = reactive<{ userExpenses: UserExpense[]; loading: boolean }>({
  userExpenses: [],
  loading: true,
});
const modalState: Modal = reactive({
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

const formattedPrice = (amount: string | number) => {
  return `$ ${amount}`;
};

const getMonth = (date: string) => {
  const dateSplit = date.split("-");
  const num: number = parseInt(dateSplit[1], 10);
  return getAssociatedMonth(num);
};

const getDay = (date: string) => {
  return date.split("-")[2];
};

const getYear = (date: string) => {
  return date.split("-")[0];
};

// Component functions
const closeModal = () => {
  modalState.messages = [];
  modalState.errors = false;
};

onMounted(async () => {
  let user: User | null = null;
  user = getAuth().currentUser;
  if (user != null) {
    try {
      const response = await firebase.getExpensesForUser(user.uid);
      if (response.status === 200) {
        if (response.data) {
          let expenses: UserExpense[] = [];
          for (const [key, value] of Object.entries(response.data)) {
            value.itemId = key;
            expenses.push(value);
          }
          queryState.userExpenses = expenses;
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
});
</script>

<style scoped>
.plusIcon {
  height: 20px;
  animation: spinner 1.5s 1;
  animation-delay: 0.5s;
}

.addButton {
  transition: all 0.1s;
}

.addButton:hover {
  animation: bounce 0.3s 1;
  color: #f9a339;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}

.height-custom {
  height: 90vh;
}

.background {
  background-color: #f9a339;
}

.background-light {
  background-color: #ffc681;
}

hr {
  background-color: #333;
  color: #333;
  border: none;
  height: 1.5px;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
