<script setup lang="ts">
import { useSpriteStore } from '@/stores/useSpriteStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import Library from '../base/Library.vue'
import LibraryItem from '../base/LibraryItem.vue'
import { computed } from 'vue'
import PanelWrapper from '../base/PanelWrapper.vue'

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
  <PanelWrapper>
    <Library name="resource">
      <LibraryItem
        :value="{
          name: null,
          biome: null,
        }"
        v-model="model"
      />
      <LibraryItem
        v-for="resource in spriteStore.uiSprites.resources"
        :key="resource.name"
        :src="resource.url"
        :value="{
          name: resource.name,
          biome: resource.biome,
        }"
        v-model="model"
      />
    </Library>
  </PanelWrapper>
</template>
