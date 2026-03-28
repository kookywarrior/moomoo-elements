async function getBlobURL(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (e) {
    console.error(`Failed to preload image: ${url}`, e)
    return null
  }
}

export { getBlobURL }
