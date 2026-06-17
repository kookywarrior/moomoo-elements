<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import BooleanInput from '../base/BooleanInput.vue'
import PanelWrapper from '../base/PanelWrapper.vue'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import NumberInput from '../base/NumberInput.vue'

const settingsStore = useSettingsStore()

const mapElement = ref<HTMLElement | null>(null)
const positionElement = ref<HTMLElement | null>(null)

let mouseDown = false

function roundToDecimal(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals)
  return Math.round(value * multiplier) / multiplier
}

function syncMarkerToStore() {
  if (!positionElement.value || !mapElement.value) return

  // Calculate percentage cleanly (0% to 100%)
  const pctX = (settingsStore.backgroundPosition.x / 14400) * 100
  const pctY = (settingsStore.backgroundPosition.y / 14400) * 100

  // Subtract half the marker width (4% / 2 = 2) to center the dot on point click
  positionElement.value.style.left = `${pctX - 2}%`
  positionElement.value.style.top = `${pctY - 2}%`
}

function handlePositionUpdate(clientX: number, clientY: number) {
  if (!mapElement.value) return

  const rect = mapElement.value.getBoundingClientRect()

  // Calculate mouse coordinate
  let localX = clientX - rect.left
  let localY = clientY - rect.top

  // Clamp values between 0 and rect size boundaries
  localX = Math.max(0, Math.min(localX, rect.width))
  localY = Math.max(0, Math.min(localY, rect.height))

  settingsStore.backgroundPosition = {
    x: roundToDecimal((localX * 14400) / rect.width, 2),
    y: roundToDecimal((localY * 14400) / rect.height, 2),
  }
}

function onMouseMove(event: MouseEvent) {
  if (mouseDown) {
    handlePositionUpdate(event.clientX, event.clientY)
  }
}

function onMouseDown(event: MouseEvent) {
  mouseDown = true
  handlePositionUpdate(event.clientX, event.clientY)
}

function onMouseUp() {
  mouseDown = false
}

watch(
  () => settingsStore.backgroundPosition,
  () => {
    syncMarkerToStore()
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  document.addEventListener('mouseup', onMouseUp)
  syncMarkerToStore()
})

onUnmounted(() => {
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
  <PanelWrapper>
    <div
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      ref="mapElement"
      class="relative cursor-pointer w-full aspect-square overflow-hidden select-none"
      style="
        background-image:
          linear-gradient(to right, rgba(0, 0, 70, 0.35), rgba(0, 0, 70, 0.35)),
          -webkit-linear-gradient(
              top,
              #fff,
              #fff 16.5%,
              #b6db66 16.5%,
              #b6db66 47.1%,
              #91b2db 47.1%,
              #91b2db 52.9%,
              #b6db66 52.9%,
              #b6db66 83.5%,
              #dbc666 83.5%,
              #dbc666
            );
      "
    >
      <div
        ref="positionElement"
        class="w-[4%] h-[4%] rounded-full bg-white absolute pointer-events-none shadow-md border border-black/20"
      ></div>
    </div>
  </PanelWrapper>

  <div class="flex flex-col gap-3 mt-5">
    <div class="flex flex-row items-center">
      <label class="cursor-pointer">
        <span class="text-lg mr-3">X:</span>
        <NumberInput
          placeholder="0"
          v-model="settingsStore.backgroundPosition.x"
          :min="0"
          :max="14400"
          class="w-52"
        />
      </label>
    </div>

    <div class="flex flex-row items-center">
      <label class="cursor-pointer">
        <span class="text-lg mr-3">Y:</span>
        <NumberInput
          placeholder="0"
          v-model="settingsStore.backgroundPosition.y"
          :min="0"
          :max="14400"
          class="w-52"
        />
      </label>
    </div>
  </div>

  <BooleanInput class="mt-5" label="Show Grid" v-model="settingsStore.showBackgroundGrid" />
</template>
