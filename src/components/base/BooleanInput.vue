<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const model = defineModel()
</script>

<template>
  <label class="flex items-center cursor-pointer">
    <input class="w-5 h-5 mr-2.5 mb-0.5" type="checkbox" v-model="model" />
    <span class="text-lg">Filter</span>
  </label>
</template>