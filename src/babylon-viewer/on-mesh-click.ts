/**
 * Register callback function for mesh clicks.
 */
export function onMeshClick(scene: BABYLON.Scene, callback: (mesh: BABYLON.AbstractMesh) => void): void {
  scene.onPointerObservable.add((pointerInfo, eventState) => {
    if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERTAP) {
      return;
    }
    const pickResult = pointerInfo.pickInfo;
    if (!pickResult) {
      return;
    }
    const pickedMesh = pickResult.pickedMesh;
    if (!pickedMesh) {
      return;
    }
    callback(pickedMesh);
  });
}
