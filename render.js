const UTILS = {
	randInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}

var outlineColor = "#525252",
	darkOutlineColor = "#3d3f42",
	outlineWidth = 5.5
var scaleFactor
const mainCanvas = document.getElementById("canvas")
const mainContext = mainCanvas.getContext("2d")
const spriteCanvas = document.createElement("canvas")
const spriteContext = spriteCanvas.getContext("2d")
const filterCanvas = document.createElement("canvas")
const filterContext = filterCanvas.getContext("2d")
mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = 300

// RENDER LEAF:
function renderLeaf(x, y, l, r, ctxt) {
	x *= scaleFactor
	y *= scaleFactor
	l *= scaleFactor
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
	x *= scaleFactor
	y *= scaleFactor
	scale *= scaleFactor
	tmpContext = tmpContext || spriteContext
	tmpContext.beginPath()
	tmpContext.arc(x, y, scale, 0, 2 * Math.PI)
	if (!dontFill) tmpContext.fill()
	if (!dontStroke) tmpContext.stroke()
}

// RENDER STAR SHAPE:
function renderStar(ctxt, spikes, outer, inner) {
	outer *= scaleFactor
	inner *= scaleFactor
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
	x *= scaleFactor
	y *= scaleFactor
	w *= scaleFactor
	h *= scaleFactor
	ctxt.fillRect(x - w / 2, y - h / 2, w, h)
	if (!stroke) {
		ctxt.strokeRect(x - w / 2, y - h / 2, w, h)
	}
}

// RENDER RECTCIRCLE:
function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
	x *= scaleFactor
	y *= scaleFactor
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
	outer *= scaleFactor
	inner *= scaleFactor
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
	s *= scaleFactor
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
biome = [0, 1, 2]
type = [0, 1, 2, 3]
const a = {
	bush: []
}
function getResSprite(name, scale, biomeID, asIcon) {
	if (name == "none") {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}
	scaleFactor = asIcon ? 1 : scaleFactor
	const tmpCanvas = document.createElement("canvas")
	tmpCanvas.width = tmpCanvas.height = (scale * 2.1 + outlineWidth) * scaleFactor
	const tmpContext = tmpCanvas.getContext("2d")
	tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
	tmpContext.strokeStyle = outlineColor
	tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFactor
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
	}
	return tmpCanvas
}

function getItemSprite(name, rotate, asIcon, spikeBuild = false) {
	if (name == "none") {
		const tmpCanvas = document.createElement("canvas")
		tmpCanvas.width = tmpCanvas.height = 1
		return tmpCanvas
	}
	scaleFactor = asIcon ? 1 : scaleFactor
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
	tmpCanvas.width = tmpCanvas.height = (obj.scale * 2.5 + outlineWidth + spritePadding) * scaleFactor
	const tmpContext = tmpCanvas.getContext("2d")
	tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2)
	tmpContext.rotate(asIcon || !rotate ? 0 : Math.PI / 2)
	tmpContext.strokeStyle = outlineColor
	tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1) * scaleFactor
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
function renderPlayer(colour, skin, tail, weapon, weaponVariant, build, ctxt) {
	ctxt = ctxt || spriteContext
	ctxt.lineWidth = outlineWidth * scaleFactor
	ctxt.lineJoin = "miter"
	var handAngle = (Math.PI / 4) * (WEAPONS[weapon]?.armS || 1)
	var oHandAngle = weapon ? WEAPONS[weapon].hndS || 1 : 1
	var oHandDist = weapon ? WEAPONS[weapon].hndD || 1 : 1
	// TAIL/CAPE:
	if (tail) {
		renderTail(tail, ctxt)
	}
	// WEAPON BELLOW HANDS:
	if (weapon && !WEAPONS[weapon].aboveHand) {
		renderTool(WEAPONS[weapon], weaponVariant, 35, 0, ctxt)
		if (WEAPONS[weapon].projectile != undefined && !WEAPONS[weapon].hideProjectile) {
			renderProjectile(35, 0, PROJECTILES[WEAPONS[weapon].projectile], spriteContext)
		}
	}
	// HANDS:
	ctxt.strokeStyle = outlineColor
	ctxt.fillStyle = colour
	renderCircle(35 * Math.cos(handAngle), 35 * Math.sin(handAngle), 14)
	renderCircle(35 * oHandDist * Math.cos(-handAngle * oHandAngle), 35 * oHandDist * Math.sin(-handAngle * oHandAngle), 14)
	// WEAPON ABOVE HANDS:
	if (weapon && WEAPONS[weapon].aboveHand) {
		renderTool(WEAPONS[weapon], weaponVariant, 35, 0, ctxt)
		if (WEAPONS[weapon].projectile != undefined) {
			renderProjectile(35, 0, PROJECTILES[WEAPONS[weapon].projectile], spriteContext)
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
		renderSkin(skin, ctxt, null, null)
	}
}

// RENDER SKINS:
function renderSkin(index, ctxt, scale, parentSkin) {
	const tmpObj = HATS[index]
	const tmpSprite = skinSprites[index]
	scale = parentSkin ? scale : tmpObj.scale
	ctxt.save()
	ctxt.drawImage(
		tmpSprite,
		(-scale * scaleFactor) / 2,
		(-scale * scaleFactor) / 2,
		scale * scaleFactor,
		scale * scaleFactor
	)
	ctxt.restore()
	if (!parentSkin && tmpObj.topSprite) {
		ctxt.save()
		renderSkin(index + "_top", ctxt, scale, tmpObj)
		ctxt.restore()
	}
}

// RENDER TAIL:
function renderTail(index, ctxt) {
	const tmpObj = ACCESSORIES[index]
	const tmpSprite = accessSprites[index]
	ctxt.save()
	ctxt.translate((-20 - (tmpObj.xOff || 0)) * scaleFactor, 0)
	ctxt.drawImage(
		tmpSprite,
		(-tmpObj.scale * scaleFactor) / 2,
		(-tmpObj.scale * scaleFactor) / 2,
		tmpObj.scale * scaleFactor,
		tmpObj.scale * scaleFactor
	)
	ctxt.restore()
}

// RENDER TOOL:
function renderTool(obj, variant, x, y, ctxt) {
	const tmpSprite = toolSprites[obj.src + (variant || "")]
	ctxt.drawImage(
		tmpSprite,
		(x + obj.xOff - obj.length / 2) * scaleFactor,
		(y + obj.yOff - obj.width / 2) * scaleFactor,
		obj.length * scaleFactor,
		obj.width * scaleFactor
	)
}

// RENDER PROJECTILE:
function renderProjectile(x, y, obj, ctxt) {
	const tmpSprite = projectileSprites[obj.src]
	ctxt.drawImage(tmpSprite, (x - obj.scale / 2) * scaleFactor, (y - obj.scale / 2) * scaleFactor, obj.scale * scaleFactor, obj.scale * scaleFactor)
}

function onlyPlayer(colour, skin, tail, weapon, weaponVariant, build, resolution, filter = true) {
	mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = resolution
	mainContext.clearRect(0, 0, resolution, resolution)
	spriteContext.clearRect(0, 0, resolution, resolution)
	filterContext.clearRect(0, 0, resolution, resolution)

	scaleFactor = resolution / 500
	spriteContext.save()
	spriteContext.translate(resolution / 2, resolution / 2)
	renderPlayer(colour, skin, tail, weapon, weaponVariant, build, spriteContext)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, resolution, resolution)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

function onlyBuildings(name, resolution, filter = true) {
	mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = resolution
	mainContext.clearRect(0, 0, resolution, resolution)
	spriteContext.clearRect(0, 0, resolution, resolution)
	filterContext.clearRect(0, 0, resolution, resolution)

	const obj = name == "none" ? {} : ITEMS[name]
	var spritePadding = obj.spritePadding && !(name == "spikes" || name == "greaterspikes" || name == "poisonspikes") ? obj.spritePadding : 0
	scaleFactor = name == "none" ? 1 : resolution / (obj.scale * 2.5 + outlineWidth + spritePadding)
	const tmpSprite = getItemSprite(name, false)
	spriteContext.save()
	spriteContext.globalAlpha = name == "invisiblepittrap" ? 0.6 : 1
	spriteContext.drawImage(tmpSprite, spriteCanvas.width / 2 - tmpSprite.width / 2, spriteCanvas.height / 2 - tmpSprite.height / 2)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, resolution, resolution)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

function onlyResources(name, biomeID, resolution, filter = true) {
	mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = resolution
	mainContext.clearRect(0, 0, resolution, resolution)
	spriteContext.clearRect(0, 0, resolution, resolution)
	filterContext.clearRect(0, 0, resolution, resolution)

	const tmpScale =
		name == "gold" || name == "rock"
			? rockScales[UTILS.randInt(0, 2)]
			: name == "bush"
			? bushScales[UTILS.randInt(0, 2)]
			: treeScales[UTILS.randInt(0, 3)]
	scaleFactor = name == "none" ? 1 : resolution / (tmpScale * 2.1 + outlineWidth)
	const tmpSprite = getResSprite(name, tmpScale, biomeID, false)
	spriteContext.save()
	spriteContext.drawImage(tmpSprite, spriteCanvas.width / 2 - tmpSprite.width / 2, spriteCanvas.height / 2 - tmpSprite.height / 2)
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, resolution, resolution)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}

function onlyAnimals(name, resolution, filter = true) {
	mainCanvas.width = mainCanvas.height = spriteCanvas.width = spriteCanvas.height = filterCanvas.width = filterCanvas.height = resolution
	mainContext.clearRect(0, 0, resolution, resolution)
	spriteContext.clearRect(0, 0, resolution, resolution)
	filterContext.clearRect(0, 0, resolution, resolution)

	scaleFactor = resolution / 500
	const tmpSprite = aiSprites[name]
	const obj = name == "none" ? {} : ANIMALS[name]
	var tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1)
	spriteContext.save()
	spriteContext.translate(resolution / 2, resolution / 2)
	if (name != "none") {
		spriteContext.drawImage(tmpSprite, -tmpScale * scaleFactor, -tmpScale * scaleFactor, tmpScale * 2 * scaleFactor, tmpScale * 2 * scaleFactor)
	}
	spriteContext.restore()

	mainContext.drawImage(spriteCanvas, 0, 0)
	if (filter) {
		filterContext.fillStyle = "rgba(0, 0, 70, 0.35)"
		filterContext.fillRect(0, 0, resolution, resolution)
		mainContext.globalCompositeOperation = "source-atop"
		mainContext.drawImage(filterCanvas, 0, 0)
	}
}
