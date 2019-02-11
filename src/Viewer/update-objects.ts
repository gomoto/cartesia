import { State, CartesianObject } from '../state';
import * as stateSelector from '../selector';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
  intersectionBy as _intersectionBy,
} from 'lodash';
import { materialIds } from './materials';

/**
 * Modify objects in scene based on current and previous application state.
 */
export function updateObjects(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  const currentObjects = stateSelector.getObjects(currentState);
  let enteringObjects: CartesianObject[];
  let exitingObjects: CartesianObject[];
  let updatingObjects: CartesianObject[];
  if (!previousState) {
    enteringObjects = currentObjects;
    exitingObjects = [];
    updatingObjects = [];
  } else {
    const previousObjects = stateSelector.getObjects(previousState);
    enteringObjects = _differenceBy(currentObjects, previousObjects, object => object.id);
    exitingObjects = _differenceBy(previousObjects, currentObjects, object => object.id);
    updatingObjects = _intersectionBy(currentObjects, previousObjects, o => o.id);
  }
  _forEach(enteringObjects, (object) => {
    switch (object.objectType) {
      case 'point': {
        const sphere = BABYLON.Mesh.CreateSphere(object.id, 32, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere.position.x = object.position.x;
        sphere.position.y = object.position.y;
        sphere.position.z = object.position.z;
        if (sphere) {
          if (object.isSelected) {
            sphere.material = scene.getMaterialByName(materialIds.points.selected);
          } else {
            sphere.material = scene.getMaterialByName(materialIds.points.unselected);
          }
        }
        break;
      }
    }
  });
  _forEach(exitingObjects, (object) => {
    const sphere = scene.getMeshByName(object.id);
    if (sphere) {
      sphere.dispose();
    }
  });
  _forEach(updatingObjects, (o) => {
    switch (o.objectType) {
      case 'point': {
        const sphere = scene.getMeshByName(o.id);
        if (sphere) {
          if (o.isSelected) {
            sphere.material = scene.getMaterialByName(materialIds.points.selected);
          } else {
            sphere.material = scene.getMaterialByName(materialIds.points.unselected);
          }
        }
        break;
      }
    }
  });
}
