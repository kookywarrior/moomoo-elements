<script setup lang="ts">
import Slider from '@vueform/slider'

const model = defineModel()
</script>

<template>
  <div class="w-full grid place-items-center">
    <Slider class="slider" v-model="model" :min="0" :max="100" :tooltips="false" :lazy="false" />
  </div>
</template>

<style scoped>
.slider {
  --slider-handle-width: 16px;
  --slider-handle-height: 16px;
  --slider-connect-bg: var(--button-color);
  --slider-tooltip-bg: var(--button-color);
  --slider-handle-ring-color: #7ee55930;
  width: calc(100% - (var(--slider-handle-width, 16px) * 1.15));
}
</style>
