import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { UserExpense } from "@/interfaces/expenses/interfaces";

export const useExpensesStore = defineStore("expenses", () => {
  const expenses = ref<UserExpense[]>([]);

  const sortedExpenses = computed(() => {
    //fix the comparator function
    return expenses.value.sort(
      (a: any, b: any) => a.datePurchased - b.datePurchased
    );
  });

  function addExpense(expense: UserExpense) {
    expenses.value.push(expense);

    //also add expense to firebase from here
  }

  return { expenses, sortedExpenses, addExpense };
});
