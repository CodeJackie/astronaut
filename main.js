import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'
// import * as GSAP from 'gasp'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
//Constructors
const canvas = document.querySelector(".stage")
const scene = new THREE.Scene()
const model = new GLTFLoader()
// const material = new THREE.MeshStandardMaterial()
// const spotlight = new THREE.SpotLight()
const particles = new THREE.BufferGeometry()
const stardust = new THREE.PointsMaterial()
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true})
const clock = new THREE.Clock()

//Scene Elements
const sun = model.load('./models/scene.gltf')
const stars = 15000
const posArray = new Float32Array(stars * 3)
for (let i=0; i < stars * 3; i++) {
  posArray[i] = (Math.random() * .5) * 5
}
particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
stardust.size = 0.005

scene.add(sun, stars, camera);

//Update on Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})



//Loop & Animate
const tick = () =>
{

    const ET = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = .1 * ET
    // mars2.rotation.y = .1 * ET
    // points.rotation.y = -.005 * ET
    // points.rotation.x = -.001 * ET


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
