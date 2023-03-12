<template>
  <div v-if="false" class="my-12 text-center">Loading...</div>
  <div
    v-else-if="expensesExist"
    class="height-custom w-10/12 lg:w-1/2 m-auto my-12 flex flex-col"
  >
    <h2 class="mb-10 text-3xl text-center">Expenses</h2>
    <div class="background p-3 md:p-10 rounded-lg shadow-lg">
      <ul class="list-none flex flex-col gap-y-6">
        <li
          v-for="expense in queryState.userExpenses"
          :key="expense.itemId"
          class="flex items-baseline gap-x-4 py-3 pl-3 pr-5 background-light rounded-lg shadow"
        >
          <div
            class="flex flex-col bg-white shadow-inner py-3 px-5 gap rounded-lg items-center"
          >
            <span
              >{{ getMonth(expense.datePurchased) }}
              {{ getDay(expense.datePurchased) }}</span
            >
            <span>{{ getYear(expense.datePurchased) }}</span>
          </div>
          <div class="grow">
            <p class="mb-1 text-xl font-medium">{{ expense.retailerName }}</p>
            <hr />
            <p class="mt-1 text-sm italic text-zinc-600">
              {{ expense.itemDescription }}
            </p>
          </div>
          <span class="text-xl self-center">{{
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
import { FirebaseService } from "@/services/FirebaseService";
import { useAuthStore } from "@/stores/auth";
import { getAssociatedMonth } from "@/util/enums";
import { User, getAuth } from "@firebase/auth";
import { computed, onMounted, reactive } from "vue";
const authStore = useAuthStore();
const firebase = new FirebaseService();

const queryState = reactive<{ loading: boolean; userExpenses: UserExpense[] }>({
  loading: false,
  userExpenses: [],
});

// Computed Properties
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

// Component Functions
onMounted(async () => {
  let auth: User | null;
  if (!authStore.authState.user) {
    auth = getAuth().currentUser;
    authStore.setAuthState({ ...authStore.authState, user: auth });
  } else {
    auth = authStore.authState.user;
  }
  // if (response) {
  //   if (response.status === 200) {
  //     const data = response.data;
  //     // Only need value object for expense, not associated id that is created with it in Firebase POST
  //     // So we destructure the second value of array which is the value for this key on response.data
  //     for (const [, value] of Object.entries(data)) {
  //       userExpenses.value.push(value);
  //     }
  //   }
  // }
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
</style>
