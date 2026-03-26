import { ACCESSORIES, HATS, ITEMS, PROJECTILES, WEAPONS } from './gameData'
import { randomInt } from './generate'

var maxScreenWidth = 1920,
  maxScreenHeight = 1080,
  scaleFillNative = 1

const outlineColor = '#525252',
  darkOutlineColor = '#3d3f42',
  outlineWidth = 5.5

const spriteCanvas = document.createElement('canvas')
const spriteContext = spriteCanvas.getContext('2d')!
const filterCanvas = document.createElement('canvas')
const filterContext = filterCanvas.getContext('2d')!
spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = 300

// RENDER LEAF:
function renderLeaf(x: number, y: number, l: number, r: number, ctxt: CanvasRenderingContext2D) {
  x *= scaleFillNative
  y *= scaleFillNative
  l *= scaleFillNative
  var endX = x + l * Math.cos(r)
  var endY = y + l * Math.sin(r)
  var width = l * 0.4
  ctxt.moveTo(x, y)
  ctxt.beginPath()
  ctxt.quadraticCurveTo(
    (x + endX) / 2 + width * Math.cos(r + Math.PI / 2),
    (y + endY) / 2 + width * Math.sin(r + Math.PI / 2),
    endX,
    endY,
  )
  ctxt.quadraticCurveTo(
    (x + endX) / 2 - width * Math.cos(r + Math.PI / 2),
    (y + endY) / 2 - width * Math.sin(r + Math.PI / 2),
    x,
    y,
  )
  ctxt.closePath()
  ctxt.fill()
  ctxt.stroke()
}

// RENDER CIRCLE:
function renderCircle(
  x: number,
  y: number,
  scale: number,
  tmpContext?: CanvasRenderingContext2D,
  dontStroke?: boolean,
  dontFill?: boolean,
) {
  x *= scaleFillNative
  y *= scaleFillNative
  scale *= scaleFillNative
  tmpContext = tmpContext || spriteContext
  tmpContext.beginPath()
  tmpContext.arc(x, y, scale, 0, 2 * Math.PI)
  if (!dontFill) tmpContext.fill()
  if (!dontStroke) tmpContext.stroke()
}

// RENDER STAR SHAPE:
function renderStar(
  ctxt: CanvasRenderingContext2D,
  spikes: number,
  outer: number,
  inner: number,
  dontStroke?: boolean,
  dontFill?: boolean,
) {
  outer *= scaleFillNative
  inner *= scaleFillNative

  const cx = Math.max(outer, inner)
  const cy = Math.max(outer, inner)
  var rot = (Math.PI / 2) * 3
  var x = cx
  var y = cy
  var step = Math.PI / spikes

  ctxt.save()
  ctxt.translate(-cx, -cy)
  ctxt.beginPath()
  ctxt.moveTo(cx, cy - outer)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outer
    y = cy + Math.sin(rot) * outer
    ctxt.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * inner
    y = cy + Math.sin(rot) * inner
    ctxt.lineTo(x, y)
    rot += step
  }
  ctxt.lineTo(cx, cy - outer)
  ctxt.closePath()
  if (!dontFill) ctxt.fill()
  if (!dontStroke) ctxt.stroke()
  ctxt.restore()
}

// RENDER RECTANGLE:
function renderRect(
  x: number,
  y: number,
  w: number,
  h: number,
  ctxt: CanvasRenderingContext2D,
  stroke?: boolean,
) {
  x *= scaleFillNative
  y *= scaleFillNative
  w *= scaleFillNative
  h *= scaleFillNative
  ctxt.fillRect(x - w / 2, y - h / 2, w, h)
  if (!stroke) {
    ctxt.strokeRect(x - w / 2, y - h / 2, w, h)
  }
}

// RENDER RECTCIRCLE:
function renderRectCircle(
  x: number,
  y: number,
  s: number,
  sw: number,
  seg: number,
  ctxt: CanvasRenderingContext2D,
  stroke?: boolean,
) {
  x *= scaleFillNative
  y *= scaleFillNative
  ctxt.save()
  ctxt.translate(x, y)
  seg = Math.ceil(seg / 2)
  for (var i = 0; i < seg; i++) {
    renderRect(0, 0, s * 2, sw, ctxt, stroke)
    ctxt.rotate(Math.PI / seg)
  }
  ctxt.restore()
}

// RENDER BLOB:
function renderBlob(ctxt: CanvasRenderingContext2D, spikes: number, outer: number, inner: number) {
  outer *= scaleFillNative
  inner *= scaleFillNative
  var rot = (Math.PI / 2) * 3
  var step = Math.PI / spikes
  var tmpOuter
  ctxt.beginPath()
  ctxt.moveTo(0, -inner)
  for (var i = 0; i < spikes; i++) {
    tmpOuter = randomInt(outer + 0.9, outer * 1.2)
    ctxt.quadraticCurveTo(
      Math.cos(rot + step) * tmpOuter,
      Math.sin(rot + step) * tmpOuter,
      Math.cos(rot + step * 2) * inner,
      Math.sin(rot + step * 2) * inner,
    )
    rot += step * 2
  }
  ctxt.lineTo(0, -inner)
  ctxt.closePath()
}

// RENDER TRIANGLE:
function renderTriangle(s: number, ctx: CanvasRenderingContext2D) {
  s *= scaleFillNative
  ctx = ctx || spriteContext
  var h = s * (Math.sqrt(3) / 2)
  ctx.beginPath()
  ctx.moveTo(0, -h / 2)
  ctx.lineTo(-s / 2, h / 2)
  ctx.lineTo(s / 2, h / 2)
  ctx.lineTo(0, -h / 2)
  ctx.fill()
  ctx.closePath()
}

// ROUND RECT:
function roundRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  ctx: CanvasRenderingContext2D,
) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  if (r < 0) {
    r = 0
  }
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function getResSprite(name: string, scale: number, biomeID: number, asIcon: boolean) {
  if (name == 'none') {
    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = tmpCanvas.height = 1
    return tmpCanvas
  }
  scaleFillNative = asIcon ? 1 : scaleFillNative
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = tmpCanvas.height =
    ((name == 'volcano' ? 640 : scale) * 2.1 + outlineWidth) * scaleFillNative
  const tmpContext = tmpCanvas.getContext('2d')!
  tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
  tmpContext.strokeStyle = outlineColor
  tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative
  if (name == 'fivestartree' || name == 'sevenstartree') {
    var tmpScale
    for (var i = 0; i < 2; ++i) {
      tmpScale = scale * (!i ? 1 : 0.5)
      tmpContext.fillStyle = !biomeID ? (!i ? '#9ebf57' : '#b4db62') : !i ? '#e3f1f4' : '#fff'
      renderStar(
        tmpContext,
        name == 'fivestartree' ? 5 : 7,
        tmpScale,
        tmpScale * 0.7,
        !i ? false : true,
      )
    }
  } else if (name == 'bush') {
    if (biomeID == 2) {
      tmpContext.fillStyle = '#606060'
      renderStar(tmpContext, 6, scale * 0.3, scale * 0.71)
      tmpContext.fillStyle = '#89a54c'
      renderCircle(0, 0, scale * 0.55, tmpContext)
      tmpContext.fillStyle = '#a5c65b'
      renderCircle(0, 0, scale * 0.3, tmpContext, true)
    } else {
      renderBlob(tmpContext, 6, scale, scale * 0.7)
      tmpContext.fillStyle = biomeID ? '#e3f1f4' : '#89a54c'
      tmpContext.fill()
      tmpContext.stroke()
      tmpContext.fillStyle = biomeID ? '#6a64af' : '#c15555'
      var tmpRange
      var berries = 4
      var rotVal = (Math.PI * 2) / berries
      for (let i = 0; i < berries; ++i) {
        tmpRange = scale / 2.3
        renderCircle(
          tmpRange * Math.cos(rotVal * i),
          tmpRange * Math.sin(rotVal * i),
          randomInt(10, 12),
          tmpContext,
        )
      }
    }
  } else if (name == 'rock' || name == 'gold') {
    tmpContext.fillStyle = name == 'rock' ? (biomeID == 2 ? '#938d77' : '#939393') : '#e0c655'
    renderStar(tmpContext, 3, scale, scale)
    tmpContext.fillStyle = name == 'rock' ? (biomeID == 2 ? '#b2ab90' : '#bcbcbc') : '#ebdca3'
    renderStar(tmpContext, 3, scale * 0.55, scale * 0.65, true)
  } else if (name == 'volcano') {
    tmpContext.strokeStyle = '#3e3e3e'
    tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative * 2
    tmpContext.fillStyle = '#7f7f7f'
    renderStar(tmpContext, 5, 640, 640)
    tmpContext.strokeStyle = '#f56f16'
    tmpContext.lineWidth =
      outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative * 1.6
    tmpContext.fillStyle = '#f54e16'
    renderStar(tmpContext, 5, scale * 2, scale * 2)
  }
  return tmpCanvas
}

function getItemSprite(name: string, rotate: boolean, asIcon: boolean, spikeBuild = false) {
  if (name == 'none') {
    const tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = tmpCanvas.height = 1
    return tmpCanvas
  }
  scaleFillNative = asIcon ? 1 : scaleFillNative
  const obj = ITEMS[name]!
  const tmpCanvas = document.createElement('canvas')
  var spritePadding = 0
  if (obj.spritePadding) {
    if (name == 'spikes' || name == 'greaterspikes' || name == 'poisonspikes') {
      if (spikeBuild) {
        spritePadding = obj.spritePadding
      }
    } else {
      spritePadding = obj.spritePadding
    }
  }
  tmpCanvas.width = tmpCanvas.height =
    ((obj.scale + (name === 'blockerwithcircle' ? 300 : 0)) * 2.5 + outlineWidth + spritePadding) *
    scaleFillNative
  const tmpContext = tmpCanvas.getContext('2d')!
  tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
  tmpContext.rotate(asIcon || !rotate ? 0 : Math.PI / 2)
  tmpContext.strokeStyle = outlineColor
  tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative
  if (name == 'apple') {
    tmpContext.fillStyle = '#c15555'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fillStyle = '#89a54c'
    var leafDir = -(Math.PI / 2)
    renderLeaf(
      obj.scale * Math.cos(leafDir),
      obj.scale * Math.sin(leafDir),
      25,
      leafDir + Math.PI / 2,
      tmpContext,
    )
  } else if (name == 'cookie') {
    tmpContext.fillStyle = '#cca861'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fillStyle = '#937c4b'
    let chips = 4
    let rotVal = (Math.PI * 2) / chips
    let tmpRange
    for (let i = 0; i < chips; ++i) {
      tmpRange = randomInt(obj.scale / 2.5, obj.scale / 1.7)
      renderCircle(
        tmpRange * Math.cos(rotVal * i),
        tmpRange * Math.sin(rotVal * i),
        randomInt(4, 5),
        tmpContext,
        true,
      )
    }
  } else if (name == 'cheese') {
    tmpContext.fillStyle = '#f4f3ac'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fillStyle = '#c3c28b'
    let chips = 4
    let rotVal = (Math.PI * 2) / chips
    let tmpRange
    for (let i = 0; i < chips; ++i) {
      tmpRange = randomInt(obj.scale / 2.5, obj.scale / 1.7)
      renderCircle(
        tmpRange * Math.cos(rotVal * i),
        tmpRange * Math.sin(rotVal * i),
        randomInt(4, 5),
        tmpContext,
        true,
      )
    }
  } else if (name == 'woodwall' || name == 'stonewall' || name == 'castlewall') {
    tmpContext.fillStyle =
      name == 'castlewall' ? '#83898e' : name == 'woodwall' ? '#a5974c' : '#939393'
    var sides = name == 'castlewall' ? 4 : 3
    renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1)
    tmpContext.fillStyle =
      name == 'castlewall' ? '#9da4aa' : name == 'woodwall' ? '#c9b758' : '#bcbcbc'
    renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65, true)
  } else if (name == 'spikes' || name == 'greaterspikes' || name == 'poisonspikes') {
    tmpContext.fillStyle = name == 'poisonspikes' ? '#7b935d' : '#939393'
    let tmpScale = obj.scale * 0.6
    renderStar(tmpContext, name == 'spikes' ? 5 : 6, obj.scale, tmpScale)
    tmpContext.fillStyle = '#a5974c'
    renderCircle(0, 0, tmpScale, tmpContext)
    tmpContext.fillStyle = '#c9b758'
    renderCircle(0, 0, tmpScale / 2, tmpContext, true)
  } else if (name == 'windmill' || name == 'fasterwindmill') {
    tmpContext.fillStyle = '#a5974c'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fillStyle = '#c9b758'
    renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext)
    tmpContext.fillStyle = '#a5974c'
    renderCircle(0, 0, obj.scale * 0.5, tmpContext)
  } else if (name == 'mine') {
    tmpContext.fillStyle = '#939393'
    renderStar(tmpContext, 3, obj.scale, obj.scale)
    tmpContext.fillStyle = '#bcbcbc'
    renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65, true)
  } else if (name == 'sapling') {
    for (let i = 0; i < 2; ++i) {
      let tmpScale = obj.scale * (!i ? 1 : 0.5)
      tmpContext.fillStyle = !i ? '#9ebf57' : '#b4db62'
      renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7, true)
      if (!i) tmpContext.stroke()
    }
  } else if (name == 'pittrap' || name == 'invisiblepittrap') {
    tmpContext.fillStyle = '#a5974c'
    renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1)
    tmpContext.fillStyle = outlineColor
    renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65, true)
  } else if (name == 'boostpad') {
    tmpContext.fillStyle = '#7e7f82'
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.fillStyle = '#dbd97d'
    renderTriangle(obj.scale * 1, tmpContext)
  } else if (name == 'turret') {
    tmpContext.fillStyle = '#a5974c'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.fillStyle = '#939393'
    var tmpLen = 50
    renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext)
    renderCircle(0, 0, obj.scale * 0.6, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
  } else if (name == 'platform') {
    tmpContext.fillStyle = '#cebd5f'
    var tmpCount = 4
    var tmpS = obj.scale * 2
    var tmpW = tmpS / tmpCount
    var tmpX = -(obj.scale / 2)
    for (let i = 0; i < tmpCount; ++i) {
      renderRect(tmpX - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext)
      tmpContext.fill()
      tmpContext.stroke()
      tmpX += tmpS / tmpCount
    }
  } else if (name == 'healingpad') {
    tmpContext.fillStyle = '#7e7f82'
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.fillStyle = '#db6e6e'
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
  } else if (name == 'spawnpad') {
    tmpContext.fillStyle = '#7e7f82'
    renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.fillStyle = '#71aad6'
    renderCircle(0, 0, obj.scale * 0.6, tmpContext)
  } else if (name == 'blocker' || name == 'blockerwithcircle') {
    tmpContext.fillStyle = '#7e7f82'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.rotate(Math.PI / 4)
    tmpContext.fillStyle = '#db6e6e'
    renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
    if (name == 'blockerwithcircle') {
      tmpContext.strokeStyle = '#db6e6e'
      tmpContext.globalAlpha = 0.3
      tmpContext.lineWidth = 6 * (asIcon ? 10 : scaleFillNative)
      renderCircle(0, 0, 300, tmpContext, false, true)
    }
  } else if (name == 'teleporter') {
    tmpContext.fillStyle = '#7e7f82'
    renderCircle(0, 0, obj.scale, tmpContext)
    tmpContext.fill()
    tmpContext.stroke()
    tmpContext.rotate(Math.PI / 4)
    tmpContext.fillStyle = '#d76edb'
    renderCircle(0, 0, obj.scale * 0.5, tmpContext, true)
  }
  return tmpCanvas
}

// // RENDER PLAYER:
// async function renderPlayer(
//   colour: string,
//   skin: string,
//   tail: string,
//   weapon: string,
//   weaponVariant: string,
//   build: string,
//   projectile: string,
//   player: any,
//   ctxt: CanvasRenderingContext2D,
// ) {
//   ctxt = ctxt || spriteContext
//   ctxt.lineWidth = outlineWidth * scaleFillNative
//   ctxt.lineJoin = 'miter'
//   var handAngle = (Math.PI / 4) * (WEAPONS[weapon]?.armS || 1)
//   var oHandAngle = weapon ? WEAPONS[weapon]?.hndS || 1 : 1
//   var oHandDist = weapon ? WEAPONS[weapon]?.hndD || 1 : 1
//   // TAIL/CAPE:
//   if (tail) {
//     await renderTail(tail, ctxt)
//   }
//   // WEAPON BELLOW HANDS:
//   if (weapon && !WEAPONS[weapon]?.aboveHand) {
//     await renderTool(WEAPONS[weapon], weaponVariant, 35, 0, true, ctxt)
//     if (projectile && WEAPONS[weapon]?.projectile) {
//       await renderProjectile(projectile, 35, 0, spriteContext)
//     }
//   }
//   // HANDS:
//   ctxt.strokeStyle = outlineColor
//   ctxt.fillStyle = colour
//   renderCircle(35 * Math.cos(handAngle), 35 * Math.sin(handAngle), 14)
//   renderCircle(
//     35 * oHandDist * Math.cos(-handAngle * oHandAngle),
//     35 * oHandDist * Math.sin(-handAngle * oHandAngle),
//     14,
//   )
//   // WEAPON ABOVE HANDS:
//   if (weapon && WEAPONS[weapon]?.aboveHand) {
//     await renderTool(WEAPONS[weapon], weaponVariant, 35, 0, true, ctxt)
//     if (projectile && WEAPONS[weapon].projectile) {
//       await renderProjectile(projectile, 35, 0, spriteContext)
//     }
//   }
//   // BUILD ITEM:
//   if (build && ITEMS[build]) {
//     const tmpSprite = getItemSprite(build, true, false, true)
//     ctxt.drawImage(tmpSprite, 35 - ITEMS[build].holdOffset, -tmpSprite.width / 2)
//   }
//   // BODY:
//   renderCircle(0, 0, 35, ctxt)
//   // SKIN:
//   if (skin) {
//     ctxt.rotate(Math.PI / 2)
//     await renderSkin(skin, ctxt, null, null, player)
//   }
// }

// // RENDER SKINS:
// async function renderSkin(
//   index: number | string,
//   ctxt: CanvasRenderingContext2D,
//   scale: number,
//   parentSkin: any,
//   player?: any,
// ) {
//   const tmpObj = HATS[index as keyof typeof HATS]
//   const tmpSprite = await loadImage('img/hats/hat_' + index, skinSprites)
//   scale = parentSkin ? scale : tmpObj.scale
//   ctxt.save()
//   ctxt.drawImage(
//     tmpSprite,
//     (-scale * scaleFillNative) / 2,
//     (-scale * scaleFillNative) / 2,
//     scale * scaleFillNative,
//     scale * scaleFillNative,
//   )
//   ctxt.restore()
//   if (!parentSkin && tmpObj.topSprite) {
//     ctxt.save()
//     ctxt.rotate((parseFloat(player.TOPHATDIRECTION) * Math.PI) / 180 || 0)
//     await renderSkin(index + '_top', ctxt, scale, tmpObj)
//     ctxt.restore()
//   }
// }

// // RENDER TAIL:
// async function renderTail(index: number, ctxt: CanvasRenderingContext2D, translate = true) {
//   const tmpObj = ACCESSORIES[index]
//   const tmpSprite = await loadImage('img/accessories/access_' + index, accessSprites)
//   ctxt.save()
//   if (translate) {
//     ctxt.translate((-20 - (tmpObj?.xOff || 0)) * scaleFillNative, 0)
//   }

//   const scale = tmpObj?.scale || 0
//   ctxt.drawImage(
//     tmpSprite,
//     (-scale * scaleFillNative) / 2,
//     (-scale * scaleFillNative) / 2,
//     scale * scaleFillNative,
//     scale * scaleFillNative,
//   )
//   ctxt.restore()
// }

// // RENDER TOOL:
// async function renderTool(
//   obj: any,
//   variant: string,
//   x: number,
//   y: number,
//   translate = true,
//   ctxt: CanvasRenderingContext2D,
// ) {
//   const tmpSprite = await loadImage('img/weapons/' + obj.src + (variant || ''), toolSprites)
//   ctxt.drawImage(
//     tmpSprite,
//     ((translate ? x + obj.xOff : 0) - obj.length / 2) * scaleFillNative,
//     ((translate ? y + obj.yOff : 0) - obj.width / 2) * scaleFillNative,
//     obj.length * scaleFillNative,
//     obj.width * scaleFillNative,
//   )
// }

// // RENDER PROJECTILE:
// async function renderProjectile(
//   name: string,
//   x: number,
//   y: number,
//   ctxt: CanvasRenderingContext2D,
// ) {
//   if (name === 'turret') {
//     ctxt.fillStyle = '#939393'
//     ctxt.strokeStyle = outlineColor
//     ctxt.lineWidth = outlineWidth * scaleFillNative
//     renderCircle(x, y, PROJECTILES[name]?.scale ?? 0, ctxt)
//   } else {
//     const scale = PROJECTILES[name]?.scale ?? 0
//     ctxt.drawImage(
//       await loadImage('img/weapons/' + name, projectileSprites),
//       (x - scale / 2) * scaleFillNative,
//       (y - scale / 2) * scaleFillNative,
//       scale * scaleFillNative,
//       scale * scaleFillNative,
//     )
//   }
// }

export {
  renderLeaf,
  renderCircle,
  renderStar,
  renderRect,
  renderRectCircle,
  renderBlob,
  renderTriangle,
  getResSprite,
  getItemSprite,
}
