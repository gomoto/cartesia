import { CartesianObject, CartesianSphere } from '../state';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
  intersectionBy as _intersectionBy,
  keyBy as _keyBy,
} from 'lodash';
import { updateSphere } from './update-sphere';
import { createSphere } from './create-sphere';

/**
 * Modify objects in scene based on current and previous application state.
 */
export function updateObjects(scene: BABYLON.Scene, currentObjects: CartesianObject[], previousObjects: CartesianObject[]): void {
  const enteringObjects = _differenceBy(currentObjects, previousObjects, o => o.id);
  const exitingObjects = _differenceBy(previousObjects, currentObjects, o => o.id);
  const updatingCurrentObjects = _intersectionBy(currentObjects, previousObjects, o => o.id);
  const updatingPreviousObjects = _intersectionBy(previousObjects, currentObjects, o => o.id);
  _forEach(exitingObjects, (o) => {
    const sphere = scene.getMeshByName(o.id);
    if (sphere) {
      sphere.dispose();
    }
  });
  _forEach(enteringObjects, (o) => {
    switch (o.objectType) {
      case 'sphere': {
        createSphere(scene, o);
        break;
      }
    }
  });

  // reformat list as map for fast access by id
  const updatingPreviousObjectsById = _keyBy(updatingPreviousObjects, o => o.id);

  _forEach([...enteringObjects, ...updatingCurrentObjects], (o) => {
    const objectMesh = scene.getMeshByName(o.id);
    if (!objectMesh) {
      return;
    }
    switch (o.objectType) {
      case 'sphere': {
        const currentSphere = o;
        const previousSphere = <CartesianSphere | undefined> updatingPreviousObjectsById[o.id];
        if (currentSphere !== previousSphere) {
          updateSphere(objectMesh, currentSphere);
        }
        break;
      }
    }
  });
}
