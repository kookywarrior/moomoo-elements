<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import BooleanInput from '../base/BooleanInput.vue'
import PanelWrapper from '../base/PanelWrapper.vue'
import { ref } from 'vue'
import NumberInput from '../base/NumberInput.vue'

const settingsStore = useSettingsStore()

const mapElement = ref<HTMLElement | null>(null)
const positionElement = ref<HTMLElement | null>(null)

let mouseDown = false

function roundToDecimal(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals)
  return Math.round(value * multiplier) / multiplier
}

function updateBackgroundPosition(offsetX: number, offsetY: number) {
  if (positionElement.value && mapElement.value) {
    positionElement.value.style.left = `${(offsetX * 100) / mapElement.value.getBoundingClientRect().width - 2}%`
    positionElement.value.style.top = `${(offsetY * 100) / mapElement.value.getBoundingClientRect().height - 2}%`
    settingsStore.backgroundPosition = {
      x: roundToDecimal((offsetX * 14400) / mapElement.value.getBoundingClientRect().width - 2, 2),
      y: roundToDecimal((offsetY * 14400) / mapElement.value.getBoundingClientRect().height - 2, 2),
    }
  }
}

function onMouseMove(event: MouseEvent) {
  if (mouseDown) {
    updateBackgroundPosition(event.offsetX, event.offsetY)
  }
}

function onMouseDown(event: MouseEvent) {
  updateBackgroundPosition(event.offsetX, event.offsetY)
  mouseDown = true
}

document.addEventListener('mouseup', () => {
  mouseDown = false
})
</script>

<template>
  <PanelWrapper>
    <div
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      ref="mapElement"
      class="relative cursor-pointer w-full aspect-square overflow-hidden"
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
        class="w-[4%] h-[4%] rounded-full bg-white absolute left-[48%] top-[48%] pointer-events-none"
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
