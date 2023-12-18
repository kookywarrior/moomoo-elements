const UTILS = {
	randInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	},
	randFloat: function (min, max) {
		return Math.random() * (max - min) + min
	}
}

function loadImage(fileName, storage) {
	return new Promise((resolve) => {
		if (storage[fileName]) {
			resolve(storage[fileName])
		} else {
			var tmpSprite = new Image()
			tmpSprite.src = (fileName === "img/weapons/bow_1_d" ? "" : "https://moomoo.io/") + fileName + ".png"
			tmpSprite.onload = function () {
				storage[fileName] = tmpSprite
				resolve(tmpSprite)
			}
			tmpSprite.onerror = function () {
				resolve(null)
			}
		}
	})
}

var maxScreenWidth = 1920,
	maxScreenHeight = 1080,
	scaleFillNative = 1

var outlineColor = "#525252",
	darkOutlineColor = "#3d3f42",
	outlineWidth = 5.5
var scaleFillNative
const mainCanvas = document.getElementById("canvas")
const mainContext = mainCanvas.getContext("2d")
const spriteCanvas = document.createElement("canvas")
const spriteContext = spriteCanvas.getContext("2d")
const filterCanvas = document.createElement("canvas")
const filterContext = filterCanvas.getContext("2d")
mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = 300

// RENDER LEAF:
function renderLeaf(x, y, l, r, ctxt) {
	x *= scaleFillNative
	y *= scaleFillNative
	l *= scaleFillNative
	var endX = x + l * Math.cos(r)
	var endY = y + l * Math.sin(r)
	var width = l * 0.4
	ctxt.moveTo(x, y)
	ctxt.beginPath()
	ctxt.quadraticCurveTo((x + endX) / 2 + width * Math.cos(r + Math.PI / 2), (y + endY) / 2 + width * Math.sin(r + Math.PI / 2), endX, endY)
	ctxt.quadraticCurveTo((x + endX) / 2 - width * Math.cos(r + Math.PI / 2), (y + endY) / 2 - width * Math.sin(r + Math.PI / 2), x, y)
	ctxt.closePath()
	ctxt.fill()
	ctxt.stroke()
}

// RENDER CIRCLE:
function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
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
function renderStar(ctxt, spikes, outer, inner) {
	outer *= scaleFillNative
	inner *= scaleFillNative
	var rot = (Math.PI / 2) * 3
	var x, y
	var step = Math.PI / spikes
	ctxt.beginPath()
	ctxt.moveTo(0, -outer)
	for (var i = 0; i < spikes; i++) {
		x = Math.cos(rot) * outer
		y = Math.sin(rot) * outer
		ctxt.lineTo(x, y)
		rot += step
		x = Math.cos(rot) * inner
		y = Math.sin(rot) * inner
		ctxt.lineTo(x, y)
		rot += step
	}
	ctxt.lineTo(0, -outer)
	ctxt.closePath()
}

// RENDER RECTANGLE:
function renderRect(x, y, w, h, ctxt, stroke) {
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
function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
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
function renderBlob(ctxt, spikes, outer, inner) {
	outer *= scaleFillNative
	inner *= scaleFillNative
	var rot = (Math.PI / 2) * 3
	var step = Math.PI / spikes
	var tmpOuter
	ctxt.beginPath()
	ctxt.moveTo(0, -inner)
	for (var i = 0; i < spikes; i++) {
		tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2)
		ctxt.quadraticCurveTo(
			Math.cos(rot + step) * tmpOuter,
			Math.sin(rot + step) * tmpOuter,
			Math.cos(rot + step * 2) * inner,
			Math.sin(rot + step * 2) * inner
		)
		rot += step * 2
	}
	ctxt.lineTo(0, -inner)
	ctxt.closePath()
}

// RENDER TRIANGLE:
function renderTriangle(s, ctx) {
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

function getResSprite(name, scale, biomeID, asIcon) {
	if (name == "none") {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}
	scaleFillNative = asIcon ? 1 : scaleFillNative
	const tmpCanvas = document.createElement("canvas")
	tmpCanvas.width = tmpCanvas.height = ((name == "volcano" ? 640 : scale) * 2.1 + outlineWidth) * scaleFillNative
	const tmpContext = tmpCanvas.getContext("2d")
	tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
	tmpContext.strokeStyle = outlineColor
	tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative
	if (name == "fivestartree" || name == "sevenstartree") {
		var tmpScale
		for (var i = 0; i < 2; ++i) {
			tmpScale = scale * (!i ? 1 : 0.5)
			renderStar(tmpContext, name == "fivestartree" ? 5 : 7, tmpScale, tmpScale * 0.7)
			tmpContext.fillStyle = !biomeID ? (!i ? "#9ebf57" : "#b4db62") : !i ? "#e3f1f4" : "#fff"
			tmpContext.fill()
			if (!i) {
				tmpContext.stroke()
			}
		}
	} else if (name == "bush") {
		if (biomeID == 2) {
			tmpContext.fillStyle = "#606060"
			renderStar(tmpContext, 6, scale * 0.3, scale * 0.71)
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = "#89a54c"
			renderCircle(0, 0, scale * 0.55, tmpContext)
			tmpContext.fillStyle = "#a5c65b"
			renderCircle(0, 0, scale * 0.3, tmpContext, true)
		} else {
			renderBlob(tmpContext, 6, scale, scale * 0.7)
			tmpContext.fillStyle = biomeID ? "#e3f1f4" : "#89a54c"
			tmpContext.fill()
			tmpContext.stroke()
			tmpContext.fillStyle = biomeID ? "#6a64af" : "#c15555"
			var tmpRange
			var berries = 4
			var rotVal = (Math.PI * 2) / berries
			for (let i = 0; i < berries; ++i) {
				tmpRange = (scale / 3.5, scale / 2.3)
				renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(10, 12), tmpContext)
			}
		}
	} else if (name == "rock" || name == "gold") {
		tmpContext.fillStyle = name == "rock" ? (biomeID == 2 ? "#938d77" : "#939393") : "#e0c655"
		renderStar(tmpContext, 3, scale, scale)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = name == "rock" ? (biomeID == 2 ? "#b2ab90" : "#bcbcbc") : "#ebdca3"
		renderStar(tmpContext, 3, scale * 0.55, scale * 0.65)
		tmpContext.fill()
	} else if (name == "volcano") {
		tmpContext.strokeStyle = "#3e3e3e"
		tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative * 2
		tmpContext.fillStyle = "#7f7f7f"
		renderStar(tmpContext, 5, 640, 640)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.strokeStyle = "#f56f16"
		tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative * 1.6
		tmpContext.fillStyle = "#f54e16"
		renderStar(tmpContext, 5, scale * 2, scale * 2)
		tmpContext.fill()
		tmpContext.stroke()
	}
	return tmpCanvas
}

function getItemSprite(name, rotate, asIcon, spikeBuild = false) {
	if (name == "none") {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}
	scaleFillNative = asIcon ? 1 : scaleFillNative
	const obj = ITEMS[name]
	const tmpCanvas = document.createElement("canvas")
	var spritePadding = 0
	if (obj.spritePadding) {
		if (name == "spikes" || name == "greaterspikes" || name == "poisonspikes") {
			if (spikeBuild) {
				spritePadding = obj.spritePadding
			}
		} else {
			spritePadding = obj.spritePadding
		}
	}
	tmpCanvas.width = tmpCanvas.height = (obj.scale * 2.5 + outlineWidth + spritePadding) * scaleFillNative
	const tmpContext = tmpCanvas.getContext("2d")
	tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
	tmpContext.rotate(asIcon || !rotate ? 0 : Math.PI / 2)
	tmpContext.strokeStyle = outlineColor
	tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFillNative
	if (name == "apple") {
		tmpContext.fillStyle = "#c15555"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fillStyle = "#89a54c"
		var leafDir = -(Math.PI / 2)
		renderLeaf(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir), 25, leafDir + Math.PI / 2, tmpContext)
	} else if (name == "cookie") {
		tmpContext.fillStyle = "#cca861"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fillStyle = "#937c4b"
		let chips = 4
		let rotVal = (Math.PI * 2) / chips
		let tmpRange
		for (let i = 0; i < chips; ++i) {
			tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)
			renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true)
		}
	} else if (name == "cheese") {
		tmpContext.fillStyle = "#f4f3ac"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fillStyle = "#c3c28b"
		let chips = 4
		let rotVal = (Math.PI * 2) / chips
		let tmpRange
		for (let i = 0; i < chips; ++i) {
			tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7)
			renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true)
		}
	} else if (name == "woodwall" || name == "stonewall" || name == "castlewall") {
		tmpContext.fillStyle = name == "castlewall" ? "#83898e" : name == "woodwall" ? "#a5974c" : "#939393"
		var sides = name == "castlewall" ? 4 : 3
		renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = name == "castlewall" ? "#9da4aa" : name == "woodwall" ? "#c9b758" : "#bcbcbc"
		renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65)
		tmpContext.fill()
	} else if (name == "spikes" || name == "greaterspikes" || name == "poisonspikes") {
		tmpContext.fillStyle = name == "poisonspikes" ? "#7b935d" : "#939393"
		let tmpScale = obj.scale * 0.6
		renderStar(tmpContext, name == "spikes" ? 5 : 6, obj.scale, tmpScale)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#a5974c"
		renderCircle(0, 0, tmpScale, tmpContext)
		tmpContext.fillStyle = "#c9b758"
		renderCircle(0, 0, tmpScale / 2, tmpContext, true)
	} else if (name == "windmill" || name == "fasterwindmill") {
		tmpContext.fillStyle = "#a5974c"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fillStyle = "#c9b758"
		renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext)
		tmpContext.fillStyle = "#a5974c"
		renderCircle(0, 0, obj.scale * 0.5, tmpContext)
	} else if (name == "mine") {
		tmpContext.fillStyle = "#939393"
		renderStar(tmpContext, 3, obj.scale, obj.scale)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#bcbcbc"
		renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65)
		tmpContext.fill()
	} else if (name == "sapling") {
		for (let i = 0; i < 2; ++i) {
			let tmpScale = obj.scale * (!i ? 1 : 0.5)
			renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7)
			tmpContext.fillStyle = !i ? "#9ebf57" : "#b4db62"
			tmpContext.fill()
			if (!i) tmpContext.stroke()
		}
	} else if (name == "pittrap" || name == "invisiblepittrap") {
		tmpContext.fillStyle = "#a5974c"
		renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = outlineColor
		renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65)
		tmpContext.fill()
	} else if (name == "boostpad") {
		tmpContext.fillStyle = "#7e7f82"
		renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#dbd97d"
		renderTriangle(obj.scale * 1, tmpContext)
	} else if (name == "turret") {
		tmpContext.fillStyle = "#a5974c"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#939393"
		var tmpLen = 50
		renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext)
		renderCircle(0, 0, obj.scale * 0.6, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
	} else if (name == "platform") {
		tmpContext.fillStyle = "#cebd5f"
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
	} else if (name == "healingpad") {
		tmpContext.fillStyle = "#7e7f82"
		renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#db6e6e"
		renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
	} else if (name == "spawnpad") {
		tmpContext.fillStyle = "#7e7f82"
		renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.fillStyle = "#71aad6"
		renderCircle(0, 0, obj.scale * 0.6, tmpContext)
	} else if (name == "blocker") {
		tmpContext.fillStyle = "#7e7f82"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.rotate(Math.PI / 4)
		tmpContext.fillStyle = "#db6e6e"
		renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true)
	} else if (name == "teleporter") {
		tmpContext.fillStyle = "#7e7f82"
		renderCircle(0, 0, obj.scale, tmpContext)
		tmpContext.fill()
		tmpContext.stroke()
		tmpContext.rotate(Math.PI / 4)
		tmpContext.fillStyle = "#d76edb"
		renderCircle(0, 0, obj.scale * 0.5, tmpContext, true)
	}
	return tmpCanvas
}

// RENDER PLAYER:
async function renderPlayer(colour, skin, tail, weapon, weaponVariant, build, player, ctxt) {
	ctxt = ctxt || spriteContext
	ctxt.lineWidth = outlineWidth * scaleFillNative
	ctxt.lineJoin = "miter"
	var handAngle = (Math.PI / 4) * (WEAPONS[weapon]?.armS || 1)
	var oHandAngle = weapon ? WEAPONS[weapon].hndS || 1 : 1
	var oHandDist = weapon ? WEAPONS[weapon].hndD || 1 : 1
	// TAIL/CAPE:
	if (tail) {
		await renderTail(tail, ctxt)
	}
	// WEAPON BELLOW HANDS:
	if (weapon && !WEAPONS[weapon].aboveHand) {
		await renderTool(WEAPONS[weapon], weaponVariant, 35, 0, true, ctxt)
		if (WEAPONS[weapon].projectile != undefined && !WEAPONS[weapon].hideProjectile) {
			await renderProjectile(35, 0, PROJECTILES[WEAPONS[weapon].projectile], spriteContext)
		}
	}
	// HANDS:
	ctxt.strokeStyle = outlineColor
	ctxt.fillStyle = colour
	renderCircle(35 * Math.cos(handAngle), 35 * Math.sin(handAngle), 14)
	renderCircle(35 * oHandDist * Math.cos(-handAngle * oHandAngle), 35 * oHandDist * Math.sin(-handAngle * oHandAngle), 14)
	// WEAPON ABOVE HANDS:
	if (weapon && WEAPONS[weapon].aboveHand) {
		await renderTool(WEAPONS[weapon], weaponVariant, 35, 0, true, ctxt)
		if (WEAPONS[weapon].projectile != undefined) {
			await renderProjectile(35, 0, PROJECTILES[WEAPONS[weapon].projectile], spriteContext)
		}
	}
	// BUILD ITEM:
	if (build) {
		const tmpSprite = getItemSprite(build, true, false, true)
		ctxt.drawImage(tmpSprite, 35 - ITEMS[build].holdOffset, -tmpSprite.width / 2)
	}
	// BODY:
	renderCircle(0, 0, 35, ctxt)
	// SKIN:
	if (skin) {
		ctxt.rotate(Math.PI / 2)
		await renderSkin(skin, ctxt, null, null, player)
	}
}

// RENDER SKINS:
async function renderSkin(index, ctxt, scale, parentSkin, player) {
	const tmpObj = HATS[index]
	const tmpSprite = await loadImage("img/hats/hat_" + index, skinSprites)
	scale = parentSkin ? scale : tmpObj.scale
	ctxt.save()
	ctxt.drawImage(tmpSprite, (-scale * scaleFillNative) / 2, (-scale * scaleFillNative) / 2, scale * scaleFillNative, scale * scaleFillNative)
	ctxt.restore()
	if (!parentSkin && tmpObj.topSprite) {
		ctxt.save()
		ctxt.rotate((parseFloat(player.TOPHATDIRECTION) * Math.PI) / 180 || 0)
		await renderSkin(index + "_top", ctxt, scale, tmpObj)
		ctxt.restore()
	}
}

// RENDER TAIL:
async function renderTail(index, ctxt, translate = true) {
	const tmpObj = ACCESSORIES[index]
	const tmpSprite = await loadImage("img/accessories/access_" + index, accessSprites)
	ctxt.save()
	if (translate) {
		ctxt.translate((-20 - (tmpObj.xOff || 0)) * scaleFillNative, 0)
	}
	ctxt.drawImage(
		tmpSprite,
		(-tmpObj.scale * scaleFillNative) / 2,
		(-tmpObj.scale * scaleFillNative) / 2,
		tmpObj.scale * scaleFillNative,
		tmpObj.scale * scaleFillNative
	)
	ctxt.restore()
}

// RENDER TOOL:
async function renderTool(obj, variant, x, y, translate = true, ctxt) {
	const tmpSprite = await loadImage("img/weapons/" + obj.src + (variant || ""), toolSprites)
	ctxt.drawImage(
		tmpSprite,
		((translate ? x + obj.xOff : 0) - obj.length / 2) * scaleFillNative,
		((translate ? y + obj.yOff : 0) - obj.width / 2) * scaleFillNative,
		obj.length * scaleFillNative,
		obj.width * scaleFillNative
	)
}

// RENDER PROJECTILE:
async function renderProjectile(x, y, obj, ctxt) {
	const tmpSprite = await loadImage("img/weapons/" + obj.src, projectileSprites)
	ctxt.drawImage(
		tmpSprite,
		(x - obj.scale / 2) * scaleFillNative,
		(y - obj.scale / 2) * scaleFillNative,
		obj.scale * scaleFillNative,
		obj.scale * scaleFillNative
	)
}

function roundRect(x, y, w, h, r, ctx) {
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

async function onlyHats(id, filter = true) {
	if (!id) {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}

	spriteContext.save()
	await renderSkin(id, spriteContext, null, null, { TOPHATDIRECTION: 0 })
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

async function onlyAccess(id, filter = true) {
	if (!id) {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}

	spriteContext.save()
	await renderTail(id, spriteContext, false)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

async function onlyWeapons(name, variant, filter = true) {
	if (!name) {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}

	spriteContext.save()
	await renderTool(WEAPONS[name], variant, 0, 0, false, spriteContext)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

async function onlyPlayer(colour, skin, tail, weapon, weaponVariant, build, player, filter = true) {
	spriteContext.save()
	spriteContext.rotate((parseFloat(player.DIRECTION) * Math.PI) / 180 || 0)
	await renderPlayer(colour, skin, tail, weapon, weaponVariant, build, player, spriteContext)
	spriteContext.restore()

	const tmpCanvas = document.createElement("canvas")
	tmpCanvas.width = tmpCanvas.height = mainCanvas.width
	const tmpContext = tmpCanvas.getContext("2d")

	tmpContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		tmpContext.globalCompositeOperation = "source-atop"
		tmpContext.drawImage(filterCanvas, 0, 0)
	}

	mainContext.drawImage(tmpCanvas, 0, 0)
	mainContext.setTransform(scaleFillNative, 0, 0, scaleFillNative, mainCanvas.width / 2, mainCanvas.height / 2)
	if (player.TRIBENAME || player.NAME || player.SKULL || player.CROWN) {
		mainContext.save()
		var tmpText = (player.TRIBENAME ? "[" + player.TRIBENAME + "] " : "") + (player.NAME || "")
		mainContext.font = `30px Hammersmith One`
		mainContext.fillStyle = "#fff"
		mainContext.strokeStyle = darkOutlineColor
		mainContext.textBaseline = "middle"
		mainContext.textAlign = "center"
		mainContext.lineWidth = 8
		mainContext.lineJoin = "round"
		mainContext.strokeText(tmpText, 0, -35 - 34)
		mainContext.fillText(tmpText, 0, -35 - 34)
		if (player.CROWN) {
			mainContext.drawImage(
				await loadImage("img/icons/crown", iconSprites),
				-60 / 2 - mainContext.measureText(tmpText).width / 2 - 35,
				-35 - 34 - 60 / 2 - 5,
				60,
				60
			)
		}
		if (player.SKULL) {
			mainContext.drawImage(
				await loadImage("img/icons/skull", iconSprites),
				-60 / 2 + mainContext.measureText(tmpText).width / 2 + 35,
				-35 - 34 - 60 / 2 - 5,
				60,
				60
			)
		}
		mainContext.restore()
	}
	if (parseFloat(player.HEALTH)) {
		mainContext.save()
		mainContext.fillStyle = darkOutlineColor
		roundRect(-50 - 4.5, 35 + 34, 50 * 2 + 4.5 * 2, 17, 8, mainContext)
		mainContext.fill()
		mainContext.fillStyle = PLAYER.HPCOLOUR === "green" ? "#8ecc51" : "#cc5151"
		roundRect(-50, 35 + 34 + 4.5, 50 * 2 * (parseFloat(player.HEALTH) / 100), 17 - 4.5 * 2, 7, mainContext)
		mainContext.fill()
		mainContext.restore()
	}
}

function onlyBuildings(name, filter = true) {
	const tmpSprite = getItemSprite(name, false)
	spriteContext.save()
	spriteContext.globalAlpha = name == "invisiblepittrap" ? 0.6 : 1
	spriteContext.translate(0, 0)
	spriteContext.drawImage(tmpSprite, -tmpSprite.width / 2, -tmpSprite.height / 2)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

function onlyResources(name, biomeID, filter = true) {
	const tmpScale =
		name == "gold" || name == "rock"
			? rockScales[UTILS.randInt(0, 2)]
			: name == "bush"
			? bushScales[UTILS.randInt(0, 2)]
			: treeScales[UTILS.randInt(0, 3)]
	const tmpSprite = getResSprite(name, name == "volcano" ? UTILS.randFloat(170, 200) : tmpScale, biomeID, false)
	spriteContext.save()
	spriteContext.drawImage(tmpSprite, -tmpSprite.width / 2, -tmpSprite.height / 2)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

async function onlyAnimals(name, ai, filter = true) {
	const obj = name == "none" ? {} : ANIMALS[name]
	var tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1) * scaleFillNative
	spriteContext.save()
	spriteContext.rotate((parseFloat(ai.DIRECTION) * Math.PI) / 180 || 0)
	if (name != "none") {
		const tmpSprite = await loadImage("img/animals/" + name, aiSprites)
		spriteContext.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2)
	}
	spriteContext.restore()

	const tmpCanvas = document.createElement("canvas")
	tmpCanvas.width = tmpCanvas.height = mainCanvas.width
	const tmpContext = tmpCanvas.getContext("2d")

	tmpContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, filterCanvas.width, filterCanvas.height)
		tmpContext.globalCompositeOperation = "source-atop"
		tmpContext.drawImage(filterCanvas, 0, 0)
	}

	mainContext.drawImage(tmpCanvas, 0, 0)
	if (name === "none") return
	mainContext.setTransform(scaleFillNative, 0, 0, scaleFillNative, mainCanvas.width / 2, mainCanvas.height / 2)
	if (ai.NAME) {
		mainContext.save()
		var tmpText = ai.NAME || ""
		mainContext.font = `${obj.nameScale || 30}px Hammersmith One`
		mainContext.fillStyle = "#fff"
		mainContext.strokeStyle = darkOutlineColor
		mainContext.textBaseline = "middle"
		mainContext.textAlign = "center"
		mainContext.lineWidth = obj.nameScale ? 11 : 8
		mainContext.lineJoin = "round"
		mainContext.strokeText(tmpText, 0, -obj.scale - 34)
		mainContext.fillText(tmpText, 0, -obj.scale - 34)
		mainContext.restore()
	}
	if (parseFloat(ai.HEALTH)) {
		mainContext.save()
		mainContext.fillStyle = darkOutlineColor
		roundRect(-50 - 4.5, obj.scale + 34, 50 * 2 + 4.5 * 2, 17, 8, mainContext)
		mainContext.fill()
		mainContext.fillStyle = "#cc5151"
		roundRect(-50, obj.scale + 34 + 4.5, 50 * 2 * (parseFloat(ai.HEALTH) / 100), 17 - 4.5 * 2, 7, mainContext)
		mainContext.fill()
		mainContext.restore()
	}
}

function onlyBackground(grid, filter = true) {
	spriteContext.globalAlpha = 1
	if (2400 - yOffset <= 0 && 14400 - 2400 - yOffset >= maxScreenHeight) {
		spriteContext.fillStyle = "#b6db66"
		spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
	} else if (14400 - 2400 - yOffset <= 0) {
		spriteContext.fillStyle = "#dbc666"
		spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
	} else if (2400 - yOffset >= maxScreenHeight) {
		spriteContext.fillStyle = "#fff"
		spriteContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight)
	} else if (2400 - yOffset >= 0) {
		spriteContext.fillStyle = "#fff"
		spriteContext.fillRect(0, 0, maxScreenWidth, 2400 - yOffset)
		spriteContext.fillStyle = "#b6db66"
		spriteContext.fillRect(0, 2400 - yOffset, maxScreenWidth, maxScreenHeight - (2400 - yOffset))
	} else {
		spriteContext.fillStyle = "#b6db66"
		spriteContext.fillRect(0, 0, maxScreenWidth, 14400 - 2400 - yOffset)
		spriteContext.fillStyle = "#dbc666"
		spriteContext.fillRect(0, 14400 - 2400 - yOffset, maxScreenWidth, maxScreenHeight - (14400 - 2400 - yOffset))
	}

	function renderWaterBodies(ctxt, padding) {
		var tmpW = 724 + padding
		var tmpY = 14400 / 2 - yOffset - tmpW / 2
		if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
			ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW)
		}
	}

	spriteContext.fillStyle = "#dbc666"
	renderWaterBodies(spriteContext, 114)
	spriteContext.fillStyle = "#91b2db"
	renderWaterBodies(spriteContext, UTILS.randFloat(0, 0.3) * 250)

	if (grid) {
		spriteContext.lineWidth = 4
		spriteContext.strokeStyle = "#000"
		spriteContext.globalAlpha = 0.06
		spriteContext.beginPath()
		for (var x = -POSITIONX; x < maxScreenWidth; x += maxScreenHeight / 18) {
			if (x > 0) {
				spriteContext.moveTo(x, 0)
				spriteContext.lineTo(x, maxScreenHeight)
			}
		}
		for (var y = -POSITIONY; y < maxScreenHeight; y += maxScreenHeight / 18) {
			if (x > 0) {
				spriteContext.moveTo(0, y)
				spriteContext.lineTo(maxScreenWidth, y)
			}
		}
		spriteContext.stroke()
	}

	spriteContext.fillStyle = "#000"
	spriteContext.globalAlpha = 0.09
	if (xOffset <= 0) {
		spriteContext.fillRect(0, 0, -xOffset, maxScreenHeight)
	}
	if (14400 - xOffset <= maxScreenWidth) {
		var tmpY = Math.max(0, -yOffset)
		spriteContext.fillRect(14400 - xOffset, tmpY, maxScreenWidth - (14400 - xOffset), maxScreenHeight - tmpY)
	}
	if (yOffset <= 0) {
		spriteContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset)
	}
	if (14400 - yOffset <= maxScreenHeight) {
		let tmpX = Math.max(0, -xOffset)
		var tmpMin = 0
		if (14400 - xOffset <= maxScreenWidth) {
			tmpMin = maxScreenWidth - (14400 - xOffset)
		}
		spriteContext.fillRect(tmpX, 14400 - yOffset, maxScreenWidth - tmpX - tmpMin, maxScreenHeight - (14400 - yOffset))
	}

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		mainContext.globalAlpha = 1
		mainContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height)
	}
}
