import { CartesianObject, CartesianSphere, CartesianLine } from '../state';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
  intersectionBy as _intersectionBy,
  keyBy as _keyBy,
} from 'lodash';
import { createSphere } from './create-sphere';
import { updateSphere } from './update-sphere';
import { createLine } from './create-line';
import { updateLine } from './update-line';

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
      case 'line': {
        createLine(scene, o);
        break;
      }
    }
  });

  // reformat list as map for fast access by id
  const updatingPreviousObjectsById = _keyBy(updatingPreviousObjects, o => o.id);

  _forEach(updatingCurrentObjects, (o) => {
    const objectMesh = scene.getMeshByName(o.id);
    if (!objectMesh) {
      return;
    }
    switch (o.objectType) {
      case 'sphere': {
        const currentSphere = o;
        const previousSphere = <CartesianSphere | undefined> updatingPreviousObjectsById[o.id];
        if (currentSphere !== previousSphere) {
          updateSphere(scene, currentSphere, previousSphere);
        }
        break;
      }
      case 'line': {
        const currentLine = o;
        const previousLine = <CartesianLine | undefined> updatingPreviousObjectsById[o.id];
        if (currentLine !== previousLine) {
          updateLine(scene, currentLine, previousLine);
        }
      }
    }
  });
}
