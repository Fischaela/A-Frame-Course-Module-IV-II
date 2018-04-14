AFRAME.registerComponent('shadow-material', {
  init: function () {
    this.material = new THREE.ShadowMaterial();
    this.el.getOrCreateObject3D('mesh').material = this.material;
    this.material.opacity = 0.3;
  }
});
