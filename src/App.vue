<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheCategoryPanel from './components/TheCategoryPanel.vue';
import ThePreviewPanel from './components/ThePreviewPanel.vue';

const loaded = ref(false)

onMounted(async () => {
  loaded.value = true
})
</script>

<template>
  <div v-if="!loaded" class="text-white text-3xl">Loading...</div>
  <main v-else class="h-8/10 aspect-video grid grid-cols-3 gap-14">
    <TheCategoryPanel />
    <ThePreviewPanel />
  </main>
</template>
