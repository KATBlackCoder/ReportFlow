<template>
  <UContainer>
    <h1 class="text-2xl font-bold">Hello World</h1>
    <p>{{ count }}</p>
    <UButton @click="reset">Reset</UButton>
    <UButton @click="increment">Increment</UButton>
    <UButton @click="decrement">Decrement</UButton>
  </UContainer>
</template>

<script lang="ts" setup>

  const count = ref(0);

  function reset() {
    count.value = 0;
  }

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }
</script>