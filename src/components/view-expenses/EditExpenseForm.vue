<template>
  <FormKit
    type="form"
    id="editExpense"
    name="editExpense"
    form-class="custom overflow-scroll flex flex-col gap-y-4"
    :actions="false"
    :messages-class="{
      hidden: true,
    }"
    :value="props.expense"
    @submit="handleEditExpense"
  >
    <FormKit
      type="text"
      name="retailerName"
      id="retailerName"
      label="Retailer name"
      placeholder="Target, Amazon, etc"
      :classes="{
        wrapper: 'space-y-3 p-1',
        label: 'font-medium',
        input: inputClasses,
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
      }"
      validation="required|matches:/^[a-zA-Z0-9. -]*$/"
    />
    <FormKit
      type="text"
      name="cost"
      id="cost"
      label="Cost of item(s)"
      prefix-icon="dollar"
      :classes="{
        wrapper: 'space-y-3 p-1 focus:outline-none',
        label: 'font-medium',
        input: iconInput,
        inner: innerClasses,
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
        help: 'text-stone-500 text-sm mt-2',
        prefixIcon: iconClasses,
      }"
      validation="required|number|length:1,11|matches:/^[0-9]*(.\d{2})?$/"
      :validation-messages="{
        matches: 'Price must follow a valid currency format.',
      }"
      help="Do not include commas"
    />
    <FormKit
      type="date"
      name="datePurchased"
      id="datePurchased"
      label="Date purchased"
      :classes="{
        wrapper: 'space-y-3 p-1',
        label: 'font-medium',
        input: inputClasses,
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
      }"
      :validation="[['date_between', '2023-1-1', currentDate], ['required']]"
    />
    <FormKit
      type="text"
      name="itemDescription"
      id="itemDescription"
      label="Short description of item(s)"
      :classes="{
        wrapper: 'space-y-3 p-1',
        label: 'font-medium',
        input: inputClasses,
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
        outer: 'lg:col-span-2',
      }"
      :validation="[['required'], ['matches', '/^[A-Za-z0-9.\\-\\,\' ]*$/']]"
      :validation-messages="{
        matches: 'Item description must not have any special characters.',
      }"
    />
  </FormKit>
</template>

<script setup lang="ts">
import { UserExpense } from "@/interfaces/expenses/interfaces";
import { useAuthStore } from "@/stores/auth";
import { getAuth, User } from "@firebase/auth";
import { FormKit } from "@formkit/vue";
import { reactive } from "vue";
import { FirebaseService } from "@/services/FirebaseService";
import { useExpensesStore } from "@/stores/expenses";

const authStore = useAuthStore();
const expenseStore = useExpensesStore();
const firebase = new FirebaseService();

const editFormState = reactive<{
  errors: string[];
}>({ errors: [] });

const props = defineProps<{
  expense: UserExpense | undefined;
}>();

const emit = defineEmits<{
  (e: "setLoading"): void;
  (e: "closeModal"): void;
}>();

// constants
const inputClasses =
  "outline outline-neutral-300 focus:outline-none focus:ring-4 focus:ring-sky-400 rounded p-2 w-full";

const innerClasses =
  "flex items-center bg-white outline outline-neutral-300 focus-within:ring-sky-400 focus-within:ring-4 rounded mb-1";

const iconClasses =
  "flex w-8 p-1 self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 bg-white bg-gradient-to-b from-transparent to-gray-200";

const iconInput =
  "appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-1 py-2 border-none text-base text-gray-700 placeholder-gray-400";

const date = new Date();
const currentDate = new Date(
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
);

const handleEditExpense = async (formFields: UserExpense) => {
  emit("setLoading");
  const { itemId, ...expense } = formFields;

  try {
    let user: User | null = null;
    let idToken;
    if (!authStore.authState.user) {
      user = getAuth().currentUser;
      idToken = await getAuth().currentUser?.getIdToken();
      authStore.setAuthState({ ...authStore.authState, user });
    } else {
      user = authStore.authState.user;
      idToken = await user.getIdToken();
    }

    const response = await firebase.editExpenseById(
      user?.uid,
      itemId,
      expense as UserExpense,
      {
        params: {
          auth: idToken,
        },
      }
    );
    console.log(response);
    let filteredExpenses = expenseStore.expenses.filter(
      (expense) => expense.itemId !== itemId
    );
    filteredExpenses.push(formFields);
    expenseStore.$patch({
      expenses: filteredExpenses,
    });
  } catch (err) {
    console.log(err);
    editFormState.errors.push("Error occurred");
  }
  emit("setLoading");
  emit("closeModal");
};
</script>

<style scoped>
.custom {
  padding: 40px;
}
</style>
