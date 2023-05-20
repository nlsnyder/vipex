<template>
  <div class="flex flex-col w:11/12 md:w-10/12 mx-auto">
    <div class="flex justify-center items-center gap-x-4">
      <font-awesome-icon
        icon="fa-solid fa-hand"
        class="bg-red-600 rounded-full p-2 text-white text-2xl"
      />
      <h1 class="text-2xl md:text-3xl">Before we continue</h1>
    </div>
    <Message
      :closable="false"
      :pt="{
        root: { class: 'background-secondary override-border' },
        text: { class: 'color-tertiary' },
        icon: { class: 'color-tertiary' },
        wrapper: { class: 'flex flex-col md:flex-row gap-y-4' },
      }"
      >It looks like we don't have your income on file. Please add your salary
      below.</Message
    >
    <Panel header="Add Salary" toggleable>
      <div class="flex justify-between items-center">
        <span class="p-input-icon-left">
          <i class="pi pi-dollar"></i>
          <InputText v-model="salary" placeholder="Salary" />
        </span>
        <Button label="Add" outlined @click="addSalaryHandler"></Button>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import Message from "primevue/message";
import Panel from "primevue/panel";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { FirebaseService } from "@/services/FirebaseService";
import { getAuth } from "@firebase/auth";

const firebase = new FirebaseService();

const salary = ref<string>("");

const addSalaryHandler = async () => {
  if (salary.value === "") {
    return;
  }

  let salaryNumber = Number(salary.value);
  if (!salaryNumber) {
    return;
  }
  let user = getAuth().currentUser;
  if (!user) {
    return;
  }
  try {
    const response = await firebase.addSalaryForUser(
      user?.uid,
      salaryNumber,
      {}
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
</script>

<style>
.color-tertiary {
  color: #774e1c !important;
}
.override-border {
  border: solid #774e1c !important;
  border-width: 0 0 0 6px !important;
}
</style>
