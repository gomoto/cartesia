// These are IDs of materials in the scene
export const materialIds = {
  points: {
    selected: 'selectedPointMaterial',
    unselected: 'unselectedPointMaterial',
  }
};

export function createMaterials(scene: BABYLON.Scene): void {
  // Selected points are red
  const selectedPointMaterial = new BABYLON.StandardMaterial(materialIds.points.selected, scene);
  selectedPointMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
  // Unelected points are white
  const unselectedPointMaterial = new BABYLON.StandardMaterial(materialIds.points.unselected, scene);
  unselectedPointMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
}
