import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import Model from './Model'

const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
//pass in camera and renderer dom element
const clock = new THREE.Clock()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.08
// controls.enablePan = false
// controls.enableZoom = false
const scene = new THREE.Scene()
const meshes = {}
const mixers = []
const lights = {}

init()
function init() {
	//set up our renderer default settings, add scene/canvas to webpage
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.default = addBoilerPlateMeshes()
	meshes.standard = addStandardMesh()
	lights.default = addLight()

	scene.add(lights.default)
	scene.add(meshes.standard)
	scene.add(meshes.default)

	camera.position.set(0, 0, 5)
	instances()
	resize()
	animate()
}

function instances() {
	const heart = new Model({
		//4 mandatories
		mixers: mixers,
		url: '/heart.glb',
		animationState: true,
		scene: scene,
		meshes: meshes,
		replace: true,
		name: 'heart',
	})
	heart.init()
	const heart2 = new Model({
		//4 mandatories
		mixers: mixers,
		animationState: true,
		replace: true,
		url: '/heart.glb',
		scene: scene,
		meshes: meshes,
		name: 'heart2',
		position: new THREE.Vector3(2, 1, 0),
		scale: new THREE.Vector3(0.02, 0.02, 0.02),
	})
	heart2.initPoints()
	const tree = new Model({
		//4 mandatories
		mixers: mixers,
		animationState: true,
		replace: true,
		url: '/tree.glb',
		scene: scene,
		meshes: meshes,
		name: 'tree',
		position: new THREE.Vector3(-3, 1, 0),
		scale: new THREE.Vector3(1.3, 1.3, 1.3),
	})
	tree.init()
	const bag = new Model({
		//4 mandatories
		mixers: mixers,
		animationState: true,
		url: '/backpack.glb',
		scene: scene,
		meshes: meshes,
		name: 'bag',
		// position: new THREE.Vector3(1, 1, 0),
		scale: new THREE.Vector3(0.2, 0.2, 0.2),
	})
	bag.init()
	const puzzle = new Model({
		//4 mandatories
		mixers: mixers,
		animationState: true,
		replace: true,
		url: '/wall clock.obj',
		scene: scene,
		meshes: meshes,
		name: 'puzzle',
		// position: new THREE.Vector3(1, 1, 0),
		scale: new THREE.Vector3(0.2, 0.2, 0.2),
	})
	puzzle.init()
	const shield = new Model({
		//4 mandatories
		mixers: mixers,
		animationState: true,
		replace: true,
		url: '/shield.obj',
		scene: scene,
		meshes: meshes,
		name: 'puzzle',
		// position: new THREE.Vector3(1, 1, 0),
		scale: new THREE.Vector3(0.2, 0.2, 0.2),
	})
	shield.init()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()
	for (const mixer of mixers) {
		mixer.update(delta)
	}
	controls.update()
	meshes.default.rotation.x += 0.01
	meshes.default.rotation.y -= 0.01
	meshes.standard.rotation.x -= 0.01
	meshes.standard.rotation.z -= 0.01

	renderer.render(scene, camera)
}
