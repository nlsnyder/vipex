<template>
  <div
    v-if="expensesExist"
    class="height-custom w-10/12 lg:w-1/2 m-auto my-12 flex flex-col"
  >
    <h2 class="mb-10 text-3xl text-center">Expenses</h2>
    <div class="background p-3 md:p-10 rounded-lg shadow-lg">
      <ul class="list-none flex flex-col gap-y-6">
        <li
          v-for="expense in store.expenses"
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
import { useExpensesStore } from "@/stores/expenses";
import { getAssociatedMonth } from "@/util/enums";
import { computed } from "vue";
const store = useExpensesStore();

// Computed Properties
const expensesExist = computed(() => {
  return store.expenses.length > 0;
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
