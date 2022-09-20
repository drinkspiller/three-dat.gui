import {manageColor} from '../helpers/manageDefines';

const defines = [
  ['bottom', 0], ['far', 0], ['filmGauge', 0], ['filmOffset', 0], ['focus', 0],
  ['fov', 0, 180], ['left', 0], ['near', 0], ['right', 0], ['top', 0],
  ['zoom', 0]
];

/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.Camera} camera
 * @param {object=} propertyMinMax
 * @returns {GUI} Returns the folder created for the camera
 */
export const addCamera = function(name, camera, propertyMinMax = {}) {
  const folder = this.addFolder(name);
  folder.addObject3D('object', camera, {inner: true});

  defines.forEach(parameter => {
    if (!camera.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') {
      manageColor(camera, folder, parameter);
    } else {
      const min = propertyMinMax.hasOwnProperty(parameter[0]) ?
          propertyMinMax[parameter[0].min] :
          parameter[1];
      const max = propertyMinMax.hasOwnProperty(parameter[0]) ?
          propertyMinMax[parameter[0].max] :
          parameter[2];
      folder.add(camera, parameter[0], min, max)
          .onChange(() => {
            if (camera.updateProjectionMatrix) camera.updateProjectionMatrix();
          });
    }
  });

  return folder;
};
