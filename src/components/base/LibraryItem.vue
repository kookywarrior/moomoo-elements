<script lang="ts" setup generic="T">
const props = withDefaults(
  defineProps<{
    src?: string
    name: string
    value: T
    size?: number
  }>(),
  {
    size: 100,
  }
)

const model = defineModel<T>()
</script>

<template>
  <label
    class="w-1/4 aspect-square cursor-pointer bg-(--library-item-color) hover:bg-(--library-item-hover-color) rounded-lg has-checked:rounded-full grid place-items-center"
  >
    <img
      v-if="props.src"
      :src="props.src"
      class="object-cover"
      :style="{
        width: `${props.size}%`,
        height: `${props.size}%`,
      }"
    />
    <input type="radio" :name="props.name" :value="props.value" v-model="model" class="hidden" />
  </label>
</template>
