import * as BABYLON from 'babylonjs';
import { HexColor3 } from '../state';

export function setBackgroundColor(scene: BABYLON.Scene, color: HexColor3): void {
  scene.clearColor = BABYLON.Color3.FromHexString(color).toColor4();
}
