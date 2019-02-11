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
    enteringObjects = _differenceBy(currentObjects, previousObjects, o => o.id);
    exitingObjects = _differenceBy(previousObjects, currentObjects, o => o.id);
    updatingObjects = _intersectionBy(currentObjects, previousObjects, o => o.id);
  }
  _forEach(enteringObjects, (o) => {
    switch (o.objectType) {
      case 'point': {
        BABYLON.Mesh.CreateSphere(o.id, 8, 0.2, scene, false, BABYLON.Mesh.FRONTSIDE);
        break;
      }
    }
  });
  _forEach(exitingObjects, (o) => {
    const sphere = scene.getMeshByName(o.id);
    if (sphere) {
      sphere.dispose();
    }
  });
  _forEach([...enteringObjects, ...updatingObjects], (o) => {
    switch (o.objectType) {
      case 'point': {
        const sphere = scene.getMeshByName(o.id);
        if (sphere) {
          sphere.position.x = o.position.x;
          sphere.position.y = o.position.y;
          sphere.position.z = o.position.z;
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
