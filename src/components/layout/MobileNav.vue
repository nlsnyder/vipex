<template>
  <div v-if="props.mobileOpen">
    <div
      @click="$emit('closeMobileNav')"
      class="mobile-overlay md:hidden animate-fade"
    ></div>
    <nav class="mobile md:hidden animate-left">
      <ul class="px-5">
        <li @click="$emit('closeMobileNav')" class="text-lg font-semibold py-6">
          <router-link to="/add-expense">Add Expense</router-link>
        </li>
        <hr />
        <li @click="$emit('closeMobileNav')" class="text-lg font-semibold py-6">
          <router-link to="/view-expenses">View Expenses</router-link>
        </li>
        <hr />
        <button
          @click="$emit('signUserOut', true)"
          class="text-lg font-semibold py-6"
        >
          Sign out
        </button>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ mobileOpen: boolean }>();
</script>

<style scoped>
.mobile-overlay {
  position: absolute;
  top: 10vh;
  height: 90vh;
  width: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.4);
}

.mobile {
  position: absolute;
  top: 10vh;
  left: 0;
  height: 90vh;
  width: 60%;
  background-color: #ffc681;
  z-index: 999;
}

hr {
  background-color: #555;
  color: #555;
  border: none;
  height: 1.5px;
}

.animate-left {
  animation-name: open-left;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}

.animate-fade {
  animation-name: fadein;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}

@keyframes open-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
