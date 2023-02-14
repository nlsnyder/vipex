<template>
  <div class="max-w-xl min-h-3/5 justify-center items-center m-auto flex">
    <div class="bg-vipex-orange py-5 px-8 rounded-lg">
      <h2 class="text-2xl font-semibold tracking-wide mb-6 text-center">
        Add your expense
      </h2>
      <form class="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-7">
        <div class="flex flex-col justify-center">
          <label class="mb-2" for="test">Date of expense</label>
          <input type="text" name="test" id="test" />
        </div>
        <div class="flex flex-col justify-center">
          <label class="mb-2" for="test">Date of expense</label>
          <input type="text" name="test" id="test" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
