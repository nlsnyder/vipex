<template>
  <div class="background">
    <div
      class="grid-icons grid gap-x-12 gap-y-16 m-auto grid-cols-1 grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4"
    >
      <HeroIconItem
        v-for="(icon, index) in icons"
        :key="index"
        :iconName="icon.iconName"
        :iconDescription="icon.iconDescription"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HeroIconItem from "@/components/hero/HeroIconItem.vue";

const icons = ref([
  {
    iconName: "fa-money-bill-trend-up",
    iconDescription:
      "Vipex provides you easy access to your daily costs compared to your gross income so you can budget your expenses and see your savings rise",
  },
  {
    iconName: "fa-stopwatch",
    iconDescription:
      "We only ask for the relevant information when adding your expenses so you can spend less time budgeting and more time saving",
  },
  {
    iconName: "fa-filter-circle-dollar",
    iconDescription:
      "Filter your expenses by any day, month, or year time frame to see when you spend the most and prepare for your spending habits in the future",
  },
  {
    iconName: "fa-user",
    iconDescription:
      "Create an account with us to gain new and exciting perks such as preferences, spending charts, budgeting advice, and more",
  },
]);
</script>

<style scoped>
.background {
  padding-bottom: 40px;
}

.grid-icons {
  width: 80%;
}
</style>
