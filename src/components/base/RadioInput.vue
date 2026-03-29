<script setup lang="ts" generic="T">
const props = defineProps<{
  label: string
  name: string
  value: T
}>()

const model = defineModel<T>()
</script>

<template>
  <label class="flex items-center cursor-pointer">
    <input
      class="w-5 h-5 mr-2.5 mb-0.5"
      type="radio"
      :name="props.name"
      :value="props.value"
      v-model="model"
    />
    <span class="text-lg">{{ props.label }}</span>
  </label>
</template>
