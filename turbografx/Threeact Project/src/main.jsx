import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {AsciiEffect } from 'three/addons/effects/AsciiEffect.js'
import './index.css'
import App from './App.jsx'
import * as THREE from 'three';

let controls, effect

const COLOR = 0xfeebe7

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );

const render = new THREE.WebGLRenderer({ antialias: true });

render.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
render.setSize( window.innerWidth, window.innerHeight );
render.setAnimationLoop( animate );
render.setClearColor(0xfeebe7)

/*

effect = new AsciiEffect(render, ' .:-=+*#%@', {invert: true, fontSize: 50, cellSize: 50})
effect.setSize(window.innerWidth, window.innerHeight)
effect.domElement.style.color = 'black';
effect.domElement.style.backgroundColor = 'white'


 */
document.body.appendChild( render.domElement );

var grid = new THREE.GridHelper(100, 10, 0xF4320B, 'white')



function createCube(x, y, z, color = COLOR) {
    const geometry = new THREE.BoxGeometry( 6, 6, 6 );
    const edgeGeo = new THREE.EdgesGeometry(geometry)
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xF4320B })
    const cubeEdges = new THREE.LineSegments(edgeGeo, edgeMat)
    //const edgeMat = new THREE.MeshBasicMaterial({color: color})


    //const cubeEdges = new THREE.Mesh(geometry, edgeMat)

    const boundingBox = new THREE.Box3().setFromObject(cubeEdges)
    const size = new THREE.Vector3()

    boundingBox.getSize(size)

    cubeEdges.position.set(x, y, z)
    cubeEdges.boundingBox = boundingBox
    cubeEdges.size = size.clone()

    scene.add( cubeEdges );

    return cubeEdges
}

const cubes = [];

for(let x = 0; x < 3; x++) {
    for(let y = 0; y < 3; y++) {
         const cube = createCube((x * 10) + 4, (y * 10) + 4, 10, COLOR)

         console.log("Cube Size: " + cube.size.x)

         cubes.push(cube)
    }
}


//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );

window.addEventListener('resize', onWindowResize)

camera.position.set(5, 10, 10)


controls = new OrbitControls( camera, render.domElement )
controls.listenToKeyEvents( window )

controls.keys = {
    LEFT : 'KeyA',
    UP : 'KeyW',
    RIGHT : 'KeyD',
    BOTTOM : 'KeyS'
}

controls.enableDamping = true
controls.dampingFactor = 0.05

controls.screenSpacePanning = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.5

controls.minDistance = 5
controls.maxDistance = 500

controls.keyPanSpeed = 9
controls.keyRotateSpeed = 1

controls.maxPolarAngle = Math.PI * 2;



scene.add(grid)

function animate() {

    cubes.forEach((cube, i) => {
         cube.rotation.x += (0.005 * i) + .01;
         cube.rotation.y += (0.001 * i) + .01;

    })



    controls.update()

    render.render( scene, camera );
    camera.lookAt(scene.position)
}



function onWindowResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()

    render.setSize(newWidth, newHeight)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


