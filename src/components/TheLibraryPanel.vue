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
    <TheBuildingLibrary v-show="selectedCategory === 'buildings'" />
    <TheResourceLibrary v-show="selectedCategory === 'resources'" />
    <TheHatLibrary v-show="selectedCategory === 'hats'" />
    <TheAccessoryLibrary v-show="selectedCategory === 'accessories'" />
    <TheWeaponLibrary v-show="selectedCategory === 'weapons'" />
    <TheProjectileLibrary v-show="selectedCategory === 'projectiles'" />
    <ThePlayerLibrary v-show="selectedCategory === 'player'" />
    <TheAnimalLibrary v-show="selectedCategory == 'animals'" />
    <TheBackgroundLibrary v-show="selectedCategory == 'background'" />
  </Panel>
</template>
