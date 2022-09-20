import * as THREE from 'three';
import init from '../dist'; // Import initialization method
import * as LilGui from 'lil-gui';

init(LilGui);

class App {
  constructor() {
    // Events
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    // Init
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector('canvas')
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xeeeeee, 1);

    // Camera and control
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.set(5, 1, 5);
    this.camera.lookAt(new THREE.Vector3());
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee)
    this.fog = new THREE.Fog(0xeeeeee, 1, 100);
    this.scene.fog = this.fog;

    this.onWindowResize();
    this.renderer.animate(this.render.bind(this));

    this.initGui();
    this.initFloor();
    this.initCube();
    this.initLight();

    this.gui.addScene('Scene', this.scene, {
      recursive: true
    }).close();

  }

  initGui() {
    this.gui = new LilGui.GUI();
    this.gui.addCamera('Camera', this.camera).close();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    // this.cubeMesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  initLight() {
    this.light = new THREE.PointLight(0x9ed7ff);
    this.light.position.set(0, -2.5, 0);

    this.scene.add(this.light);
    this.gui.addLight('PointLight', this.light).close();

    this.ambient = new THREE.AmbientLight(0xFFFFFF, 0.3);

    this.scene.add(this.ambient);
    this.gui.addLight('AmbientLight', this.ambient).close();
  }

  initCube() {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      metalness: 0.8,
      roughness: 0.5
    });
    this.cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.cubeMesh.rotation.x = -1;
    this.cubeMesh.rotation.z = 2;

    this.scene.add(this.cubeMesh);
    this.gui.addMesh('Cube', this.cubeMesh).close();
  }

  initFloor() {
    const floorGeometry = new THREE.PlaneGeometry(500, 500);
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      metalness: 0,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.position.y = -3;
    floorMesh.rotation.x = - Math.PI / 2
    floorMesh.name = "Name"

    this.scene.add(floorMesh);
    this.gui.addMesh('Floor', floorMesh).close();
  }
}

new App();
