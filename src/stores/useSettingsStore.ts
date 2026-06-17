import type { AnimalSettings, PlayerSettings } from '@/types/settings'
import { CATEGORIES } from '@/utils/settingsData'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useSettingsStore = defineStore('settings', () => {
  // STATES
  const scaleFillNative = ref<number>(1)
  const selectedCategory = ref<keyof typeof CATEGORIES>('buildings')
  const filter = ref<boolean>(true)
  const resolution = ref<number>(500)
  const zoomScale = ref<number>(25)
  const selectedBuilding = ref<string | null>(null)
  const selectedResource = ref<string | null>(null)
  const selectedResourceBiome = ref<number | null>(null)
  const selectedHat = ref<number | null>(null)
  const selectedAccessory = ref<number | null>(null)
  const selectedWeapon = ref<string | null>(null)
  const selectedWeaponVariant = ref<string | null>(null)
  const selectedProjectile = ref<string | null>(null)
  const player = reactive<PlayerSettings>({
    hat: null,
    accessory: null,
    holding: null,
    projectile: null,

    colour: '#bf8f54',
    name: '',
    tribe: '',
    crown: false,
    skull: false,
    health: null,
    hpBarColour: 'green',
    direction: null,
    topHatDirection: null,
  })
  const animal = reactive<AnimalSettings>({
    selected: null,
    health: null,
    name: '',
    direction: null,
  })
  const backgroundPosition = ref<{ x: number; y: number }>({ x: 14400 / 2, y: 14400 / 2 })
  const showBackgroundGrid = ref<boolean>(true)

  return {
    scaleFillNative,
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
    backgroundPosition,
    showBackgroundGrid,
  }
})

export { useSettingsStore }
