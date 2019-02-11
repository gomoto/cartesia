import * as BABYLON from 'babylonjs';
import { State } from '../state';
import { updateObjects } from './update-objects';

/**
 * Modify scene based on current and previous application state.
 */
export function updateSceneFromState(scene: BABYLON.Scene, currentState: State, previousState: State | null): void {
  updateObjects(scene, currentState, previousState);
}
