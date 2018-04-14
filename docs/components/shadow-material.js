AFRAME.registerComponent('shadow-material', {
  init: function () {
    this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.ShadowMaterial();
    this.material.opacity = 0.3;
  }
});
