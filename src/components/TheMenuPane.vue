<script setup lang="ts">
import { useCategoryData } from '@/composables/useCategoryData';
import Container from './base/Container.vue';
import { useSettingsStore } from '@/stores/useSettingsStore';

const categoryData = useCategoryData()
const categoryStore = useSettingsStore()
</script>

<template>
  <Container>
    <label v-for="options in categoryData.categoryOptions" :key="options.value"
      class="w-full block text-center text-xl px-3 mb-3 first:mt-3 last:mb-4 hover:text-gray-500 cursor-pointer">
      <div :class="{
        'border-l-4 border-gray-800': categoryStore.selectedCategory === options.value
      }">{{ options.label }}</div>
      <input type="radio" name="category" :value="options.value" class="hidden"
        v-model="categoryStore.selectedCategory" />
    </label>
  </Container>
</template>