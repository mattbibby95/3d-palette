import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '../helpers/OrbitControls.js';



function main() {

    const canvas = document.querySelector('#canv');
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Camera Setup
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    camera.position.y = 1;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xC6E2E9);

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

    // 3D Model Setup
    const gltfLoader = new GLTFLoader();
    const url = '../models/FloatingTrees.glb';
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene;
        root.position.set(0, -0.1, 0);
        root.rotation.set(0, -20, 0);
        root.scale.set(0.3, 0.3, 0.3);
        scene.add(root);
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


    let controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    // function makeInstance(geometry, color, x) {
    //     const material = new THREE.MeshPhongMaterial({ color });

    //     const cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);

    //     cube.position.x = x;

    //     return cube;
    // }

    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // const cubes = [
    //     makeInstance(geometry, 0x44aa88, 0),
    //     makeInstance(geometry, 0x8844aa, -2),
    //     makeInstance(geometry, 0xaa8844, 2),
    // ]

    const backgroundColourInput = document.getElementById('body-color');
    backgroundColourInput.addEventListener('input', function () {
        scene.background = new THREE.Color(this.value);
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

        // cubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        controls.update();
    }


    requestAnimationFrame(render);

}

export default main();