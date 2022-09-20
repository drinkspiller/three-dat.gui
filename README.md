# three-lil-gui

A package which create THREE.js controls on lil-gui


## Install

First install the npm package

```
npm install --save https://github.com/drinkspiller/three-lil-gui/tarball/master
```

Or with yarn

```
yarn add --save https://github.com/drinkspiller/three-lil-gui/tarball/master
```

## How to use

Let's create a simple THREE.js example which display a gui controller for our `THREE.MeshStandardMaterial`

```javascript
import * as LilGui  from 'lil-gui';
import init from 'three-lil-gui'; // Import initialization method
init(LilGui);

/*
... init scene, renderer & camera
*/

var gui = new LilGui.GUI();
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new MeshStandardMaterial();
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.addMaterial('standard_material', material);
```

You can add quickly many kind of THREE.js objects.

- `THREE.Material` with `gui.addMaterial("name", material)`
- `THREE.Light` with `gui.addLight("name", light)`
- `THREE.Vector` with `gui.addVector("name", vector)`
- `THREE.Scene` with `gui.addScene("name", scene)`
- `THREE.Object3D` with `gui.addObject3D("name", object)`
- `THREE.Mesh` with `gui.addMesh("name", mesh)`
- `THREE.Fog` with `gui.addFog("name", fog)`
- `THREE.FogExp2` with `gui.addFogExp2("name", fog)`

## Todo

- Add helpers on `THREE.Object3D`
- Refactoring
- Climate
