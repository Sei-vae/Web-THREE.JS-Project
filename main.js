import './style.css'

//import * as THREE from 'three';
import * as THREE from 'https://threejs.org/build/three.module.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

//Create Scene

const scene = new THREE.Scene();

// Create Camera

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// Create Renderer

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

scene.add(pointLight, ambientLight)

// Geometry

const geometry = new THREE.TorusGeometry(10,1,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347, wireframe: false});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)

// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Load 3DModel

const loader = new GLTFLoader();

loader.load( 'Model/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );
  scene.position.set(0.5,.0,-4);

}, undefined, function ( error ) {

	console.error( error );

} );


// add Random Stuff

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})

  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(300).fill().forEach(addStar)

// Funktion+Loop

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.025;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.005;

  scene.rotation.z += 0.00;
  scene.rotation.x += 0.00;
  scene.rotation.y += 0.0025;

  renderer.render(scene, camera);
}

// Funktion Move Camera

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.002;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
  
}

// document.body.onscroll = changeEnv

camera.position.z = 25;
camera.position.x = 0;
camera.position.y = 0;
scene.rotation.y =  0.0;





animate()