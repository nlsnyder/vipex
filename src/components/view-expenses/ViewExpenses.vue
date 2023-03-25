<template>
  <h2 class="mb-10 text-3xl text-center">Expenses</h2>
  <div class="background p-3 md:p-10 rounded-lg shadow-lg">
    <ul class="list-none flex flex-col gap-y-6">
      <li
        v-for="expense in props.userExpenses"
        :key="expense.itemId"
        class="flex items-stretch gap-x-4 background-light rounded-lg shadow overflow-hidden hover:cursor-pointer"
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
        <div class="flex-auto self-start py-3">
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
</template>

<script setup lang="ts">
import { UserExpense } from "@/interfaces/expenses/interfaces";
import { getAssociatedMonth } from "@/util/enums";

interface ViewExpensesProps {
  userExpenses: UserExpense[];
}

const props = defineProps<ViewExpensesProps>();

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
</script>

<style scoped>
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
