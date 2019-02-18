// These are IDs of materials in the scene
export const materialIds = {
  spheres: {
    selected: 'selectedPointMaterial',
    unselected: 'unselectedPointMaterial',
  }
};

export function createMaterials(scene: BABYLON.Scene): void {
  // Selected spheres are red
  const selectedPointMaterial = new BABYLON.StandardMaterial(materialIds.spheres.selected, scene);
  selectedPointMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
  // Unelected spheres are white
  const unselectedPointMaterial = new BABYLON.StandardMaterial(materialIds.spheres.unselected, scene);
  unselectedPointMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
}
