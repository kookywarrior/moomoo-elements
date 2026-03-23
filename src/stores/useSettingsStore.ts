import { useCategoryData } from '@/composables/useCategoryData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingsStore = defineStore('settings', () => {
  const categoryData = useCategoryData()

  const selectedCategory = ref(categoryData.categoryOptions[0]?.value)

  return {
    selectedCategory,
  }
})

export { useSettingsStore }
