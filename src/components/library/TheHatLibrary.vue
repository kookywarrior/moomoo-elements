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
    <Library name="hat">
      <LibraryItem :value="null" v-model="settingsStore.selectedHat" />
      <LibraryItem
        v-for="hat in spriteStore.uiSrpites.hats"
        :size="80"
        :key="hat.index"
        :src="hat.url"
        :value="hat.index"
        v-model="settingsStore.selectedHat"
      />
    </Library>
  </PanelWrapper>
</template>
