<script setup lang="ts">
import Slider from '@vueform/slider'

const model = defineModel()
const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
  }>(),
  {
    min: 0,
    max: 100,
  }
)
</script>

<template>
  <div class="w-full px-2">
    <Slider
      class="slider"
      :modelValue="model"
      :min="props.min"
      :max="props.max"
      :lazy="false"
      :tooltips="false"
      @update="(val: any) => (model = Number(val))"
    />
  </div>
</template>

<style scoped>
.slider {
  --slider-handle-width: 16px;
  --slider-handle-height: 16px;
  --slider-connect-bg: var(--button-color);
  --slider-tooltip-bg: var(--button-color);
  --slider-handle-ring-color: #7ee55930;
}
</style>
