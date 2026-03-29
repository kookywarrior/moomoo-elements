<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import Panel from './base/Panel.vue'
import TheBuildingLibrary from './library/TheBuildingLibrary.vue'
import { computed } from 'vue'
import TheResourceLibrary from './library/TheResourceLibrary.vue'
import TheHatLibrary from './library/TheHatLibrary.vue'
import TheAccessoryLibrary from './library/TheAccessoryLibrary.vue'

const settingsStore = useSettingsStore()
const selectedCategory = computed(() => settingsStore.selectedCategory)
</script>

<template>
  <Panel>
    <TheBuildingLibrary v-show="selectedCategory === 'buildings'" />
    <TheResourceLibrary v-show="selectedCategory === 'resources'" />
    <TheHatLibrary v-show="selectedCategory === 'hats'" />
    <TheAccessoryLibrary v-show="selectedCategory === 'accessories'" />
  </Panel>
</template>
