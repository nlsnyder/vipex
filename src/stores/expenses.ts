import { defineStore } from "pinia";
import { ref } from "vue";
import { UserExpense } from "@/interfaces/expenses/interfaces";

export const useExpensesStore = defineStore("expenses", () => {
  const expenses = ref<UserExpense[]>([]);

  return { expenses };
});
