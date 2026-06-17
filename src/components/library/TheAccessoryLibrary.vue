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
    <Library name="accessory">
      <LibraryItem :value="null" v-model="settingsStore.selectedAccessory" />
      <LibraryItem
        v-for="accessory in spriteStore.uiSprites.accessories"
        :size="80"
        :key="accessory.index"
        :src="accessory.url"
        :value="accessory.index"
        v-model="settingsStore.selectedAccessory"
      />
    </Library>
  </PanelWrapper>
</template>
