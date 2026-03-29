<script setup lang="ts">
import { useSpriteStore } from '@/stores/useSpriteStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import Library from '../base/Library.vue'
import LibraryItem from '../base/LibraryItem.vue'
import { computed } from 'vue'

const spriteStore = useSpriteStore()
const settingsStore = useSettingsStore()

const model = computed({
  get() {
    return {
      name: settingsStore.selectedResource,
      biome: settingsStore.selectedResourceBiome,
    }
  },
  set(value) {
    settingsStore.selectedResource = value.name
    settingsStore.selectedResourceBiome = value.biome
  },
})
</script>

<template>
  <Library>
    <LibraryItem
      name="resource"
      :value="{
        name: null,
        biome: null,
      }"
      v-model="model"
    />
    <LibraryItem
      v-for="building in spriteStore.uiSrpites.resources"
      :key="building.name"
      name="resource"
      :src="building.url"
      :value="{
        name: building.name,
        biome: building.biome,
      }"
      v-model="model"
    />
  </Library>
</template>
