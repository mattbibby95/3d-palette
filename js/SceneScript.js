import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r120/three.module.js';
import { GLTFLoader } from '../helpers/GLTFLoader.js';
import { OrbitControls } from '../helpers/OrbitControls.js';



function main() {

    const canvas = document.querySelector('#canv');
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Camera Setup
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 20;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    camera.position.y = 1;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbff0f0);

    // // Light Setup
    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(-1, 2, 4);
    //     scene.add(light);
    // }

    // Light Setup
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(-5, 5, 1);
    scene.add(backLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(4, 5, 0.1);
    scene.add(fillLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(1, 5, 4);
    scene.add(keyLight);

    // Materials Init
    const treeMat = new THREE.MeshPhysicalMaterial({
        color: 0x4c7768, metalness: 0, roughness: 1, transmission: 0
    });

    const grassMat = new THREE.MeshPhysicalMaterial({
        color: 0x7eb678, metalness: 0, roughness: 1, transmission: 0
    });

    const woodMat = new THREE.MeshPhysicalMaterial({
        color: 0x7e5956, metalness: 0, roughness: 1, transmission: 0
    });

    const rockMat = new THREE.MeshPhysicalMaterial({
        color: 0x9299ad, metalness: 0, roughness: 1, transmission: 0
    });

    const waterMat = new THREE.MeshPhysicalMaterial({
        color: 0x98b8d1, metalness: 0, roughness: 1, transmission: 0
    });

    const tentMat = new THREE.MeshPhysicalMaterial({
        color: 0xfe8e8f, metalness: 0, roughness: 1, transmission: 0
    });


    // 3D Model Setup
    const gltfLoader = new GLTFLoader();
    const url = '../models/FloatingTrees.glb';
    gltfLoader.load(url, (gltf) => {
        // Get blender scene
        const root = gltf.scene;

        // Set blender scene position
        root.position.set(0, -0.1, 0);
        root.rotation.set(0, -20, 0);
        root.scale.set(0.3, 0.3, 0.3);

        // Assign materials

        // Tree materials
        root.getObjectByName('Tree1').material = treeMat;
        root.getObjectByName('Tree2').material = treeMat;
        root.getObjectByName('Tree3').material = treeMat;

        // Rock Materials
        root.getObjectByName('CampfireRocks').material = rockMat;
        root.getObjectByName('IslandRocks').material = rockMat;
        root.getObjectByName('SeatRocks').material = rockMat;

        // Water Material
        root.getObjectByName('Water').material = waterMat;

        // Grass Materials
        root.getObjectByName('Grass').material = grassMat;
        root.getObjectByName('GrassTuft').material = grassMat;
        root.getObjectByName('GrassTuft2').material = grassMat;

        // Wood Materials
        root.getObjectByName('CampfireWood').material = woodMat;

        // Tent Materials
        root.getObjectByName('Tent').material = tentMat;

        // Add blender scene to three scene
        scene.add(root);

        // Set up the lights to look at the blender scene
        backLight.target = root;
        fillLight.target = root;
        keyLight.target = root;
    });

    // Light Helpers
    // const backHelp = new THREE.DirectionalLightHelper(backLight);
    // const fillHelp = new THREE.DirectionalLightHelper(fillLight);
    // const keyHelp = new THREE.DirectionalLightHelper(keyLight);
    // scene.add(backHelp);
    // scene.add(fillHelp);
    // scene.add(keyHelp);

    // Setting up controls
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;


    // Listeners for changing the colour of materials + background
    const backgroundColourInput = document.getElementById('background-colour');
    backgroundColourInput.addEventListener('input', function () {
        scene.background = new THREE.Color(this.value);
    })

    const treeColourInput = document.getElementById('tree-colour');
    treeColourInput.addEventListener('input', function () {
        treeMat.color.set(this.value);
    })

    const waterColourInput = document.getElementById('water-colour');
    waterColourInput.addEventListener('input', function () {
        waterMat.color.set(this.value);
    })

    const rockColourInput = document.getElementById('rock-colour');
    rockColourInput.addEventListener('input', function () {
        rockMat.color.set(this.value);
    })

    const grassColourInput = document.getElementById('grass-colour');
    grassColourInput.addEventListener('input', function () {
        grassMat.color.set(this.value);
    })

    const tentColourInput = document.getElementById('tent-colour');
    tentColourInput.addEventListener('input', function () {
        tentMat.color.set(this.value);
    })

    const woodColourInput = document.getElementById('wood-colour');
    woodColourInput.addEventListener('input', function () {
        woodMat.color.set(this.value);
    })

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            renderer.setSize(width, height, false);
        }

        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        controls.update();
    }


    requestAnimationFrame(render);

}

export default main();