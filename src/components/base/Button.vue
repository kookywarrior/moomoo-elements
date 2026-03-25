<script lang="ts" setup>
defineEmits(['click'])
</script>

<template>
  <button @click="$emit('click')" $attrs
    class="text-center text-xl text-white bg-(--button-color) hover:bg-(--button-hover-color) w-full cursor-pointer p-1.5 rounded-sm">
    <slot />
  </button>
</template>