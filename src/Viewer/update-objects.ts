import { State, CartesianObject } from '../state';
import * as stateSelector from '../selector';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
} from 'lodash';

/**
 * Modify objects in scene based on current and previous application state.
 */
export function updateObjects(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  const currentObjects = stateSelector.getObjects(currentState);
  let enteringObjects: CartesianObject[];
  let exitingObjects: CartesianObject[];
  if (!previousState) {
    enteringObjects = currentObjects;
    exitingObjects = [];
  } else {
    const previousObjects = stateSelector.getObjects(previousState);
    enteringObjects = _differenceBy(currentObjects, previousObjects, object => object.id);
    exitingObjects = _differenceBy(previousObjects, currentObjects, object => object.id);
  }
  _forEach(enteringObjects, (object) => {
    switch (object.objectType) {
      case 'point': {
        const sphere = BABYLON.Mesh.CreateSphere(object.id, 32, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
        sphere.position.x = object.position.x;
        sphere.position.y = object.position.y;
        sphere.position.z = object.position.z;
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
}
