<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore';
import Panel from './base/Panel.vue';
import BooleanInput from './base/BooleanInput.vue';
import NumberInput from './base/NumberInput.vue';
import Button from './base/Button.vue';

const settingsStore = useSettingsStore()
</script>

<template>
  <Panel>
    <div class="relative w-full aspect-square">
      <div class="absolute w-full h-full bg-(--background-color)"></div>
      <div v-show="settingsStore.filter" class="absolute w-full h-full bg-(--background-filter-color)"></div>
      <canvas class="absolute w-full h-full"></canvas>
    </div>

    <BooleanInput label="Filter" v-model="settingsStore.filter" />

    <div class="flex justify-between w-full gap-10">
      <NumberInput placeholder="Resolution" v-model="settingsStore.resolution" class="flex-1" />
      <NumberInput placeholder="Zoom Scale" v-model="settingsStore.zoomScale" class="flex-1" />
    </div>

    <Button>Regenerate</Button>
    <Button>Copy</Button>
    <Button>Save</Button>
  </Panel>
</template>