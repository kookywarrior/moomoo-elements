<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import Panel from './base/Panel.vue'
import TheBuildingLibrary from './library/TheBuildingLibrary.vue'
import { computed } from 'vue'
import TheResourceLibrary from './library/TheResourceLibrary.vue'
import TheHatLibrary from './library/TheHatLibrary.vue'
import TheAccessoryLibrary from './library/TheAccessoryLibrary.vue'
import TheWeaponLibrary from './library/TheWeaponLibrary.vue'
import TheProjectileLibrary from './library/TheProjectileLibrary.vue'
import ThePlayerLibrary from './library/ThePlayerLibrary.vue'
import TheAnimalLibrary from './library/TheAnimalLibrary.vue'
import TheBackgroundLibrary from './library/TheBackgroundLibrary.vue'

const settingsStore = useSettingsStore()
const selectedCategory = computed(() => settingsStore.selectedCategory)
</script>

<template>
  <Panel>
    <TheBuildingLibrary v-if="selectedCategory === 'buildings'" />
    <TheResourceLibrary v-else-if="selectedCategory === 'resources'" />
    <TheHatLibrary v-else-if="selectedCategory === 'hats'" />
    <TheAccessoryLibrary v-else-if="selectedCategory === 'accessories'" />
    <TheWeaponLibrary v-else-if="selectedCategory === 'weapons'" />
    <TheProjectileLibrary v-else-if="selectedCategory === 'projectiles'" />
    <ThePlayerLibrary v-else-if="selectedCategory === 'player'" />
    <TheAnimalLibrary v-else-if="selectedCategory === 'animals'" />
    <TheBackgroundLibrary v-else-if="selectedCategory === 'background'" />
  </Panel>
</template>
