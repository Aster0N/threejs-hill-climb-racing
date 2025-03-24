export function updateCamera(rotation, playerPosition, cameraDistance) {
  const { theta, phi } = rotation
  const { x, y, z } = playerPosition
  const camX = x + cameraDistance * Math.sin(phi) * Math.cos(theta)
  const camY = y + cameraDistance * Math.cos(phi)
  const camZ = z + cameraDistance * Math.sin(phi) * Math.sin(theta)

  return { camX, camY, camZ }
}
