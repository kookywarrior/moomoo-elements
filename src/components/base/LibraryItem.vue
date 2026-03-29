<script lang="ts" setup generic="T">
const props = defineProps<{
  src?: string
  name: string
  value: T
}>()

const model = defineModel<T>()
</script>

<template>
  <label
    class="w-1/4 aspect-square cursor-pointer bg-(--library-item-color) rounded-lg has-checked:rounded-full"
  >
    <img v-if="props.src" :src="props.src" class="w-full h-full object-cover" />
    <input type="radio" :name="props.name" :value="props.value" v-model="model" class="hidden" />
  </label>
</template>
