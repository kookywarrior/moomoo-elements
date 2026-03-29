import type { AnimalSettings, PlayerSettings } from '@/types/settings'
import { CATEGORIES } from '@/utils/settingsData'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useSettingsStore = defineStore('settings', () => {
  // STATES
  const selectedCategory = ref<keyof typeof CATEGORIES>('buildings')
  const filter = ref<boolean>(true)
  const resolution = ref<number>(500)
  const zoomScale = ref<number>(45)
  const selectedBuilding = ref<string | null>(null)
  const selectedResource = ref<string | null>(null)
  const selectedResourceBiome = ref<string | null>(null)
  const selectedHat = ref<number | null>(null)
  const selectedAccessory = ref<number | null>(null)
  const selectedWeapon = ref<string | null>(null)
  const selectedWeaponVariant = ref<string | null>(null)
  const selectedProjectile = ref<string | null>(null)
  const player = reactive<PlayerSettings>({
    hat: null,
    accessory: null,
    weapon: null,
    weaponVariant: null,
    item: null,
    projectile: null,

    colour: '#bf8f54',
    name: '',
    tribe: '',
    crown: false,
    skull: false,
    health: 0,
    hpBarColour: 'green',
    direction: 0,
    topHatDirection: 0,
  })
  const animal = reactive<AnimalSettings>({
    selected: null,
    health: 0,
    name: '',
    direction: 0,
  })

  return {
    selectedCategory,
    filter,
    resolution,
    zoomScale,
    selectedBuilding,
    selectedResource,
    selectedResourceBiome,
    selectedHat,
    selectedAccessory,
    selectedWeapon,
    selectedWeaponVariant,
    selectedProjectile,
    player,
    animal,
  }
})

export { useSettingsStore }
