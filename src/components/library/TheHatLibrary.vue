<script setup lang="ts">
import { useSpriteStore } from '@/stores/useSpriteStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import Library from '../base/Library.vue'
import LibraryItem from '../base/LibraryItem.vue'

const spriteStore = useSpriteStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <Library>
    <LibraryItem name="hat" :value="null" v-model="settingsStore.selectedHat" />
    <LibraryItem
      v-for="hat in spriteStore.uiSrpites.hats"
      :key="hat.index"
      name="hat"
      :src="hat.url"
      :value="hat.index"
      v-model="settingsStore.selectedHat"
    />
  </Library>
</template>
