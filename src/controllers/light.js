import { AmbientLight, DirectionalLight } from "three"

export const ambientLight = new AmbientLight(0x87ceeb, 0.6)
export const sunLight = new DirectionalLight(0xffffff, 1.0)
sunLight.position.set(20, 30, 10)
sunLight.castShadow = true

sunLight.shadow.mapSize.width = 2048
sunLight.shadow.mapSize.height = 2048
sunLight.shadow.camera.near = 0.5
sunLight.shadow.camera.far = 100
sunLight.shadow.camera.left = -50
sunLight.shadow.camera.right = 50
sunLight.shadow.camera.top = 50
sunLight.shadow.camera.bottom = -50
sunLight.shadow.bias = -0.0001 // remove shadow artifacts
