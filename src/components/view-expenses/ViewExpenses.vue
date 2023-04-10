<template>
  <CommonModal
    :show-modal="editState.editExpense"
    @close-modal="toggleEditForm"
    :type="ModalType.CUSTOM"
    heading="Edit Expense"
  >
    <template #body>
      <div class="w-3/4 m-auto py-5">
        <EditExpenseForm
          :expense="editState.expense"
          @set-loading="toggleLoading"
          @close-modal="toggleEditForm"
        />
      </div>
    </template>
    <template #footer-actions>
      <div
        class="background-main font-medium justify-between p-3 border-neutral-300 border-t flex items-center"
      >
        <button
          @click="$formkit.submit('editExpense')"
          class="p-2 background-light rounded w-20 flex justify-center"
        >
          <img
            v-if="editState.formSubmitting"
            src="../../assets/loader-icon.webp"
            class="animate-spin h-6 w-6"
            alt="spinner"
          />
          <span v-else>Confirm</span>
        </button>
        <button
          @click="toggleEditForm"
          class="p-2 rounded bg-white hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </template>
  </CommonModal>
  <div>
    <h2 class="text-3xl text-center">Expenses</h2>
    <div class="flex flex-col items-center justify-center m-auto mb-4">
      <FormKit
        type="select"
        label="Sort by:"
        placeholder="Default"
        name="sort"
        default="descending"
        :options="{
          ascending: 'Least recent',
          descending: 'Most recent',
        }"
        :classes="{
          outer: 'my-3',
          wrapper: 'flex gap-4 items-center',
          input: inputClasses,
        }"
        v-model="sortDirection"
      />
    </div>
    <div class="background p-3 md:p-10 rounded-lg shadow-lg">
      <ul class="list-none flex flex-col gap-y-6">
        <li
          v-for="expense in sortedExpenses"
          :key="expense.itemId"
          @click="toggleEditForm(undefined, expense)"
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
  </div>
</template>

<script setup lang="ts">
import CommonModal from "@/components/common/CommonModal.vue";
import { UserExpense } from "@/interfaces/expenses/interfaces";
import EditExpenseForm from "./EditExpenseForm.vue";
import { getAssociatedMonth } from "@/util/enums";
import { ModalType } from "@/util/enums";
import { computed, reactive, ref } from "vue";

interface ViewExpensesProps {
  userExpenses: UserExpense[];
}

const props = defineProps<ViewExpensesProps>();
const sortDirection = ref<string>();

const inputClasses =
  "p-1 border-2 rounded border-slate-400 focus:border-orange-300 outline-none";

const editState = reactive<{
  editExpense: boolean;
  formSubmitting: boolean;
  expense: UserExpense | undefined;
}>({
  editExpense: false,
  formSubmitting: false,
  expense: undefined,
});

const getSortedExpenses = () => {
  const expenses = props.userExpenses;
  let sorted;
  if (sortDirection.value && sortDirection.value === "ascending") {
    sorted = expenses.sort((expense1, expense2) => {
      let x = expense1.datePurchased.split("-").join();
      let y = expense2.datePurchased.split("-").join();
      return x < y ? -1 : x > y ? 1 : 0;
    });
  } else {
    sorted = expenses.sort((expense1, expense2) => {
      let x = expense1.datePurchased.split("-").join();
      let y = expense2.datePurchased.split("-").join();
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }
  return sorted;
};

const formattedPrice = (amount: string | number) => {
  return `$ ${amount}`;
};

const sortedExpenses = computed(() => {
  return getSortedExpenses();
});

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

const toggleEditForm = (_event?: MouseEvent, userExpense?: UserExpense) => {
  editState.editExpense = !editState.editExpense;
  if (userExpense) {
    editState.expense = userExpense;
  }
};

const toggleLoading = () => {
  editState.formSubmitting = !editState.formSubmitting;
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
  transition: all 0.2s;
}

.background-light:hover,
.background-light:active {
  background-color: #ffddb3;
}

hr {
  background-color: #333;
  color: #333;
  border: none;
  height: 1.5px;
}
</style>
