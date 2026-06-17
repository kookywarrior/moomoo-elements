<script lang="ts" setup generic="T">
import { computed, inject } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    name?: string
    value: T
    size?: number
    contain?: boolean
    small?: boolean | null
  }>(),
  {
    size: 100,
    small: null,
  }
)

const groupContext = inject<{
  name: { value: string }
  small: { value: boolean }
} | null>('radioGroupContext', null)

const finalName = computed(() => props.name ?? groupContext?.name.value ?? '')
const finalSmall = computed(() =>
  props.small != null ? props.small : (groupContext?.small.value ?? false)
)

const model = defineModel<T>()
</script>

<template>
  <label
    class="aspect-square cursor-pointer bg-(--library-item-color) hover:bg-(--library-item-hover-color) has-checked:rounded-full bg-center bg-no-repeat"
    :class="[finalSmall ? 'w-1/6 rounded-md' : 'w-1/4 rounded-lg']"
    :style="{
      backgroundImage: props.src ? `url(${props.src})` : 'none',
      backgroundSize: contain ? 'contain' : `${props.size}%`,
    }"
  >
    <input type="radio" :name="finalName" :value="props.value" v-model="model" class="hidden" />
  </label>
</template>
