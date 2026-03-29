<script setup lang="ts">
import Panel from './base/Panel.vue'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { CATEGORY_OPTIONS } from '@/utils/settingsData'

const settingsStore = useSettingsStore()
</script>

<template>
  <Panel>
    <label
      v-for="options in CATEGORY_OPTIONS"
      :key="options.value"
      class="w-full block text-center text-2xl hover:text-gray-500 cursor-pointer"
    >
      <div
        :class="{
          'border-l-4 border-gray-800': settingsStore.selectedCategory === options.value,
        }"
      >
        {{ options.label }}
      </div>
      <input
        type="radio"
        name="category"
        :value="options.value"
        class="hidden"
        v-model="settingsStore.selectedCategory"
      />
    </label>
  </Panel>
</template>
