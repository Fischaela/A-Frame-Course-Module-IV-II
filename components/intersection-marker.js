AFRAME.registerComponent('intersectionmarker', {
  init: function () {
    let mark = document.createElement('a-sphere');
    mark.setAttribute('visible', 'false');
    mark.setAttribute('radius', '0.02');
    mark.setAttribute('color', 'tomato');

    this.el.appendChild(mark);

    let raycaster = document.querySelector('[ar-raycaster]');

    raycaster.addEventListener('raycaster-intersection', function(e) {
      mark.setAttribute('position', e.detail.intersections[0].point);
      mark.setAttribute('color', 'lightseagreen');
      mark.setAttribute('visible', true);
    });

    raycaster.addEventListener('raycaster-intersection-cleared', function(e) {
      mark.setAttribute('color', 'tomato');
    });
  }
});

AFRAME.registerPrimitive('a-intersection-marker', {
  defaultComponents: {
    intersectionmarker: {}
  },
  mappings: {}
});
