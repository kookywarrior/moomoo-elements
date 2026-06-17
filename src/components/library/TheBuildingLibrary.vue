<script setup lang="ts">
import { useSpriteStore } from '@/stores/useSpriteStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import Library from '../base/Library.vue'
import LibraryItem from '../base/LibraryItem.vue'
import PanelWrapper from '../base/PanelWrapper.vue'

const spriteStore = useSpriteStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <PanelWrapper>
    <Library name="building">
      <LibraryItem :value="null" v-model="settingsStore.selectedBuilding" />
      <LibraryItem
        v-for="building in spriteStore.uiSrpites.items"
        :key="building.name"
        :src="building.url"
        :value="building.name"
        v-model="settingsStore.selectedBuilding"
      />
    </Library>
  </PanelWrapper>
</template>
