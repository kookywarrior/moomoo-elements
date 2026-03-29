<script lang="ts" setup generic="T">
const props = withDefaults(
  defineProps<{
    src?: string
    name: string
    value: T
    size?: number
    contain?: boolean
  }>(),
  {
    size: 100,
  }
)

const model = defineModel<T>()
</script>

<template>
  <label
    class="w-1/4 aspect-square cursor-pointer bg-(--library-item-color) hover:bg-(--library-item-hover-color) rounded-lg has-checked:rounded-full bg-center bg-no-repeat"
    :style="{
      backgroundImage: props.src ? `url(${props.src})` : 'none',
      backgroundSize: contain ? 'contain' : `${props.size}%`,
    }"
  >
    <input type="radio" :name="props.name" :value="props.value" v-model="model" class="hidden" />
  </label>
</template>
