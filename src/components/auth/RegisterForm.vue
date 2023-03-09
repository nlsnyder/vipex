<template>
  <FormKit
    type="form"
    name="registerForm"
    id="registerForm"
    :actions="false"
    form-class="flex flex-col items-center justify-center w-4/6 sm:w-1/2 md:w-1/3 lg:w-1/4 gap-4 mt-8"
    @submit="registerEmailAndPassword"
  >
    <FormKit
      type="text"
      name="email"
      id="email"
      label="Email"
      placeholder="your.email@gmail.com"
      :classes="{
        outer: 'w-full',
        wrapper: 'space-y-2',
        input:
          'rounded w-full p-2 border border-slate-500 focus:ring focus:outline-none focus:ring-orange-300',
        label: 'font-medium',
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
      }"
      validation="required|matches:/^([0-9A-z_.-])*[@]([0-9A-z_.-])+[.][A-z]+$/"
    />
    <FormKit
      :type="formState.showPw ? 'text' : 'password'"
      name="password"
      id="password"
      label="Password"
      :suffix-icon="formState.showPw ? 'eyeClosed' : 'eye'"
      @suffix-icon-click="() => (formState.showPw = !formState.showPw)"
      :classes="{
        outer: 'w-full',
        wrapper: 'space-y-2',
        input:
          'rounded w-full p-2 border border-slate-500 appearance-none bg-transparent focus:outline-none focus:shadow-none border-none text-base',
        label: 'font-medium',
        suffixIcon:
          'w-7 pr-3 flex self-stretch grow-0 shrink-0 hover:cursor-pointer',
        inner:
          'rounded flex items-center max-w-md ring-1 ring-slate-500 focus-within:ring-orange-300 focus-within:ring',
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
      }"
      validation="required|length:8"
    />
    <FormKit
      :type="formState.showConfirmPw ? 'text' : 'password'"
      name="password_confirm"
      id="password_confirm"
      label="Confirm password"
      :suffix-icon="formState.showConfirmPw ? 'eyeClosed' : 'eye'"
      @suffix-icon-click="
        () => (formState.showConfirmPw = !formState.showConfirmPw)
      "
      :classes="{
        outer: 'w-full',
        wrapper: 'space-y-2',
        input:
          'rounded w-full p-2 border border-slate-500 appearance-none bg-transparent focus:outline-none focus:shadow-none border-none text-base',
        label: 'font-medium',
        suffixIcon:
          'w-7 pr-3 flex self-stretch grow-0 shrink-0 hover:cursor-pointer',
        inner:
          'rounded flex items-center max-w-md ring-1 ring-slate-500 focus-within:ring-orange-300 focus-within:ring',
        messages: 'mt-2',
        message: 'text-red-500 text-sm',
      }"
      validation="required|length:8|confirm"
    />
    <div v-if="formState.errors.length > 0" class="text-center text-sm">
      <p v-for="error in formState.errors" :key="error" class="text-red-500">
        {{ error }}
      </p>
    </div>
    <FormKit
      type="submit"
      :classes="{
        input:
          'border p-2 w-full mt-5 rounded border-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 flex gap-2 items-center justify-center',
        outer: 'w-full',
        wrapper: 'w-full',
      }"
    >
      <img
        v-show="formState.loading"
        src="../../assets/loader-icon.webp"
        class="animate-spin h-5 w-5"
        alt="spinner"
      /><span>Submit</span>
    </FormKit>
  </FormKit>
</template>

<script setup lang="ts">
import { FormKit } from "@formkit/vue";
import { reactive } from "vue";
import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { convertFirebaseAuthError } from "../../util/errors/util";
import { RegisterFormState } from "../../interfaces/auth/interfaces";
import { useAuthStore } from "../../stores/auth";
import router from "../../router";

const store = useAuthStore();

const formState = reactive<RegisterFormState>({
  showPw: false,
  showConfirmPw: false,
  errors: [],
});

const registerEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // clear out previous errors
    formState.errors = [];
    const { user } = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    window.localStorage.setItem("authenticated", "true");
    store.setAuthState({ isAuthenticated: true, user });
    router.push("/");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      formState.errors.push(convertFirebaseAuthError(error.code));
    }
  }
};
</script>
