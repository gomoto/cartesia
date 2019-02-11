import { State, CartesianPoint } from '../state';
import * as stateSelector from '../selector';
import {
  differenceBy as _differenceBy,
  forEach as _forEach,
} from 'lodash';

/**
 * Modify points in scene based on current and previous application state.
 */
export function updatePoints(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  const currentPoints = stateSelector.getPoints(currentState);
  let enteringPoints: CartesianPoint[];
  let exitingPoints: CartesianPoint[];
  if (!previousState) {
    enteringPoints = currentPoints;
    exitingPoints = [];
  } else {
    const previousPoints = stateSelector.getPoints(previousState);
    enteringPoints = _differenceBy(currentPoints, previousPoints, point => point.id);
    exitingPoints = _differenceBy(previousPoints, currentPoints, point => point.id);
  }
  _forEach(enteringPoints, (point) => {
    const sphere = BABYLON.Mesh.CreateSphere(point.id, 32, 1, scene, false, BABYLON.Mesh.FRONTSIDE);
    sphere.position.x = point.position.x;
    sphere.position.y = point.position.y;
    sphere.position.z = point.position.z;
  });
  _forEach(exitingPoints, (point) => {
    const sphere = scene.getMeshByName(point.id);
    if (sphere) {
      sphere.dispose();
    }
  });
}
