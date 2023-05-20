import { defineStore } from "pinia";
import { ref } from "vue";
import { UserExpense } from "@/interfaces/expenses/interfaces";

export const useExpensesStore = defineStore("expenses", () => {
  const expenses = ref<UserExpense[]>([]);
  const salary = ref<string | number>("");
  const fetchState = { expenses: false, salary: false }; // Stores whether initial fetch from Firebase database has happened yet

  return { expenses, fetchState, salary };
});
