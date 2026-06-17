<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import TheCategoryPanel from './components/TheCategoryPanel.vue'
import TheLibraryPanel from './components/TheLibraryPanel.vue'
import ThePreviewPanel from './components/ThePreviewPanel.vue'
import { useSpriteStore } from './stores/useSpriteStore'

const spriteStore = useSpriteStore()
spriteStore.init()

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
function updateDimensions() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

onMounted(() => window.addEventListener('resize', updateDimensions))
onUnmounted(() => window.removeEventListener('resize', updateDimensions))

const isNarrow = computed(() => {
  return windowWidth.value < (windowHeight.value * 12.8) / 9
})

const a = ref(0)
</script>

<template>
  <div class="absolute bottom-0 right-0 px-4 py-2 bg-white rounded-tl-sm">
    <a href="./legacy/index.html" class="text-[#a56dc8] rounded-tl hover:text-[#795094] text-lg">
      View Legacy Version
    </a>
  </div>

  <div v-if="!spriteStore.isLoaded" class="text-white text-3xl">Loading...</div>
  <main v-else class="aspect-video grid grid-cols-3 gap-14" :class="[isNarrow ? 'w-[90vw]' : 'h-[80vh]']">
    <TheCategoryPanel />
    <ThePreviewPanel />
    <TheLibraryPanel />
  </main>

</template>
