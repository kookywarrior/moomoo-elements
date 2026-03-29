import type { ImageSprites, UISprites } from '@/types/sprites'
import {
  ACCESSORIES,
  ANIMALS,
  HATS,
  ITEMS,
  PROJECTILES,
  RESOURCES,
  WEAPONS,
} from '@/utils/gameData'
import { getBlobURL } from '@/utils/image'
import {
  getItemSprite,
  getResSprite,
  getTurretProjectileSprite,
  renderCircle,
} from '@/utils/render'
import { defineStore } from 'pinia'
import { ref } from 'vue'

function createDefaultSprites() {
  const categories: (keyof UISprites)[] = [
    'hats',
    'accessories',
    'animals',
    'projectiles',
    'weapons',
    'items',
    'resources',
  ]

  return Object.fromEntries(categories.map(key => [key, []])) as unknown as UISprites
}

const useSpriteStore = defineStore('sprite', () => {
  // STATES
  const isLoaded = ref(false)
  const uiSrpites = ref(createDefaultSprites())
  const imgSprites = ref<ImageSprites>({})

  // ACTIONS
  async function loadHats() {
    const hatIds = Object.keys(HATS) as unknown as (keyof typeof HATS)[]

    const promises = hatIds.map(async id => {
      const isTopSprite = HATS[id]?.topSprite
      const suffix = isTopSprite ? '_p' : ''
      const url = `./img/hats/hat_${id}${suffix}.png`
      const blob = await getBlobURL(url)

      if (blob) {
        uiSrpites.value.hats.push({
          index: id,
          url: blob,
        })
      }
    })

    await Promise.all(promises)
  }

  async function loadAccessories() {
    const accessoryIds = Object.keys(ACCESSORIES) as unknown as (keyof typeof ACCESSORIES)[]

    const promises = accessoryIds.map(async id => {
      const url = `./img/accessories/access_${id}.png`
      const blob = await getBlobURL(url)

      if (blob) {
        uiSrpites.value.accessories.push({
          index: id,
          url: blob,
        })
      }
    })

    await Promise.all(promises)
  }

  async function loadAnimals() {
    const animalNames = Object.keys(ANIMALS) as unknown as (keyof typeof ANIMALS)[]

    const promises = animalNames.map(async name => {
      const url = `./img/animals/${name}.png`
      const blob = await getBlobURL(url)

      if (blob) {
        uiSrpites.value.animals.push({
          name,
          url: blob,
        })
      }
    })

    await Promise.all(promises)
  }

  async function loadProjectiles() {
    const projectileNames = Object.keys(PROJECTILES) as unknown as (keyof typeof PROJECTILES)[]

    const promises = projectileNames.map(async name => {
      if (name === 'turret') {
        const blob = await getTurretProjectileSprite(PROJECTILES[name]?.scale ?? 0)
        uiSrpites.value.projectiles.push({
          name,
          url: blob,
        })

        return
      }

      const url = `./img/weapons/${name}.png`
      const blob = await getBlobURL(url)

      if (blob) {
        uiSrpites.value.projectiles.push({
          name,
          url: blob,
        })
      }
    })

    await Promise.all(promises)
  }

  async function loadWeapons() {
    const weaponNames = Object.keys(WEAPONS) as unknown as (keyof typeof WEAPONS)[]
    const variants = ['', '_g', '_d', '_r']
    const promises: Promise<void>[] = []

    weaponNames.forEach(name => {
      variants.forEach(variant => {
        promises.push(
          (async () => {
            const src = WEAPONS[name]?.src
            const url = `./img/weapons/${src + variant}.png`
            const blob = await getBlobURL(url)

            if (blob) {
              uiSrpites.value.weapons.push({
                name,
                variant,
                url: blob,
              })
            }
          })()
        )
      })
    })

    await Promise.all(promises)
  }

  async function loadBuildings() {
    const itemNames = Object.keys(ITEMS) as unknown as (keyof typeof ITEMS)[]

    const promises = itemNames.map(async name => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 100
      const ctx = canvas.getContext('2d')!
      ctx.translate(50, 50)

      const tmpSprite = getItemSprite(name, false, true)
      const scale = Math.min(85, tmpSprite.width)

      ctx.globalAlpha = name === 'invisiblepittrap' ? 0.6 : 1
      ctx.drawImage(tmpSprite, -scale / 2, -scale / 2, scale, scale)

      // Blue overlay logic
      ctx.fillStyle = 'rgba(0, 0, 70, 0.1)'
      ctx.globalCompositeOperation = 'source-atop'
      ctx.fillRect(-scale / 2, -scale / 2, scale, scale)

      return new Promise<void>(resolve => {
        canvas.toBlob(blob => {
          if (blob) {
            uiSrpites.value.items.push({
              name,
              url: URL.createObjectURL(blob),
            })
          }
          resolve()
        })
      })
    })

    await Promise.all(promises)
  }

  async function loadResources() {
    const resourceNames = Object.keys(RESOURCES) as (keyof typeof RESOURCES)[]
    const promises: Promise<void>[] = []

    resourceNames.forEach(name => {
      const biomes = RESOURCES[name]

      biomes.forEach(biome => {
        promises.push(
          (async () => {
            const canvas = document.createElement('canvas')
            canvas.width = canvas.height = 100
            const ctx = canvas.getContext('2d')!

            ctx.translate(50, 50)
            ctx.imageSmoothingEnabled = false

            // Determine base scale based on resource type
            const baseScale =
              name === 'rock' || name === 'gold' || name === 'bush'
                ? 80
                : name === 'volcano'
                  ? 170
                  : 150

            // Call your existing game helper
            const tmpSprite = getResSprite(name, baseScale, biome, true)
            const drawScale = Math.min(85, tmpSprite.width)

            // Render to canvas
            ctx.drawImage(tmpSprite, -drawScale / 2, -drawScale / 2, drawScale, drawScale)

            // Apply the blue "Icon" overlay (source-atop keeps it within the sprite shape)
            ctx.fillStyle = 'rgba(0, 0, 70, 0.1)'
            ctx.globalCompositeOperation = 'source-atop'
            ctx.fillRect(-drawScale / 2, -drawScale / 2, drawScale, drawScale)

            await new Promise<void>(resolve => {
              canvas.toBlob(blob => {
                if (blob) {
                  uiSrpites.value.resources.push({
                    name,
                    biome,
                    url: URL.createObjectURL(blob),
                  })
                }
                resolve()
              })
            })
          })()
        )
      })
    })

    await Promise.all(promises)
  }

  async function init() {
    await Promise.all([
      loadHats(),
      loadAccessories(),
      loadAnimals(),
      loadProjectiles(),
      loadWeapons(),
      loadBuildings(),
      loadResources(),
    ])

    isLoaded.value = true
  }

  return {
    isLoaded,
    uiSrpites,
    imgSprites,

    init,
  }
})

export { useSpriteStore }
