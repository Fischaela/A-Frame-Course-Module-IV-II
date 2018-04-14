AFRAME.registerComponent('arpet', {
  schema: {
    modelid: { type: 'string', default: 'pet' },
    petposition: { type: 'vec3' },
    petrotation: { type: 'vec3' },
    petscale: { type: 'vec3', default: '1 1 1' }
  },
  init: function () {
    this.el.setAttribute('visible', false);

    let model = document.createElement('a-gltf-model');
    model.setAttribute('src', '#' + this.data.modelid);
    model.setAttribute('scale', this.data.petscale);
    model.setAttribute('rotation', this.data.petrotation);
    model.setAttribute('position', this.data.petposition);

    this.el.appendChild(model);

    let raycaster = document.querySelector('[ar-raycaster]');
    let mark = document.querySelector('a-intersection-marker a-sphere');

    raycaster.addEventListener('click', () => {
      this.el.setAttribute('position', mark.getAttribute('position'));
      this.el.setAttribute('visible', true);
    });
  }
});

AFRAME.registerPrimitive('a-ar-pet', {
  defaultComponents: {
    arpet: {}
  },
  mappings: {
    petposition: 'arpet.petposition',
    petrotation: 'arpet.petrotation',
    petscale: 'arpet.petscale',
    modelid: 'arpet.modelid'
  }
});
