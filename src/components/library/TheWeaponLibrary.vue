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
      name: settingsStore.selectedWeapon,
      variant: settingsStore.selectedWeaponVariant,
    }
  },
  set(value) {
    settingsStore.selectedWeapon = value.name
    settingsStore.selectedWeaponVariant = value.variant
  },
})
</script>

<template>
  <PanelWrapper>
    <Library>
      <LibraryItem
        name="weapon"
        :value="{
          name: null,
          variant: null,
        }"
        v-model="model"
      />
      <LibraryItem
        v-for="weapon in spriteStore.uiSrpites.weapons"
        :key="weapon.name"
        name="weapon"
        contain
        :src="weapon.url"
        :value="{
          name: weapon.name,
          variant: weapon.variant,
        }"
        v-model="model"
      />
    </Library>
  </PanelWrapper>
</template>
