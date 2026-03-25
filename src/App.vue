<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheMenuPane from './components/TheMenuPane.vue';

const loaded = ref(false)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  loaded.value = true
})
</script>

<template>
  <div v-if="!loaded" class="text-white text-3xl">Loading...</div>
  <main v-else class="h-8/10 aspect-video grid grid-cols-3 gap-14">
    <TheMenuPane />
  </main>
</template>
