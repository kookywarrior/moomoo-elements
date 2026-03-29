<script setup lang="ts">
import { ChromePicker } from 'vue-color'
import { Clock12, LucideClock12 } from '@lucide/vue'
import { useSpriteStore } from '@/stores/useSpriteStore'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { ref } from 'vue'
import { COLOURS } from '@/utils/settingsData'
import Modal from '../base/Modal.vue'
import TextInput from '../base/TextInput.vue'
import BooleanInput from '../base/BooleanInput.vue'
import NumberInput from '../base/NumberInput.vue'
import Slider from '../base/Slider.vue'
import PanelWrapper from '../base/PanelWrapper.vue'
import RadioInput from '../base/RadioInput.vue'
import Button from '../base/Button.vue'
import Wheel from '../base/Wheel.vue'

const spriteStore = useSpriteStore()
const settingsStore = useSettingsStore()

const showPicker = ref(false)
const showDirection = ref(false)
const showTopHatDirection = ref(false)
</script>

<template>
  <PanelWrapper>
    <Modal v-if="showPicker" @close="showPicker = false">
      <ChromePicker disable-alpha v-model="settingsStore.player.colour" />
    </Modal>

    <Modal v-if="showDirection" @close="showDirection = false">
      <Wheel v-model="settingsStore.player.direction" />
    </Modal>

    <Modal v-if="showTopHatDirection" @close="showTopHatDirection = false">
      <Wheel v-model="settingsStore.player.topHatDirection" />
    </Modal>

    <div class="w-full flex flex-wrap gap-3">
      <label
        v-for="colour in COLOURS"
        :key="colour"
        class="colour-box"
        :style="{
          backgroundColor: colour,
        }"
      >
        <input
          type="radio"
          name="player_colour"
          :value="colour"
          v-model="settingsStore.player.colour"
        />
      </label>

      <label
        class="colour-box cursor-pointer"
        :style="{ backgroundImage: 'linear-gradient(to right, #c37373, #8bc373, #91b2db)' }"
        @click="showPicker = true"
      >
        <input
          type="radio"
          name="player_colour"
          :checked="!COLOURS.includes(settingsStore.player.colour)"
        />
      </label>
    </div>

    <div class="flex flex-col gap-2">
      <TextInput placeholder="Name" v-model="settingsStore.player.name" />
      <TextInput placeholder="Tribe Name" v-model="settingsStore.player.tribe" />
    </div>

    <div class="flex flex-col gap-1">
      <BooleanInput label="Show Skull" v-model="settingsStore.player.skull" />
      <BooleanInput label="Show Crown" v-model="settingsStore.player.crown" />
    </div>

    <div class="flex flex-col gap-3">
      <NumberInput placeholder="Health" v-model="settingsStore.player.health" :min="0" :max="100" />
      <Slider v-model="settingsStore.player.health" class="mb-2" :min="0" :max="100" :snap="false"/>
    </div>

    <div class="flex flex-col">
      <RadioInput
        name="hp-bar-colour"
        label="Green Health Bar"
        value="green"
        v-model="settingsStore.player.hpBarColour"
      />
      <RadioInput
        name="hp-bar-colour"
        label="Red Health Bar"
        value="red"
        v-model="settingsStore.player.hpBarColour"
      />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <NumberInput
          class="flex-1"
          placeholder="Direction"
          v-model="settingsStore.player.direction"
          :min="0"
          :max="360"
        />
        <Button style="width: unset" @click="showDirection = true">
          <LucideClock12 color="white" />
        </Button>
      </div>
      <div class="flex gap-2">
        <NumberInput
          class="flex-1"
          placeholder="Top Hat Direction"
          v-model="settingsStore.player.topHatDirection"
          :min="0"
          :max="360"
        />
        <Button style="width: unset" @click="showTopHatDirection = true">
          <LucideClock12 color="white" />
        </Button>
      </div>
    </div>
  </PanelWrapper>
</template>

<style scoped>
@reference "@/assets/main.css";

.colour-box {
  @apply w-9 aspect-square cursor-pointer rounded-full;
  border: 3.5px solid var(--player-colour-border);

  &:hover,
  &:has(:checked) {
    @apply rounded-lg;
  }

  input {
    @apply hidden;
  }
}
</style>
