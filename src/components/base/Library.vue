<script setup lang="ts">
import { computed, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    small?: boolean | null
  }>(),
  {
    small: false,
  }
)

provide('radioGroupContext', {
  name: computed(() => props.name),
  small: computed(() => props.small),
})
</script>

<template>
  <div class="flex flex-wrap w-full" :class="[props.small ? 'gap-2' : 'gap-4']">
    <slot />
  </div>
</template>
