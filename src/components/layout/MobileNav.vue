<template>
  <Transition name="fade" appear>
    <div
      v-if="props.mobileOpen"
      @click="$emit('closeMobileNav')"
      class="mobile-overlay md:hidden"
    ></div>
  </Transition>
  <Transition name="fade-left" appear>
    <nav v-if="props.mobileOpen" class="mobile md:hidden">
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
  </Transition>
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

.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
