import * as BABYLON from 'babylonjs';
import { CartesianPoint } from '../state';
import { materialIds } from './materials';

export function updatePoint(scene: BABYLON.Scene, currentPoint: CartesianPoint, previousPoint?: CartesianPoint): void {
  const sphere = scene.getMeshByName(currentPoint.id);
  if (sphere) {
    sphere.position.x = currentPoint.position.x;
    sphere.position.y = currentPoint.position.y;
    sphere.position.z = currentPoint.position.z;
    if (currentPoint.isSelected) {
      sphere.material = scene.getMaterialByName(materialIds.points.selected);
    } else {
      sphere.material = scene.getMaterialByName(materialIds.points.unselected);
    }
  }
}
