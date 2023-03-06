import './style.css'
import * as THREE from 'three'
import * as DAT from 'dat.gui'
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'
// import * as GSAP from 'gasp'

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
//Constructors
const canvas = document.querySelector(".stage")
const scene = new THREE.Scene()
const gui = new DAT.GUI()
// const loader = new GLTFLoader()
// const material = new THREE.MeshStandardMaterial()
const spotLight = new THREE.SpotLight(0xFFFFFF)
const spotLight2 = new THREE.SpotLight(0xFFFFFF)
const particles = new THREE.BufferGeometry()
const stardust = new THREE.PointsMaterial()
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
const clock = new THREE.Clock()
const box = new THREE.BoxGeometry(3, 3, 3)
const boxMaterial = new THREE.MeshStandardMaterial (
  {
    color: 0x56789A,
    metalness: 1,
    roughness: .5
  }
)
const cube = new THREE.Mesh(box, boxMaterial)

//~~~~DEBUG
gui.add(spotLight.position, 'x').min(-100).max(1000).step(0.01)
gui.add(spotLight.position, 'y').min(-100).max(1000).step(0.01)
gui.add(spotLight.position, 'z').min(-100).max(1000).step(0.01)


const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

//Scene Elements
// const sun = loader.load('./models/scene.gltf', 
//   function (gltf) {
//     scene.add (gltf.scene);
//   })

// const stars = 15000
// const posArray = new Float32Array(stars * 3)
// stardust.size = 0.005
// for (let i=0; i < stars * 3; i++) {
//   posArray[i] = (Math.random() * .5) * 5
// }
// particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// const constellation = new THREE.Points(particles, stardust)

//~~~~LIGHTING
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 100;
spotLight.position.set(1000, 1000, 100)
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 100;
spotLight2.position.set(-1000, -1000, -100)

//~~~~CAMERA
camera.position.z = 10


//~~~~RENDERER
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)


scene.add(spotLight, cube, camera);

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
    cube.rotation.y = .15 * ET
    cube.rotation.x = .15 * ET
    // mars2.rotation.y = .1 * ET
    // points.rotation.y = -.005 * ET
    // points.rotation.x = -.001 * ET


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
