import * as BABYLON from 'babylonjs';
import { Color3 } from '../state';

export function updateClearColor(scene: BABYLON.Scene, color: Color3): void {
  scene.clearColor = new BABYLON.Color4(color.r, color.g, color.b, 1);
}
