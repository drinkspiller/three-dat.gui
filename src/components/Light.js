import {manageColor} from '../helpers/manageDefines';

const defines = [
  ['angle', 0, Math.PI / 2],
  ['color', 'color'],
  ['decay', 0, 2],
  ['distance', 0, 1000],
  ['groundColor', 'color'],
  ['intensity', 0, 5],
  ['penumbra', 0, 1],
  ['power', 0, 8 * Math.PI]
];

/**
 * Add a gui controller to a light.
 * @param {string} name
 * @param {THREE.Light} light
 * @param {object=} propertyMinMax
 * @todo castShadow, target
 * @returns {GUI} Returns the folder created for the light
 */
export const addLight = function(name, light, propertyMinMax = {}) {
  const folder = this.addFolder(name);
  folder.addObject3D(null, light, {inner: true});

  defines.forEach(parameter => {
    if (!light.hasOwnProperty(parameter[0])) return;
    if (parameter[1] === 'color') {
      manageColor(light, folder, parameter);
    } else {
      const min = propertyMinMax.hasOwnProperty(parameter[0]) ?
          propertyMinMax[parameter[0].min] :
          parameter[1];
      const max = propertyMinMax.hasOwnProperty(parameter[0]) ?
          propertyMinMax[parameter[0].max] :
          parameter[2];
      folder.add(light, parameter[0], min, max);
    }
  });

  return folder;
};
