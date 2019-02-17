import * as BABYLON from 'babylonjs';
import { HexColor3 } from '../state';

export function updateClearColor(scene: BABYLON.Scene, color: HexColor3): void {
  scene.clearColor = BABYLON.Color3.FromHexString(color).toColor4();
}
