import { CATEGORY_OPTIONS } from '@/utils/optionsData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingsStore = defineStore('settings', () => {
  // STATES
  const selectedCategory = ref(CATEGORY_OPTIONS[0]?.value)
  const filter = ref<boolean>(true)
  const resolution = ref<number>(500)
  const zoomScale = ref<number>(45)

  return {
    selectedCategory,
    filter,
    resolution,
    zoomScale,
  }
})

export { useSettingsStore }
