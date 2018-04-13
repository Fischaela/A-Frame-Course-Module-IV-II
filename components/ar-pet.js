AFRAME.registerComponent('arpet', {
  schema: {
    arpetanimation: { type: 'string', default: 'idle' },
    modelid: { type: 'string', default: '#pet' },
    arpetposition: { type: 'vec3' },
    arpetrotation: { type: 'vec3' },
    arpetscale: { type: 'vec3' }
  },
  init: function () {
    let petModel = document.createElement('a-gltf-model');
    petModel.setAttribute('src', '#' + this.data.modelid);
    petModel.setAttribute('scale', this.data.arpetscale);
    petModel.setAttribute('rotation', this.data.arpetrotation);
    petModel.setAttribute('position', this.data.arpetposition);
    petModel.setAttribute('animation-mixer', 'clip: ' + this.data.arpetanimation);
    petModel.setAttribute('shadow', 'receive: false; cast: true;');

    this.el.appendChild(petModel);

    let shadow = document.createElement('a-plane');
    shadow.setAttribute('width', '2');
    shadow.setAttribute('height', '2');
    shadow.setAttribute('position', this.data.position);
    shadow.setAttribute('rotation', '-90 0 0');
    shadow.setAttribute('color', 'white');
    shadow.setAttribute('shadow', 'receive: true');
    shadow.setAttribute('shadow-material');

    this.el.appendChild(shadow);

    let mark = document.createElement('a-sphere');
    mark.setAttribute('visible', 'false');
    mark.setAttribute('radius', '0.02');
    mark.setAttribute('color', 'tomato');

    this.el.sceneEl.appendChild(mark);

    let raycaster = document.querySelector('[ar-raycaster]');

    raycaster.addEventListener('raycaster-intersection', function(e) {
      mark.setAttribute('position', e.detail.intersections[0].point);
      mark.setAttribute('color', 'lightseagreen');
      mark.setAttribute('visible', true);
    });

    raycaster.addEventListener('raycaster-intersection-cleared', function(e) {
      mark.setAttribute('color', 'tomato');
    });

    raycaster.addEventListener('click', function () {
      let pet = this.el;
      pet.setAttribute('position', mark.getAttribute('position'));
      pet.setAttribute('visible', true);
    });

    function playAnimation(animation) {
      petModel.setAttribute('animation-mixer', 'clip: ' + animation);
    }

    let recognition;

    try {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.maxAlternatives = 5;
      recognition.lang = 'en-US';
      recognition.onresult = function (event) {
        recognition.start();
        console.log(event.results);
        let results = event.results;
        for (const result of results) {
          for (const { transcript } of Array.from(result)) {
            const animations = {
              'Sit': 'sits',
              'Jump': 'jumpUp'
            };
            for (const animationKey of Object.keys(animations)) {
              if (transcript.toLowerCase().includes(animationKey.toLowerCase())) {
                playAnimation(animations[animationKey]);
                return;
              }
            }
          }
        }
      };
      recognition.onerror = () => setTimeout(() => recognition.start(), 500);
      recognition.start();
    } catch (err) { console.error(err.message); }
  }
});

AFRAME.registerPrimitive('a-arpet', {
  defaultComponents: {
    arpet: {}
  },
  mappings: {
    arpetposition: 'arpet.arpetposition',
    arpetrotation: 'arpet.arpetrotation',
    arpetscale: 'arpet.arpetscale',
    arpetanimation: 'arpet.arpetanimation',
    modelid: 'arpet.modelid'
  }
});
