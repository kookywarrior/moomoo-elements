<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: number | null
}>()

const emit = defineEmits(['update:modelValue'])

const wheelRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const SNAP_ANGLE = 45

const calculateAngle = (e: MouseEvent | TouchEvent) => {
  if (!wheelRef.value || !isDragging.value) return

  const rect = wheelRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY

  const radians = Math.atan2(clientY - centerY, clientX - centerX)
  let degrees = (radians * (180 / Math.PI) + 90 + 360) % 360

  if (e.shiftKey) {
    degrees = Math.round(degrees / SNAP_ANGLE) * SNAP_ANGLE
  }

  emit('update:modelValue', Math.round(degrees) % 360)
}

const onMouseDown = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  calculateAngle(e)

  window.addEventListener('mousemove', calculateAngle)
  window.addEventListener('touchmove', calculateAngle, { passive: false })
  window.addEventListener('mouseup', stopDragging)
  window.addEventListener('touchend', stopDragging)
}

const stopDragging = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', calculateAngle)
  window.removeEventListener('touchmove', calculateAngle)
  window.removeEventListener('mouseup', stopDragging)
  window.removeEventListener('touchend', stopDragging)
}

onUnmounted(() => stopDragging())
</script>

<template>
  <div class="flex flex-col items-center gap-3 select-none">
    <div
      ref="wheelRef"
      class="relative w-32 h-32 rounded-full bg-(--input-background) border-4 border-white shadow-inner cursor-pointer active:scale-95 transition-transform"
      @mousedown="onMouseDown"
      @touchstart.prevent="onMouseDown"
    >
      <div class="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-black/30 font-bold">
        0°
      </div>

      <div
        class="absolute top-1/2 left-1/2 w-1.5 h-14 bg-gray-500 origin-bottom rounded-full"
        :style="{ transform: `translate(-50%, -100%) rotate(${modelValue ?? 0}deg)` }"
      >
        <div
          class="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-500 rotate-45 rounded-sm"
        ></div>
      </div>

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-(--input-background)"
      ></div>
    </div>
  </div>
</template>
