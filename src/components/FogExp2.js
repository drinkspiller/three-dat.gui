import { manageColor } from '../helpers/manageDefines';

const defines = [
  ['color', 'color'],
  ['density', 0]
];

/**
 * Add a gui controller to a camera.
 * @param {string} name
 * @param {THREE.FogExp2} fog
 * @returns {GUI} Returns the folder created for the camera
 */
export const addFogExp2 = function(name, fog) {
  const folder = this.addFolder(name);

  defines.forEach(parameter => {
    if (!fog[parameter[0]]) return;
    if (parameter[1] === 'color') manageColor(fog, folder, parameter);
    else folder.add(fog, parameter[0], parameter[1], parameter[2]);
  });

  return folder;
};
