<script setup>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';
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

const initScene = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 1;
    renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
    updateRendererSize();
    renderer.setClearColor(0x222222, 1);
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; 
    controls.minDistance = 0.15;
    controls.maxDistance = 0.3;

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 1, 0);
    scene.add(pointLight);
    clock.start();
    var loader = new ColladaLoader();
    loader.load('/models/montre.dae', onLoaded, onProgress, onError);
};

const updateRendererSize = () => {
    renderer.setSize(width, height);
};

const animate = () => {
    let dt = clock.getDelta();
    animationId = requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
};

function onLoaded(collada) {
    let objects = collada.scene;
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

onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('click', onClick);
});
</script>
<template>
    <div ref="test" >
        <canvas class="canvas" ref="canvas" />
    </div>
</template>

<style lang="scss" scoped>
.canvas {
    width: 100%;
    height: 30rem;
    margin: 0;
    border: 3px solid $secondary-color;  
}
</style>
