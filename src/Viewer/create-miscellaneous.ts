import * as BABYLON from 'babylonjs';

/**
 * Add miscellaneous things to the scene.
 */
export function createMiscellaneous(scene: BABYLON.Scene): void {
  const zAxis = BABYLON.MeshBuilder.CreateLines('zAxis', {
    points: [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, 100)],
  }, scene);
  zAxis.color = new BABYLON.Color3(0, 0, 1); // blue

  const orientingPlane = new BABYLON.Plane(0, 1, 0, -1);
  orientingPlane.normalize();
  const plane = BABYLON.MeshBuilder.CreatePlane('plane1', {
    sourcePlane: orientingPlane,
    height: 10,
    width: 10,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  }, scene);

  const planeMaterial = new BABYLON.StandardMaterial('mat1', scene);
  planeMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);

  plane.material = planeMaterial;

  const pointParticleSystem = new BABYLON.SolidParticleSystem('pointParticleSystem', scene, {
    enableDepthSort: true,
    isPickable: true,
  });
  const pointModel = BABYLON.MeshBuilder.CreateSphere('pointModel', {}, scene);
  const pointModelId = pointParticleSystem.addShape(pointModel, 20);
  pointModel.dispose();
  pointParticleSystem.buildMesh();
  // pointParticleSystem.computeParticleTexture = false;
  // Translucent particles
  const pointMaterial = new BABYLON.StandardMaterial('pointMaterial', scene);
  pointMaterial.alpha = 0.85;
  pointParticleSystem.mesh.material = pointMaterial;
  pointParticleSystem.updateParticle = (particle) => {
    particle.position.x = particle.idx - pointParticleSystem.nbParticles / 2;
    return particle;
  }
  pointParticleSystem.setParticles();
  // refreshVisibleSize forces BBox recomputation
  pointParticleSystem.refreshVisibleSize();
  // pickable particles
  scene.onPointerObservable.add((pointerInfo, eventState) => {
    // return if not a pointer tap
    if (pointerInfo.type !== BABYLON.PointerEventTypes.POINTERTAP) {
      return;
    }
    const pickResult = pointerInfo.pickInfo;
    if (!pickResult) {
      return;
    }
    // return if not pointParticleSystem mesh
    if (pickResult.pickedMesh !== pointParticleSystem.mesh) {
      return;
    }
    // get the mesh picked face
    const meshFaceId = pickResult.faceId;
    // return if nothing picked
    if (meshFaceId === -1) {
      return;
    }
    // get the picked particle idx from the pickedParticles array
    const idx = pointParticleSystem.pickedParticles[meshFaceId].idx;
    // get the picked particle
    const particle = pointParticleSystem.particles[idx];
    if (!particle) {
      return;
    }
    // turn it red
    if (particle.color) {
      particle.color.r = 1;
      particle.color.b = 0;
      particle.color.g = 0;
    }
    // draw particles
    pointParticleSystem.setParticles();
  });

  scene.onBeforeRenderObservable.add(() => {
    // when particles are translucent, we need to recompute particle depth sort on each render!
    pointParticleSystem.setParticles();
  });
}
