import {
  FogExp2,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { coinsSettings, groundSize, zoom } from "./consts"
import { updateCamera } from "./controllers/camera"
import { ambientLight, sunLight } from "./controllers/light"
import { setupEventListeners } from "./controllers/setupEventListeners"
import { animateCar } from "./helpers/animateCar"
import { collectCoins } from "./helpers/collectCoins"
import { movePlayer } from "./helpers/movePlayer"
import "./styles/index.css"
import "./styles/main.css"

const canvas = document.getElementById("canvas")
let rotation = { theta: Math.PI / 2, phi: Math.PI / 4 }
let cameraDistance = 10
let isRotating = false
const keys = { w: false, a: false, s: false, d: false }

const scene = new Scene()
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const loader = new GLTFLoader()
const renderer = new WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.setClearColor(0xf3ebb8, 1)

scene.add(ambientLight)
scene.add(sunLight)

// PLAYER
let player = null
loader.load(
  "/assets/car.glb",
  gltf => {
    player = gltf.scene
    player.position.set(0, 2, 0)
    player.scale.set(1, 1, 1)
    player.castShadow = true
    player.receiveShadow = true
    scene.add(player)
  },
  undefined,
  error => console.error("Car loading error:", error)
)

// GROUND
let ground = null
loader.load(
  "/assets/ground.glb",
  gltf => {
    ground = gltf.scene
    ground.position.set(0, 0, 0)
    ground.scale.set(1, 1, 1)
    ground.receiveShadow = true
    scene.add(ground)
  },
  undefined,
  error => console.error("Ground loading error:", error)
)

//COINS
let coinModel = null
let coins = []
loader.load(
  "/assets/coin.glb",
  gltf => {
    coinModel = gltf.scene
    coinModel.scale.set(1, 1, 1)
    coinModel.castShadow = true
    coinModel.receiveShadow = true

    for (let i = 0; i < coinsSettings.totalCoinsCount; i++) {
      const x = (Math.random() - 0.5) * groundSize.width
      const z = (Math.random() - 0.5) * groundSize.height
      const coin = coinModel.clone()
      coin.rotation.y = Math.random() * 10
      coin.position.set(x, 0, z)
      scene.add(coin)
      coins.push(coin)
    }
  },
  undefined,
  error => console.error("Coin loading error:", error)
)

setupEventListeners(keys, rotation, isRotating, camera, renderer)

document.addEventListener("wheel", e => {
  cameraDistance = Math.max(
    zoom.max,
    Math.min(zoom.min, cameraDistance + e.deltaY * zoom.zoomSpeed)
  )
})

// controls
const sunlightControl = document.querySelector("#point-light-control")
sunlightControl.addEventListener("change", e => {
  if (!e.target.checked) {
    scene.remove(sunLight)
    return
  }
  scene.add(sunLight)
})

scene.fog = null
const fogControl = document.querySelector("#fog-control")
fogControl.addEventListener("change", e => {
  if (!e.target.checked) {
    scene.fog = null
    return
  }
  scene.fog = new FogExp2(0xcccccc, 0.03)
})

const animate = () => {
  requestAnimationFrame(animate)

  if (!player || !ground || !coins.length) {
    return
  }

  movePlayer(player, keys)
  animateCar(player, keys)
  collectCoins(player, coins, scene)

  const { camX, camY, camZ } = updateCamera(
    rotation,
    player.position,
    cameraDistance
  )
  camera.position.set(camX, camY, camZ)
  camera.lookAt(player.position)
  renderer.render(scene, camera)
}

animate()

const settingsBtn = document.querySelector("#settings-btn")
const guideBtn = document.querySelector("#guide-btn")
const settingsPopup = document.querySelector("#settings-popup")
const guidePopup = document.querySelector("#guide-popup")
const closeButtons = document.querySelectorAll(".close-btn")

settingsBtn.addEventListener("click", () => {
  settingsPopup.style.display = "flex"
})

guideBtn.addEventListener("click", () => {
  guidePopup.style.display = "flex"
})

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    settingsPopup.style.display = "none"
    guidePopup.style.display = "none"
  })
})

window.addEventListener("click", e => {
  if (e.target === settingsPopup) {
    settingsPopup.style.display = "none"
  }
  if (e.target === guidePopup) {
    guidePopup.style.display = "none"
  }
})
