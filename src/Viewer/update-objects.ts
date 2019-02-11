import { State, CartesianObject, CartesianPoint } from '../state';
import * as stateSelector from '../selector';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
  intersectionBy as _intersectionBy,
  keyBy as _keyBy,
} from 'lodash';
import { updatePoint } from './update-point';

/**
 * Modify objects in scene based on current and previous application state.
 */
export function updateObjects(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  const currentObjects = stateSelector.getObjects(currentState);
  let enteringObjects: CartesianObject[];
  let exitingObjects: CartesianObject[];
  let updatingCurrentObjects: CartesianObject[];
  let updatingPreviousObjects: CartesianObject[];
  if (!previousState) {
    enteringObjects = currentObjects;
    exitingObjects = [];
    updatingCurrentObjects = [];
    updatingPreviousObjects = [];
  } else {
    const previousObjects = stateSelector.getObjects(previousState);
    enteringObjects = _differenceBy(currentObjects, previousObjects, o => o.id);
    exitingObjects = _differenceBy(previousObjects, currentObjects, o => o.id);
    updatingCurrentObjects = _intersectionBy(currentObjects, previousObjects, o => o.id);
    updatingPreviousObjects = _intersectionBy(previousObjects, currentObjects, o => o.id);
  }
  _forEach(exitingObjects, (o) => {
    const sphere = scene.getMeshByName(o.id);
    if (sphere) {
      sphere.dispose();
    }
  });
  _forEach(enteringObjects, (o) => {
    switch (o.objectType) {
      case 'point': {
        BABYLON.Mesh.CreateSphere(o.id, 8, 0.2, scene, false, BABYLON.Mesh.FRONTSIDE);
        break;
      }
    }
  });

  // reformat list as map for fast access by id
  const updatingPreviousObjectsById = _keyBy(updatingPreviousObjects, o => o.id);

  _forEach([...enteringObjects, ...updatingCurrentObjects], (o) => {
    switch (o.objectType) {
      case 'point': {
        const currentPoint = o;
        const previousPoint = updatingPreviousObjectsById[o.id] as CartesianPoint;
        updatePoint(scene, currentPoint, previousPoint);
        break;
      }
    }
  });
}
