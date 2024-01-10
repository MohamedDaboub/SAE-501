<script setup>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { ref, onMounted, onBeforeUnmount, toRefs,onUpdated } from 'vue';
import * as THREE from 'three';

const canvas = ref(null);
const test = ref(null);
var controls = null;
var clock = new THREE.Clock();
let scene = null;
let camera = null;
let renderer = null;
let animationId = null;
var height, width;

let aiguilleHeures = null;
let aiguilleMinutes = null;
let aiguilleSecondes = null;

const props = defineProps({
    boitier_rond :Boolean,
    boitier_image_url: String,
    bracelet_image_url : String,
});

const Montres = toRefs(props);

const initScene = () => {
    scene = new THREE.Scene();
    
    // Adjust ambient light for a darker scene
    const ambientLight = new THREE.AmbientLight(0xf0f0f0); // Dark gray
    scene.add(ambientLight);

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.5;
    camera.position.y = 2;

    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    updateRendererSize();
    renderer.setClearColor(0x222222, 1);
    renderer.shadowMap.enabled = true;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 0.16;
    controls.maxDistance = 0.20;

    var pointLight = new THREE.PointLight(0xffffff, 0.5); // Lower intensity for a darker scene
    pointLight.position.set(0, 1, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const planeSize = 2;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const texture = new THREE.TextureLoader().load('/models/Texture/Bois.jpg');
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.castShadow = true;
    scene.add(plane);

    const sidePlaneGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const sidePlane1 = new THREE.Mesh(sidePlaneGeometry, planeMaterial);
    sidePlane1.rotation.y = -Math.PI / 2;
    sidePlane1.position.x = -planeSize / 2;
    sidePlane1.castShadow = true;
    scene.add(sidePlane1);

    const sidePlane2 = new THREE.Mesh(sidePlaneGeometry, planeMaterial);
    sidePlane2.rotation.y = Math.PI / 2;
    sidePlane2.position.x = planeSize / 2;
    sidePlane2.castShadow = true;
    scene.add(sidePlane2);

    const sidePlane3 = new THREE.Mesh(sidePlaneGeometry, planeMaterial);
    sidePlane3.position.z = -planeSize / 2;
    sidePlane3.castShadow = true;
    scene.add(sidePlane3);

    const sidePlane4 = new THREE.Mesh(sidePlaneGeometry, planeMaterial);
    sidePlane4.position.z = planeSize / 2;
    sidePlane4.castShadow = true;
    scene.add(sidePlane4);

    clock.start();
    var loader = new ColladaLoader();
    loader.load('/models/montre.dae', onLoaded, onProgress, onError);
};

const updateRendererSize = () => {
    renderer.setSize(width, height);
};
const updateClockHands = () => {
    const now = new Date();
    const hours = now.getHours() % 12; // Modulo 12 pour convertir les heures en format 12 heures
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Mettez à jour les rotations des aiguilles
    if (aiguilleHeures) {
        const hoursRotation = (hours + minutes / 60) * (Math.PI / 6); // 30 degrés par heure, 0.5 degré par minute
        aiguilleHeures.rotation.z = -hoursRotation;
    }

    if (aiguilleMinutes) {
        const minutesRotation = minutes * (Math.PI / 30); // 6 degrés par minute
        aiguilleMinutes.rotation.z = -minutesRotation;
    }

    if (aiguilleSecondes) {
        const secondsRotation = seconds * (Math.PI / 30); // 6 degrés par seconde
        aiguilleSecondes.rotation.z = -secondsRotation;
    }
};

const animate = () => {
    let dt = clock.getDelta();
    animationId = requestAnimationFrame(animate);
    controls.update();
    updateClockHands(); // Appel de la fonction pour mettre à jour les aiguilles
    renderer.render(scene, camera);
};

function onLoaded(collada) {
    let objects = collada.scene;
    
    boitier_carre= objects.getObjectByName("boitier_carre");
    boitier_round= objects.getObjectByName("boitier_round");
    
    objects.traverse((child) => {
        if (child.name === "aiguille_heures") {
            aiguilleHeures = child;
        } else if (child.name === "aiguille_minutes") {
            aiguilleMinutes = child;
        } else if (child.name === "aiguille_secondes") {
            aiguilleSecondes = child;
        }
    });
    scene.add(objects);
    let dt = clock.getElapsedTime();
    console.log("Loading completed after " + dt + " s.");
}

var onProgress = function (data) {
    if (data.lengthComputable) {
        var percentComplete = data.loaded / data.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};

var onError = function (data) {
    console.error(data);
};

const onClick = () => {
    console.log('document cliqué');
};

const onResize = () => {
    width = test.value.clientWidth;
    height = test.value.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateRendererSize();
};

const saveCameraPosition = () => {
    const { x, y, z } = camera.position;
    localStorage.setItem('cameraPosition', JSON.stringify({ x, y, z }));
};

onMounted(() => {
    width = test.value.clientWidth;
    height = test.value.clientHeight;
    initScene();
    animate();
    window.addEventListener('resize', onResize);
    document.addEventListener('click', onClick);
    saveCameraPosition();
});

onUpdated(()=>{
    initScene();
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('click', onClick);
});
</script>
<template>
    <div ref="test" >
        <canvas class="canvas" ref="canvas" />
        <h1>{{ boitier_image_url }}</h1>
    </div>
</template>

<style lang="scss" scoped>
.canvas {
    width: 80%;
    height: 25rem;
    margin: 0;
    border: 0px solid $secondary-color;  
}
.Layout__Aside{
    background: $black;
    height: 100%;
    color: $white;
    border-left: 3px solid $white; 
    font-family: $primary-font-familly; 

    &__Titre{
        font-size: $big-font-size;
        font-weight: 700;
        text-align: center;
        padding: 1rem;
    }
    &__Texte{
        font-size: $medium-font-size;
        font-weight: 400;
        text-align: center;
        padding: 1rem;
    }
}
</style>
