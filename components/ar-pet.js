AFRAME.registerComponent('arpet', {
  schema: {
    animation: { type: 'string', default: 'idle' },
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
    model.setAttribute('shadow', 'receive: false; cast: true;');
    model.setAttribute('animation-mixer', 'clip: ' + this.data.animation);

    this.el.appendChild(model);

    let shadow = document.createElement('a-plane');
    shadow.setAttribute('width', '2');
    shadow.setAttribute('height', '2');
    shadow.setAttribute('position', this.data.position);
    shadow.setAttribute('rotation', '-90 0 0');
    shadow.setAttribute('shadow', 'receive: true');
    shadow.setAttribute('shadow-material', true);

    this.el.appendChild(shadow);

    let raycaster = document.querySelector('[ar-raycaster]');
    let mark = document.querySelector('a-intersection-marker a-sphere');
    let { stringify } = AFRAME.utils.coordinates;

    raycaster.addEventListener('click', () => {
      let position = raycaster.components.cursor.intersection.point;
      this.el.setAttribute('position', stringify(position));
      this.el.setAttribute('visible', true);
    });

    let recognition = new webkitSpeechRecognition();
    recognition.contiuous = true;
    recognition.lang = 'en-US';
    recognition.onresult = function (e) {
      recognition.start();
      let result = e.results[0][0].transcript;
      let animations = {
        'Sit': 'sits',
        'Jump': 'jumpUp'
      };
      for (let key of Object.keys(animations)) {
        if (result.toLowerCase().includes(key.toLowerCase())) {
          model.setAttribute('animation-mixer', 'clip: ' + animations[key]);
          return;
        }
      }
    }
    recognition.onerror = function () {}
    recognition.start();
  }
});

AFRAME.registerPrimitive('a-ar-pet', {
  defaultComponents: {
    arpet: {}
  },
  mappings: {
    animation: 'arpet.animation',
    petposition: 'arpet.petposition',
    petrotation: 'arpet.petrotation',
    petscale: 'arpet.petscale',
    modelid: 'arpet.modelid'
  }
});
