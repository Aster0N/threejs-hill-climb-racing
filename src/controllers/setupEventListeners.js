export function setupEventListeners(
  keys,
  rotation,
  isRotating,
  camera,
  renderer
) {
  document.addEventListener("keydown", e => {
    if (e.key === "w") keys.w = true
    if (e.key === "a") keys.a = true
    if (e.key === "s") keys.s = true
    if (e.key === "d") keys.d = true
  })

  document.addEventListener("keyup", e => {
    if (e.key === "w") keys.w = false
    if (e.key === "a") keys.a = false
    if (e.key === "s") keys.s = false
    if (e.key === "d") keys.d = false
  })

  let lastX = null
  let lastY = null

  document.addEventListener("mousedown", e => {
    if (e.button === 0) {
      isRotating = true
      lastX = e.clientX
      lastY = e.clientY
    }
  })

  document.addEventListener("mouseup", () => {
    isRotating = false
    lastX = null
    lastY = null
  })

  document.addEventListener("mousemove", e => {
    if (isRotating) {
      const sensitivity = 0.003
      const deltaX = e.movementX || (lastX !== null ? e.clientX - lastX : 0)
      const deltaY = e.movementY || (lastY !== null ? e.clientY - lastY : 0)

      rotation.theta += deltaX * sensitivity
      rotation.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, rotation.phi - deltaY * sensitivity)
      )

      lastX = e.clientX
      lastY = e.clientY
    }
  })

  document.addEventListener("contextmenu", e => e.preventDefault())

  document.addEventListener("touchstart", e => {
    if (e.touches.length === 2) {
      isRotating = true
      const touch = e.touches[0]
      lastX = touch.clientX
      lastY = touch.clientY
    }
  })

  document.addEventListener("touchmove", e => {
    if (isRotating && e.touches.length === 2) {
      const sensitivity = 0.003
      const touch = e.touches[0]
      const deltaX = touch.clientX - lastX
      const deltaY = touch.clientY - lastY

      rotation.theta += deltaX * sensitivity
      rotation.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, rotation.phi - deltaY * sensitivity)
      )

      lastX = touch.clientX
      lastY = touch.clientY
    }
  })

  document.addEventListener("touchend", () => {
    isRotating = false
    lastX = null
    lastY = null
  })

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
