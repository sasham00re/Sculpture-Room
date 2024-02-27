import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(1, 3, 4); // Adjust as needed
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

function loadOBJModel(objPath, mtlPath) {
    console.log("Loading OBJ model with MTL");

    new MTLLoader()
        .load(mtlPath, function (materials) {
            materials.preload();

            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);

            objLoader.load(
                objPath,
                function (object) {
                    object.position.set(0, 0, 0);
                    scene.add(object);
                    console.log("OBJ loaded successfully!");
                },
                function (xhr) {
                    console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
                },
                function (error) {
                    console.error('An error happened during the OBJ loading');
                }
            );
        },
            function (xhr) {
                console.log(`MTL loading progress: ${(xhr.loaded / xhr.total * 100)}% loaded`);
            },
            function (error) {
                console.error('An error happened during the MTL loading');
            }
        );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

//loadOBJModel('textured.obj');

loadOBJModel('textured.obj', 'textured.mtl');
