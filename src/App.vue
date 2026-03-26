<script setup lang="ts">
import TheCategoryPanel from './components/TheCategoryPanel.vue';
import ThePreviewPanel from './components/ThePreviewPanel.vue';
import { useSpriteStore } from './stores/useSpriteStore';

const spriteStore = useSpriteStore()
spriteStore.init()
</script>

<template>
  <div v-if="!spriteStore.isLoaded" class="text-white text-3xl">Loading...</div>
  <main v-else class="h-8/10 aspect-video grid grid-cols-3 gap-14">
    <TheCategoryPanel />
    <ThePreviewPanel />
  </main>
</template>
