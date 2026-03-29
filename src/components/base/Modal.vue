<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed w-screen h-screen bg-black/60 inset-0 grid place-items-center z-50"
      @click.self="emit('close')"
    >
      <slot />
    </div>
  </Teleport>
</template>
