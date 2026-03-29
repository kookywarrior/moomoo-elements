<script setup lang="ts">
const props = defineProps<{
  placeholder: string
}>()

const model = defineModel()
</script>

<template>
  <input
    type="text"
    v-model="model"
    :placeholder="props.placeholder"
    class="border-none outline-none min-w-0 px-3 py-1 text-lg bg-(--input-background) text-(--input-color) rounded-sm"
  />
</template>
