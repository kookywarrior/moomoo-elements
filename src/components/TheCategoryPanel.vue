<script setup lang="ts">
import { useCategoryData } from '@/composables/useCategoryData';
import Panel from './base/Panel.vue';
import { useSettingsStore } from '@/stores/useSettingsStore';

const categoryData = useCategoryData()
const categoryStore = useSettingsStore()
</script>

<template>
  <Panel>
    <label v-for="options in categoryData.categoryOptions" :key="options.value"
      class="w-full block text-center text-2xl mb-4 last:mb-1 hover:text-gray-500 cursor-pointer">
      <div :class="{
        'border-l-4 border-gray-800': categoryStore.selectedCategory === options.value
      }">{{ options.label }}</div>
      <input type="radio" name="category" :value="options.value" class="hidden"
        v-model="categoryStore.selectedCategory" />
    </label>
  </Panel>
</template>