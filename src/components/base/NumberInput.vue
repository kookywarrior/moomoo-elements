<script setup lang="ts">
const props = defineProps<{
  placeholder: string
}>()

const model = defineModel()
</script>

<template>
  <input type="number" v-model="model" $attrs :placeholder="props.placeholder"
    class="border min-w-0 px-1 py-0.5 text-sm" />
</template>