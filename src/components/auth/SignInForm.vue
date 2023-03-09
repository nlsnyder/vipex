<template>
  <FormKit
    type="form"
    name="signInForm"
    id="signInForm"
    :actions="false"
    form-class="flex flex-col items-center justify-center w-4/6 sm:w-1/2 md:w-1/3 lg:w-1/4 gap-4 mt-8"
    @submit="signInEmailAndPassword"
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
    <div v-if="allErrors.length > 0" class="text-center text-sm">
      <p v-for="error in allErrors" :key="error" class="text-red-500">
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
      /><span>Sign in</span>
    </FormKit>
  </FormKit>
</template>

<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { computed, reactive } from "vue";
import { BaseAuthFormState } from "../../interfaces/auth/interfaces";
import router from "../../router";
import { useAuthStore } from "../../stores/auth";
import { convertFirebaseAuthError } from "../../util/errors/util";

const store = useAuthStore();

const props = defineProps<{
  errors: string[];
}>();

const formState = reactive<BaseAuthFormState>({
  showPw: false,
  errors: [],
  loading: false,
});

const allErrors = computed(() => {
  return formState.errors.concat(props.errors);
});

const signInEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.log(email, password);
  try {
    // Update form state
    formState.loading = true;
    formState.errors = [];

    // login user through firebase
    const { user } = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    // Update state, store authenticated user info and navigate to home page
    formState.loading = false;
    window.localStorage.setItem("authenticated", "true");
    store.setAuthState({ isAuthenticated: true, user });
    router.push("/");
  } catch (error) {
    formState.loading = false;
    if (error instanceof FirebaseError) {
      formState.errors.push(convertFirebaseAuthError(error.code));
    }
  }
};
</script>
