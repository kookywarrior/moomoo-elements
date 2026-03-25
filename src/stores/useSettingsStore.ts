import { useCategoryData } from '@/composables/useCategoryData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingsStore = defineStore('settings', () => {
  const categoryData = useCategoryData()

  // STATES
  const selectedCategory = ref(categoryData.categoryOptions[0]?.value)
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
