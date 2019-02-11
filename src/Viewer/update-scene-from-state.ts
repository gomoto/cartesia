import * as BABYLON from 'babylonjs';
import { State } from '../state';
import { updatePoints } from './update-points';

/**
 * Modify scene based on current and previous application state.
 */
export function updateSceneFromState(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  updatePoints(scene, currentState, previousState);
}
