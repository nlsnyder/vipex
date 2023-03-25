<template>
  <h1 class="text-4xl mb-3">You do not have any expenses!</h1>
  <button
    class="p-2 flex gap-2 items-center justify-center addButton border rounded-md border-black"
  >
    <router-link to="/add-expense">Add One Now</router-link>
    <font-awesome-icon class="plusIcon" icon="fa-solid fa-plus" />
  </button>
</template>

<style scoped>
.plusIcon {
  height: 20px;
  animation: spinner 1.5s 1;
  animation-delay: 0.5s;
}

.addButton {
  transition: all 0.1s;
}

.addButton:hover {
  animation: bounce 0.3s 1;
  color: #f9a339;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
