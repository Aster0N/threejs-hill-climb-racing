import { interactionSettings } from "../consts"

export const collectCoins = (player, coins, scene) => {
  const playerPos = player.position
  const radiusSquared = interactionSettings.interactionRadius ** 2

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i]
    const dx = coin.position.x - playerPos.x
    const dz = coin.position.z - playerPos.z
    const distanceSquared = dx * dx + dz * dz

    if (distanceSquared <= radiusSquared) {
      coins.splice(i, 1)
      animateCoin(coin, scene)
    }
  }
}

const animateCoin = (coin, scene) => {
  let time = 0
  const duration = 60
  const initialVelocity = 0.1
  const gravity = 0.02

  const animate = () => {
    time++
    if (time <= duration) {
      const velocity = initialVelocity - gravity * time
      coin.position.y += velocity
      if (coin.position.y < -1) {
        scene.remove(coin)
      } else {
        requestAnimationFrame(animate)
      }
    } else {
      scene.remove(coin)
    }
  }

  animate()
}
