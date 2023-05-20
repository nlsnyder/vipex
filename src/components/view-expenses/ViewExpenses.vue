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
    <AddSalary v-if="!expenseStore.salary" />
    <div v-else>
      <h2 class="text-3xl text-center">Expenses</h2>
      <div class="w-full flex flex-wrap items-center justify-between mt-8 mb-4">
        <FormKit
          type="select"
          label="Sort by"
          placeholder="Default"
          name="sort"
          default="descending"
          :options="{
            ascending: 'Date ascending',
            descending: 'Date descending',
          }"
          :classes="{
            outer: 'w-1/4',
            input: inputClasses,
          }"
          v-model="sortDirection"
        />
        <FormKit
          label="Filter"
          :classes="{
            outer: 'w-1/3',
            input: inputClasses,
          }"
          v-model="filterBar"
        />
        <FormKit
          type="select"
          label="Month"
          placeholder="Select"
          name="month"
          default="jan"
          :options="{
            0: 'All',
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
          }"
          :classes="{
            outer: 'w-1/4',
            input: inputClasses,
          }"
          v-model="sortMonth"
        />
      </div>
      <div class="background p-3 md:p-10 rounded-lg shadow-lg">
        <ul class="list-none flex flex-col gap-y-6">
          <template v-if="sortedExpenses.length > 0">
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
                <p class="mb-1 text-xl font-medium">
                  {{ expense.retailerName }}
                </p>
                <hr />
                <p class="mt-1 text-sm italic text-zinc-600">
                  {{ expense.itemDescription }}
                </p>
              </div>
              <span class="text-xl self-center pr-5 py-3">{{
                formattedPrice(expense.cost)
              }}</span>
            </li>
          </template>
          <template v-else>
            <li class="bg-white rounded-lg p-5 font-semibold text-lg">
              No expenses found
            </li>
          </template>
        </ul>
      </div>
      <div
        class="border border-slate-800 p-4 mt-6 rounded w-full md:w-2/3 mx-auto"
      >
        <dl class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <dt class="font-semibold">Gross Income :</dt>
            <dd>{{ formattedPrice(getTotalIncome()) }}</dd>
          </div>
          <div class="flex justify-between items-center">
            <dt class="font-semibold">Total Expenditures :</dt>
            <dd>{{ formattedPrice(getTotalExpenditures()) }}</dd>
          </div>
          <hr />
          <div class="flex justify-between items-center">
            <dt class="flex items-center gap-1">
              <Tooltip
                ><strong>Note: </strong>The net income does not account for
                state and federal taxes. For a more accurate number, apply the
                federal and your state tax rate to the number displayed for net
                income.</Tooltip
              >
              <span class="font-semibold">Net Income :</span>
            </dt>
            <dd>{{ getNetIncome }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonModal from "@/components/common/CommonModal.vue";
import { UserExpense } from "@/interfaces/expenses/interfaces";
import EditExpenseForm from "./EditExpenseForm.vue";
import AddSalary from "./AddSalary.vue";
import Tooltip from "../common/Tooltip.vue";
import { getAssociatedMonth } from "@/util/enums";
import { ModalType } from "@/util/enums";
import { computed, reactive, ref } from "vue";
import { useExpensesStore } from "@/stores/expenses";

const expenseStore = useExpensesStore();

interface ViewExpensesProps {
  userExpenses: UserExpense[];
}

const props = defineProps<ViewExpensesProps>();
const sortDirection = ref<string>();
const sortMonth = ref<number>(0);
const filterBar = ref<string>("");

const inputClasses =
  "outline outline-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded p-1 w-full";

const editState = reactive<{
  editExpense: boolean;
  formSubmitting: boolean;
  expense: UserExpense | undefined;
}>({
  editExpense: false,
  formSubmitting: false,
  expense: undefined,
});

const getSortedAndFilteredExpenses = () => {
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
  if (filterBar.value !== "") {
    sorted = sorted.filter((expense) =>
      expense.retailerName.toLowerCase().includes(filterBar.value.toLowerCase())
    );
  }
  if (Number(sortMonth.value) !== 0) {
    sorted = sorted.filter((expense) => {
      let date = expense.datePurchased.split("-");
      return parseInt(date[1]) === Number(sortMonth.value);
    });
  }
  return sorted;
};

const sortedExpenses = computed(() => {
  return getSortedAndFilteredExpenses();
});

const getTotalExpenditures = () => {
  let sum = 0;
  sortedExpenses.value.forEach((expense) => (sum += Number(expense.cost)));
  return sum;
};

const getTotalIncome = () => {
  if (sortMonth.value !== 0) {
    return Number(expenseStore.salary) / 12;
  } else {
    return Number(expenseStore.salary);
  }
};

const getNetIncome = computed(() => {
  return formattedPrice(getTotalIncome() - getTotalExpenditures());
});

const formattedPrice = (amount: string | number) => {
  return `$${Number(amount).toFixed(2)}`;
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
