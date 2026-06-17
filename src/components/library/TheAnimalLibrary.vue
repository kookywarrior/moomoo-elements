<script setup lang="ts">
import { useSpriteStore } from '@/stores/useSpriteStore'
import Library from '../base/Library.vue'
import LibraryItem from '../base/LibraryItem.vue'
import PanelWrapper from '../base/PanelWrapper.vue'
import { useSettingsStore } from '@/stores/useSettingsStore'
import Modal from '../base/Modal.vue'
import { ref } from 'vue'
import NumberInput from '../base/NumberInput.vue'
import Slider from '../base/Slider.vue'
import TextInput from '../base/TextInput.vue'
import Wheel from '../base/Wheel.vue'
import Button from '../base/Button.vue'
import { LucideClock12 } from '@lucide/vue'

const spriteStore = useSpriteStore()
const settingsStore = useSettingsStore()

const showDirection = ref(false)
</script>

<template>
  <PanelWrapper>
    <Modal v-if="showDirection" @close="showDirection = false">
      <Wheel v-model="settingsStore.animal.direction" />
    </Modal>

    <div class="flex flex-col">
      <TextInput placeholder="Name" v-model="settingsStore.animal.name" />
    </div>

    <div class="flex flex-col gap-3">
      <NumberInput placeholder="Health" v-model="settingsStore.animal.health" :min="0" :max="100" />
      <Slider v-model="settingsStore.animal.health" class="mb-2" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <NumberInput
          class="flex-1"
          placeholder="Direction"
          v-model="settingsStore.animal.direction"
          :min="0"
          :max="360"
        />
        <Button style="width: unset" @click="showDirection = true">
          <LucideClock12 color="white" />
        </Button>
      </div>
    </div>

    <Library name="animal" class="mt-10">
      <LibraryItem :value="null" v-model="settingsStore.animal.selected" />
      <LibraryItem
        v-for="animal in spriteStore.uiSrpites.animals"
        :size="80"
        :key="animal.name"
        :src="animal.url"
        :value="animal.name"
        v-model="settingsStore.animal.selected"
      />
    </Library>
  </PanelWrapper>
</template>
