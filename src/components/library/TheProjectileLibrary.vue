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
    <Library name="projectile">
      <LibraryItem :value="null" v-model="settingsStore.selectedProjectile" />
      <LibraryItem
        v-for="projectile in spriteStore.uiSprites.projectiles"
        :key="projectile.name"
        contain
        :src="projectile.url"
        :value="projectile.name"
        v-model="settingsStore.selectedProjectile"
      />
    </Library>
  </PanelWrapper>
</template>
