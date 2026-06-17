<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore'
import Panel from './base/Panel.vue'
import BooleanInput from './base/BooleanInput.vue'
import NumberInput from './base/NumberInput.vue'
import Button from './base/Button.vue'
import PanelWrapper from './base/PanelWrapper.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  darkOutlineColor,
  filterCanvas,
  filterContext,
  getItemSprite,
  getResSprite,
  outlineColor,
  outlineWidth,
  renderCircle,
  renderRoundRect,
  spriteCanvas,
  spriteContext,
} from '@/utils/render'
import {
  ACCESSORIES,
  ANIMALS,
  BUSH_SCALES,
  HATS,
  ITEMS,
  PROJECTILES,
  ROCK_SCALES,
  TREE_SCALES,
  WEAPONS,
  ZOOM_FACTOR,
} from '@/utils/gameData'
import { randomFloat, randomInt } from '@/utils/generate'
import { useSpriteStore } from '@/stores/useSpriteStore'
import type { Hat, Weapon } from '@/types/gameData'
import { toast } from 'vue3-toastify'

const settingsStore = useSettingsStore()
const spriteStore = useSpriteStore()

const mainCanvasElement = ref<HTMLCanvasElement | null>(null)
const mainContext = computed(() => {
  if (mainCanvasElement.value === null) return null
  return mainCanvasElement.value.getContext('2d')
})

let isMutatingZoom = false
let maxScreenWidth = 1920
let maxScreenHeight = 1080
let backgroundXOffset = 0
let backgroundYOffset = 0

function scaleBackground(square = true) {
  if (mainCanvasElement.value === null || mainContext.value === null) return

  maxScreenWidth = (1920 * settingsStore.zoomScale) / 100
  maxScreenHeight = (1080 * settingsStore.zoomScale) / 100

  const width = square ? settingsStore.resolution : (16 * settingsStore.resolution) / 9
  settingsStore.scaleFillNative = Math.max(
    width / maxScreenWidth,
    settingsStore.resolution / maxScreenHeight
  )

  mainCanvasElement.value.width = width
  spriteCanvas.width = width
  filterCanvas.width = width

  mainCanvasElement.value.height = settingsStore.resolution
  spriteCanvas.height = settingsStore.resolution
  filterCanvas.height = settingsStore.resolution

  spriteContext.setTransform(
    square ? 1 : settingsStore.scaleFillNative,
    0,
    0,
    square ? 1 : settingsStore.scaleFillNative,
    square ? width / 2 : (width - maxScreenWidth * settingsStore.scaleFillNative) / 2,
    square
      ? settingsStore.resolution / 2
      : (settingsStore.resolution - maxScreenHeight * settingsStore.scaleFillNative) / 2
  )

  mainContext.value.clearRect(0, 0, width, settingsStore.resolution)
  spriteContext.clearRect(0, 0, width, settingsStore.resolution)
  filterContext.clearRect(0, 0, width, settingsStore.resolution)

  mainContext.value.clearRect(0, 0, 1000, 1000)
  spriteContext.clearRect(0, 0, 1000, 1000)
  filterContext.clearRect(0, 0, 1000, 1000)
}

function resizePreview() {
  if (mainCanvasElement.value === null) return

  if (settingsStore.selectedCategory === 'background') {
    scaleBackground(false)
    backgroundXOffset = settingsStore.backgroundPosition.x - maxScreenWidth / 2
    backgroundYOffset = settingsStore.backgroundPosition.y - maxScreenHeight / 2
  } else {
    scaleBackground(true)
  }
}

async function generatePreview() {
  if (mainCanvasElement.value === null || mainContext.value === null) return

  isMutatingZoom = true

  settingsStore.zoomScale =
    ZOOM_FACTOR[
      settingsStore.selectedCategory === 'resources' && settingsStore.selectedResource === 'volcano'
        ? 'volcano'
        : settingsStore.selectedCategory === 'buildings' &&
            settingsStore.selectedBuilding === 'blockerwithcircle'
          ? 'blockerwithcircle'
          : settingsStore.selectedCategory
    ]

  await nextTick()

  isMutatingZoom = false

  resizePreview()

  // Buildings
  if (settingsStore.selectedCategory == 'buildings') {
    const tmpSprite = getItemSprite(settingsStore.selectedBuilding, false, false)
    spriteContext.save()
    spriteContext.globalAlpha = settingsStore.selectedBuilding == 'invisiblepittrap' ? 0.6 : 1
    spriteContext.translate(0, 0)
    spriteContext.drawImage(tmpSprite, -tmpSprite.width / 2, -tmpSprite.height / 2)
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Resources
  else if (settingsStore.selectedCategory == 'resources') {
    // Get scale
    const tmpScale =
      settingsStore.selectedResource == 'gold' || settingsStore.selectedResource == 'rock'
        ? ROCK_SCALES[randomInt(0, 2)]!
        : settingsStore.selectedResource == 'bush'
          ? BUSH_SCALES[randomInt(0, 2)]!
          : TREE_SCALES[randomInt(0, 3)]!

    // Get sprite
    const tmpSprite = getResSprite(
      settingsStore.selectedResource,
      settingsStore.selectedResource == 'volcano' ? randomFloat(170, 200) : tmpScale,
      settingsStore.selectedResourceBiome,
      false
    )
    spriteContext.save()
    spriteContext.drawImage(tmpSprite, -tmpSprite.width / 2, -tmpSprite.height / 2)
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Hats
  else if (settingsStore.selectedCategory == 'hats') {
    if (!settingsStore.selectedHat) {
      return
    }

    spriteContext.save()
    await renderSkin(
      settingsStore.selectedHat,
      settingsStore.selectedHat.toString(),
      spriteContext,
      0,
      null
    )
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Accessories
  else if (settingsStore.selectedCategory == 'accessories') {
    if (!settingsStore.selectedAccessory) {
      return
    }

    spriteContext.save()
    await renderTail(settingsStore.selectedAccessory, spriteContext, false)
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Weapons
  else if (settingsStore.selectedCategory == 'weapons') {
    if (!settingsStore.selectedWeapon || settingsStore.selectedWeaponVariant == null) {
      return
    }

    spriteContext.save()
    await renderTool(
      WEAPONS[settingsStore.selectedWeapon]!,
      settingsStore.selectedWeaponVariant,
      0,
      0,
      false,
      spriteContext
    )
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Projectiles
  else if (settingsStore.selectedCategory == 'projectiles') {
    if (!settingsStore.selectedProjectile) {
      return
    }

    spriteContext.save()
    await renderProjectile(
      settingsStore.selectedProjectile,
      0,
      0,
      spriteContext,
      PROJECTILES[settingsStore.selectedProjectile]?.scale
    )
    spriteContext.restore()

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      mainContext.value.globalCompositeOperation = 'source-atop'
      mainContext.value.drawImage(filterCanvas, 0, 0)
    }
  }

  // Player
  else if (settingsStore.selectedCategory == 'player') {
    spriteContext.save()
    spriteContext.rotate(
      (((settingsStore.player.direction ?? 0) * Math.PI) / 180 || 0) - 0.5 * Math.PI
    )
    await renderPlayer(
      settingsStore.player.colour,
      spriteContext,
      settingsStore.player.hat,
      settingsStore.player.accessory,
      settingsStore.player.holding?.type == 'weapon' ? settingsStore.player.holding.weapon : null,
      settingsStore.player.holding?.type == 'weapon'
        ? settingsStore.player.holding.weaponVariant
        : null,
      settingsStore.player.holding?.type == 'item' ? settingsStore.player.holding.item : null,
      settingsStore.player.projectile,
      settingsStore.player.topHatDirection ?? 0
    )
    spriteContext.restore()

    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = tmpCanvas.height = mainCanvasElement.value.width
    const tmpContext = tmpCanvas.getContext('2d')!

    tmpContext.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      tmpContext.globalCompositeOperation = 'source-atop'
      tmpContext.drawImage(filterCanvas, 0, 0)
    }

    mainContext.value.drawImage(tmpCanvas, 0, 0)
    mainContext.value.setTransform(
      settingsStore.scaleFillNative,
      0,
      0,
      settingsStore.scaleFillNative,
      mainCanvasElement.value.width / 2,
      mainCanvasElement.value.height / 2
    )
    if (
      settingsStore.player.tribe ||
      settingsStore.player.name ||
      settingsStore.player.skull ||
      settingsStore.player.crown
    ) {
      mainContext.value.save()

      // Render name and tribe
      let tmpText =
        (settingsStore.player.tribe ? '[' + settingsStore.player.tribe + '] ' : '') +
        (settingsStore.player.name || '')
      mainContext.value.font = `30px Hammersmith One`
      mainContext.value.fillStyle = '#fff'
      mainContext.value.strokeStyle = darkOutlineColor
      mainContext.value.textBaseline = 'middle'
      mainContext.value.textAlign = 'center'
      mainContext.value.lineWidth = 8
      mainContext.value.lineJoin = 'round'
      mainContext.value.strokeText(tmpText, 0, -35 - 34)
      mainContext.value.fillText(tmpText, 0, -35 - 34)

      // Render crown
      if (settingsStore.player.crown) {
        const crownSprite = await loadImage('img/icons/crown')
        if (!crownSprite) return

        mainContext.value.drawImage(
          crownSprite,
          -60 / 2 - mainContext.value.measureText(tmpText).width / 2 - 35,
          -35 - 34 - 60 / 2 - 5,
          60,
          60
        )
      }

      // Render skull
      if (settingsStore.player.skull) {
        const skullSprite = await loadImage('img/icons/skull')
        if (!skullSprite) return

        mainContext.value.drawImage(
          skullSprite,
          -60 / 2 + mainContext.value.measureText(tmpText).width / 2 + 35,
          -35 - 34 - 60 / 2 - 5,
          60,
          60
        )
      }

      mainContext.value.restore()
    }

    if (settingsStore.player.health) {
      mainContext.value.save()
      mainContext.value.fillStyle = darkOutlineColor
      renderRoundRect(-50 - 4.5, 35 + 34, 50 * 2 + 4.5 * 2, 17, 8, mainContext.value)
      mainContext.value.fill()
      mainContext.value.fillStyle =
        settingsStore.player.hpBarColour === 'green' ? '#8ecc51' : '#cc5151'
      renderRoundRect(
        -50,
        35 + 34 + 4.5,
        50 * 2 * (settingsStore.player.health / 100),
        17 - 4.5 * 2,
        7,
        mainContext.value
      )
      mainContext.value.fill()
      mainContext.value.restore()
    }
  }

  // Animal
  else if (settingsStore.selectedCategory == 'animals') {
    if (settingsStore.animal.selected == null) {
      return
    }

    const tmpObj = ANIMALS[settingsStore.animal.selected]!
    var tmpScale = tmpObj.scale * 1.2 * (tmpObj.spriteMlt || 1) * settingsStore.scaleFillNative
    spriteContext.save()
    spriteContext.rotate(((settingsStore.animal.direction ?? 0) * Math.PI) / 180 || 0)

    const tmpSprite = await loadImage('img/animals/' + settingsStore.animal.selected)
    if (!tmpSprite) return

    spriteContext.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2)

    spriteContext.restore()

    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = tmpCanvas.height = mainCanvasElement.value.width
    const tmpContext = tmpCanvas.getContext('2d')!

    tmpContext.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      filterContext.fillStyle = 'rgba(0, 0, 70, 0.35)'
      filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
      tmpContext.globalCompositeOperation = 'source-atop'
      tmpContext.drawImage(filterCanvas, 0, 0)
    }

    mainContext.value.drawImage(tmpCanvas, 0, 0)

    mainContext.value.setTransform(
      settingsStore.scaleFillNative,
      0,
      0,
      settingsStore.scaleFillNative,
      mainCanvasElement.value.width / 2,
      mainCanvasElement.value.height / 2
    )

    // Render name
    if (settingsStore.animal.name) {
      const tmpText = settingsStore.animal.name || ''

      mainContext.value.save()
      mainContext.value.font = `${tmpObj.nameScale || 30}px Hammersmith One`
      mainContext.value.fillStyle = '#fff'
      mainContext.value.strokeStyle = darkOutlineColor
      mainContext.value.textBaseline = 'middle'
      mainContext.value.textAlign = 'center'
      mainContext.value.lineWidth = tmpObj.nameScale ? 11 : 8
      mainContext.value.lineJoin = 'round'
      mainContext.value.strokeText(tmpText, 0, -tmpObj.scale - 34)
      mainContext.value.fillText(tmpText, 0, -tmpObj.scale - 34)
      mainContext.value.restore()
    }

    // Render health
    if (settingsStore.animal.health) {
      mainContext.value.save()
      mainContext.value.fillStyle = darkOutlineColor
      renderRoundRect(-50 - 4.5, tmpObj.scale + 34, 50 * 2 + 4.5 * 2, 17, 8, mainContext.value)
      mainContext.value.fill()
      mainContext.value.fillStyle = '#cc5151'
      renderRoundRect(
        -50,
        tmpObj.scale + 34 + 4.5,
        50 * 2 * (settingsStore.animal.health / 100),
        17 - 4.5 * 2,
        7,
        mainContext.value
      )
      mainContext.value.fill()
      mainContext.value.restore()
    }
  }

  // Background
  else if (settingsStore.selectedCategory == 'background') {
    spriteContext.globalAlpha = 1
    if (2400 - backgroundYOffset <= 0 && 14400 - 2400 - backgroundYOffset >= maxScreenHeight) {
      spriteContext.fillStyle = '#b6db66'
      spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
    } else if (14400 - 2400 - backgroundYOffset <= 0) {
      spriteContext.fillStyle = '#dbc666'
      spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
    } else if (2400 - backgroundYOffset >= maxScreenHeight) {
      spriteContext.fillStyle = '#fff'
      spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
    } else if (2400 - backgroundYOffset >= 0) {
      spriteContext.fillStyle = '#fff'
      spriteContext.fillRect(0, 0, maxScreenWidth, 2400 - backgroundYOffset)
      spriteContext.fillStyle = '#b6db66'
      spriteContext.fillRect(
        0,
        2400 - backgroundYOffset,
        maxScreenWidth,
        maxScreenHeight - (2400 - backgroundYOffset)
      )
    } else {
      spriteContext.fillStyle = '#b6db66'
      spriteContext.fillRect(0, 0, maxScreenWidth, 14400 - 2400 - backgroundYOffset)
      spriteContext.fillStyle = '#dbc666'
      spriteContext.fillRect(
        0,
        14400 - 2400 - backgroundYOffset,
        maxScreenWidth,
        maxScreenHeight - (14400 - 2400 - backgroundYOffset)
      )
    }

    function renderWaterBodies(padding: number) {
      var tmpW = 724 + padding
      var tmpY = 14400 / 2 - backgroundYOffset - tmpW / 2
      if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
        spriteContext.fillRect(0, tmpY, maxScreenWidth, tmpW)
      }
    }

    spriteContext.fillStyle = '#dbc666'
    renderWaterBodies(114)
    spriteContext.fillStyle = '#91b2db'
    renderWaterBodies(randomFloat(0, 0.3) * 250)

    if (settingsStore.showBackgroundGrid) {
      spriteContext.lineWidth = 4
      spriteContext.strokeStyle = '#000'
      spriteContext.globalAlpha = 0.06
      spriteContext.beginPath()
      for (
        var x = -settingsStore.backgroundPosition.x;
        x < maxScreenWidth;
        x += maxScreenHeight / 18
      ) {
        if (x > 0) {
          spriteContext.moveTo(x, 0)
          spriteContext.lineTo(x, maxScreenHeight)
        }
      }
      for (
        var y = -settingsStore.backgroundPosition.y;
        y < maxScreenHeight;
        y += maxScreenHeight / 18
      ) {
        if (x > 0) {
          spriteContext.moveTo(0, y)
          spriteContext.lineTo(maxScreenWidth, y)
        }
      }
      spriteContext.stroke()
    }

    spriteContext.fillStyle = '#000'
    spriteContext.globalAlpha = 0.09
    if (backgroundXOffset <= 0) {
      spriteContext.fillRect(0, 0, -backgroundXOffset, maxScreenHeight)
    }
    if (14400 - backgroundXOffset <= maxScreenWidth) {
      var tmpY = Math.max(0, -backgroundYOffset)
      spriteContext.fillRect(
        14400 - backgroundXOffset,
        tmpY,
        maxScreenWidth - (14400 - backgroundXOffset),
        maxScreenHeight - tmpY
      )
    }
    if (backgroundYOffset <= 0) {
      spriteContext.fillRect(
        -backgroundXOffset,
        0,
        maxScreenWidth + backgroundXOffset,
        -backgroundYOffset
      )
    }
    if (14400 - backgroundYOffset <= maxScreenHeight) {
      let tmpX = Math.max(0, -backgroundXOffset)
      var tmpMin = 0
      if (14400 - backgroundXOffset <= maxScreenWidth) {
        tmpMin = maxScreenWidth - (14400 - backgroundXOffset)
      }
      spriteContext.fillRect(
        tmpX,
        14400 - backgroundYOffset,
        maxScreenWidth - tmpX - tmpMin,
        maxScreenHeight - (14400 - backgroundYOffset)
      )
    }

    mainContext.value.drawImage(spriteCanvas, 0, 0)
    if (settingsStore.filter) {
      mainContext.value.globalAlpha = 1
      mainContext.value.fillStyle = 'rgba(0, 0, 70, 0.35)'
      mainContext.value.fillRect(
        0,
        0,
        mainCanvasElement.value.width,
        mainCanvasElement.value.height
      )
    }
  }
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement | null>(resolve => {
    if (spriteStore.imgSprites[url]) {
      resolve(spriteStore.imgSprites[url])
    } else {
      var tmpSprite = new Image()
      tmpSprite.src = url + '.png'
      tmpSprite.onload = function () {
        spriteStore.imgSprites[url] = tmpSprite
        resolve(tmpSprite)
      }
      tmpSprite.onerror = function () {
        resolve(null)
      }
    }
  })
}

// RENDER SKINS:
async function renderSkin(
  index: number,
  srcIndex: string,
  ctx: CanvasRenderingContext2D,
  scale: number,
  parentHat?: Hat | null,
  topHatDirection = 0
) {
  const tmpObj = parentHat ?? HATS[index as keyof typeof HATS]!
  const tmpSprite = await loadImage('img/hats/hat_' + srcIndex)
  if (!tmpSprite) return

  const finalScale = parentHat ? scale : tmpObj.scale

  ctx.save()
  ctx.drawImage(
    tmpSprite,
    (-finalScale * settingsStore.scaleFillNative) / 2,
    (-finalScale * settingsStore.scaleFillNative) / 2,
    finalScale * settingsStore.scaleFillNative,
    finalScale * settingsStore.scaleFillNative
  )
  ctx.restore()

  if (!parentHat && tmpObj.topSprite) {
    ctx.save()
    ctx.rotate((topHatDirection * Math.PI) / 180 || 0)
    await renderSkin(index, index + '_top', ctx, finalScale, tmpObj)
    ctx.restore()
  }
}

// RENDER TAIL:
async function renderTail(index: number, ctx: CanvasRenderingContext2D, translate = true) {
  const tmpObj = ACCESSORIES[index]
  const tmpSprite = await loadImage('img/accessories/access_' + index)
  if (!tmpSprite) return

  ctx.save()
  if (translate) {
    ctx.translate((-20 - (tmpObj?.xOff || 0)) * settingsStore.scaleFillNative, 0)
  }

  const scale = tmpObj?.scale || 0
  ctx.drawImage(
    tmpSprite,
    (-scale * settingsStore.scaleFillNative) / 2,
    (-scale * settingsStore.scaleFillNative) / 2,
    scale * settingsStore.scaleFillNative,
    scale * settingsStore.scaleFillNative
  )
  ctx.restore()
}

// RENDER TOOL:
async function renderTool(
  obj: Weapon,
  variant: string,
  x: number,
  y: number,
  translate = true,
  ctx: CanvasRenderingContext2D
) {
  const tmpSprite = await loadImage('img/weapons/' + obj.src + (variant || ''))
  if (!tmpSprite) return

  ctx.drawImage(
    tmpSprite,
    ((translate ? x + obj.xOff : 0) - obj.length / 2) * settingsStore.scaleFillNative,
    ((translate ? y + obj.yOff : 0) - obj.width / 2) * settingsStore.scaleFillNative,
    obj.length * settingsStore.scaleFillNative,
    obj.width * settingsStore.scaleFillNative
  )
}

// RENDER PROJECTILE:
async function renderProjectile(
  name: string,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  scale = 0
) {
  if (name === 'turret') {
    ctx.fillStyle = '#939393'
    ctx.strokeStyle = outlineColor
    ctx.lineWidth = outlineWidth * settingsStore.scaleFillNative
    renderCircle(x, y, scale, ctx)
  } else {
    const tmpSprite = await loadImage('img/weapons/' + name)
    if (!tmpSprite) return

    ctx.drawImage(
      tmpSprite,
      (x - scale / 2) * settingsStore.scaleFillNative,
      (y - scale / 2) * settingsStore.scaleFillNative,
      scale * settingsStore.scaleFillNative,
      scale * settingsStore.scaleFillNative
    )
  }
}

// RENDER PLAYER:
async function renderPlayer(
  colour: string,
  ctx: CanvasRenderingContext2D,
  skin: number | null,
  tail: number | null,
  weapon: string | null,
  weaponVariant: string | null,
  build: string | null,
  projectile: string | null,
  topHatDirection = 0
) {
  ctx = ctx || spriteContext
  ctx.lineWidth = outlineWidth * settingsStore.scaleFillNative
  ctx.lineJoin = 'miter'

  let armS = 1
  let hndS = 1
  let hndD = 1
  if (weapon) {
    armS = WEAPONS[weapon]?.armS || 1
    hndS = WEAPONS[weapon]?.hndS || 1
    hndD = WEAPONS[weapon]?.hndD || 1
  }

  var handAngle = (Math.PI / 4) * armS
  var oHandAngle = hndS
  var oHandDist = hndD

  // TAIL:
  if (tail != null) {
    await renderTail(tail, ctx)
  }

  // WEAPON BELLOW HANDS:
  if (weapon && weaponVariant != null && !WEAPONS[weapon]?.aboveHand) {
    await renderTool(WEAPONS[weapon]!, weaponVariant, 35, 0, true, ctx)
    if (projectile && WEAPONS[weapon]?.projectile) {
      await renderProjectile(projectile, 35, 0, spriteContext, PROJECTILES[projectile]?.scale)
    }
  }

  // HANDS:
  ctx.strokeStyle = outlineColor
  ctx.fillStyle = colour
  renderCircle(35 * Math.cos(handAngle), 35 * Math.sin(handAngle), 14, ctx)
  renderCircle(
    35 * oHandDist * Math.cos(-handAngle * oHandAngle),
    35 * oHandDist * Math.sin(-handAngle * oHandAngle),
    14,
    ctx
  )

  // WEAPON ABOVE HANDS:
  if (weapon && weaponVariant != null && WEAPONS[weapon]?.aboveHand) {
    await renderTool(WEAPONS[weapon], weaponVariant, 35, 0, true, ctx)
    if (projectile && WEAPONS[weapon].projectile) {
      await renderProjectile(projectile, 35, 0, spriteContext, PROJECTILES[projectile]?.scale)
    }
  }

  // BUILD ITEM:
  if (build && ITEMS[build]) {
    const tmpSprite = getItemSprite(build, true, false, true)
    ctx.drawImage(tmpSprite, 35 - ITEMS[build].holdOffset, -tmpSprite.width / 2)
  }

  // BODY:
  renderCircle(0, 0, 35, ctx)

  // SKIN:
  if (skin) {
    ctx.rotate(Math.PI / 2)
    await renderSkin(skin, skin.toString(), ctx, 0, null, topHatDirection)
  }
}

watch(
  () => settingsStore.zoomScale,
  () => {
    if (
      settingsStore.selectedCategory === 'resources' &&
      settingsStore.selectedResource === 'volcano'
    ) {
      ZOOM_FACTOR.volcano = settingsStore.zoomScale
    } else if (
      settingsStore.selectedCategory === 'buildings' &&
      settingsStore.selectedBuilding === 'blockerwithcircle'
    ) {
      ZOOM_FACTOR.blockerwithcircle = settingsStore.zoomScale
    } else {
      ZOOM_FACTOR[settingsStore.selectedCategory] = settingsStore.zoomScale
    }
  },
  { immediate: true }
)

watch(
  () => settingsStore.$state,
  async () => {
    if (isMutatingZoom) return

    await nextTick()

    await generatePreview()
  },
  { deep: true }
)

onMounted(async () => {
  await generatePreview()

  document.onresize = async () => {
    await generatePreview()
  }
})

async function copyImage() {
  if (mainCanvasElement.value === null) return

  try {
    mainCanvasElement.value.toBlob(async blob => {
      if (!blob) {
        console.error('Failed to generate image blob.')
        return
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      toast.success('Image copied to clipboard successfully!', {
        autoClose: 2000,
      })
    }, 'image/png')
  } catch (error) {
    console.error('Failed to copy image to clipboard:', error)
    toast.error(
      'Failed to copy image. Please try to copy it manually by right-clicking the canvas.',
      {
        autoClose: 4000,
      }
    )
  }
}

async function saveImage() {
  if (mainCanvasElement.value === null) return

  try {
    const dataUrl = mainCanvasElement.value.toDataURL('image/png')

    const downloadLink = document.createElement('a')
    downloadLink.href = dataUrl
    downloadLink.download = `MooMooElement_${Date.now()}.png`

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  } catch (error) {
    console.error('Failed to export and download image asset:', error)
    toast.error(
      'Failed to save the image asset. Please try to save it manually by right-clicking the canvas.',
      {
        autoClose: 4000,
      }
    )
  }
}
</script>

<template>
  <Panel>
    <PanelWrapper>
      <div
        class="relative w-full"
        :class="[
          settingsStore.selectedCategory === 'background' ? 'aspect-video' : 'aspect-square',
        ]"
      >
        <div class="absolute w-full h-full bg-(--background-color)"></div>
        <div
          v-show="settingsStore.filter"
          class="absolute w-full h-full bg-(--background-filter-color)"
        ></div>
        <canvas ref="mainCanvasElement" class="absolute w-full h-full"></canvas>
      </div>

      <BooleanInput label="Filter" v-model="settingsStore.filter" />

      <div class="flex justify-between w-full gap-3">
        <NumberInput placeholder="Resolution" v-model="settingsStore.resolution" class="flex-1" />
        <NumberInput placeholder="Zoom Scale" v-model="settingsStore.zoomScale" class="flex-1" />
      </div>

      <Button @click="generatePreview">Regenerate</Button>
      <Button @click="copyImage">Copy</Button>
      <Button @click="saveImage">Save</Button>
    </PanelWrapper>
  </Panel>
</template>
