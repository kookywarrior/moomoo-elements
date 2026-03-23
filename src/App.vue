<script setup lang="ts">
import { onMounted, ref } from 'vue';

const loaded = ref(false)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  loaded.value = true
})
</script>

<template>
  <div v-if="!loaded" class="text-white text-3xl grid h-screen place-items-center">Loading...</div>
  <main v-else>
    
  </main>
</template>
