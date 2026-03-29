<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import Panel from './base/Panel.vue'
import TheBuildingLibrary from './library/TheBuildingLibrary.vue'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const selectedCategory = computed(() => settingsStore.selectedCategory)
</script>

<template>
  <Panel>
    <TheBuildingLibrary v-show="selectedCategory === 'buildings'" />
  </Panel>
</template>
