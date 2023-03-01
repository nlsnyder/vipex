<template>
  <FormKit
    type="form"
    id="addExpense"
    name="addExpense"
    form-class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-x-10 md:gap-y-8"
    :submit-attrs="{
      'formkit-actions-class': false,
      'input-class': submitButtonClasses,
    }"
    :actions-class="{
      'lg:relative': 'lol',
      'lg:top-8': '36px',
      'md:col-span-2': 'true',
      'lg:col-span-1': 'true',
    }"
    :messages-class="{
      hidden: true,
    }"
    submit-label="Add"
    @submit="submitExpense"
  >
    <FormKit
      type="text"
      name="retailerName"
      id="retailerName"
      label="Retailer name"
      placeholder="Target, Amazon, etc"
      :classes="{
        wrapper: 'space-y-3',
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
        wrapper: 'space-y-3',
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
        wrapper: 'space-y-3',
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
        wrapper: 'space-y-3',
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
import { FormKit } from "@formkit/vue";
import { uuid } from "vue-uuid";
import { useExpensesStore } from "@/stores/expenses";
import { BaseFirebaseResponse } from "@/interfaces/expenses/interfaces";

const store = useExpensesStore();
const emit = defineEmits<{
  (e: "formSubmit", response: BaseFirebaseResponse): void;
}>();

// Component constants
const inputClasses =
  " outline outline-neutral-300 focus:outline-none focus:ring-4 focus:ring-sky-400 rounded p-2 w-full";

const submitButtonClasses =
  "bg-slate-200 font-medium rounded p-3 hover:bg-slate-300 active:ring-sky-500 active:ring w-full";

const innerClasses =
  "formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 [&amp;>label:first-child]:focus-within:text-blue-500 rounded mb-1";

const iconClasses =
  "flex w-8 p-1 self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 bg-white bg-gradient-to-b from-transparent to-gray-200";

const iconInput =
  "appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-1 py-2 border-none text-base text-gray-700 placeholder-gray-400";

const date = new Date();
const currentDate = new Date(
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
);

// Component Functions
const submitExpense = (fields: UserExpense) => {
  fields.itemId = uuid.v4();
  store.addExpense(fields);
  console.log("emitting form submit event...");
  emit("formSubmit", { ok: true, messages: ["Your expense has been added!"] });
};
</script>

<style scoped>
@media (min-width: 768px) {
  .grid-rows {
    grid-template-rows: 1fr 1fr min(50px, 1fr);
  }
}
</style>
