var draw = {
  divInvader: document.querySelector('#invader'),
  gridSize: document.createElement('input'),
  pixelSize: document.createElement('input'),
  button: document.createElement('button'),
  styles: 'rgb(231, 231, 231)',
  preview: 'rgba(231, 231, 231, 0.7)',
  clicked: false,

  drawInit: function () {
    draw.gridSize.className = 'gridSize';
    draw.gridSize.type = 'number';
    draw.gridSize.placeholder = 'Taille de la grille';
    draw.gridSize.value = '20';
    draw.gridSize.min = '1';

    document.querySelector('.configuration').appendChild(draw.gridSize);

    draw.pixelSize.className = 'pixelSize';
    draw.pixelSize.type = 'number';
    draw.pixelSize.placeholder = 'Taille des pixels';
    draw.pixelSize.value = '20';
    draw.pixelSize.step = '5';
    draw.pixelSize.min = '5';
    document.querySelector('.configuration').appendChild(draw.pixelSize);

    draw.button.className = 'button';
    draw.button.textContent = 'Valider';
    document.querySelector('.configuration').appendChild(draw.button);

    draw.drawGrid();
    draw.initEventListener();
  },

  drawGrid: function () {
    for (var j = 0; j < draw.gridSize.value; j++) {
      var column = document.createElement('div');
      column.className = 'column';
      document.getElementById('invader').appendChild(column);

      // creation row
      for (var i = 0; i < draw.gridSize.value; i++) {
        var row = document.createElement('div');
        row.className = 'row';
        row.style.width = `${draw.pixelSize.value}px`;
        row.style.height = `${draw.pixelSize.value}px`;
        row.style.background = 'black';
        column.appendChild(row);
      }
    }
  },

  initEventListener: function () {
    document
      .querySelector('.configuration')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('invader').innerHTML = '';
        draw.drawGrid();
      });

    // Listener sur le click pour changer la couleur
    draw.divInvader.addEventListener('mousedown', function (e) {
      if (draw.preview === draw.styles) {
        e.target.style.backgroundColor = 'black';
        draw.preview = 'black';
      } else {
        e.target.style.backgroundColor = draw.styles;
        draw.preview = draw.styles;
      }
      e.target.style.opacity = 1;
    });

    // Listener sur le click pour sélectionner la couleur
    document
      .querySelector('.colorSelector')
      .addEventListener('mousedown', function (e) {
        draw.styles = getComputedStyle(e.target);
        if (e.target.className !== 'colorSelector') {
          draw.styles = draw.styles.backgroundColor;
          document.querySelectorAll('.color').forEach(function (item) {
            item.classList.remove('active');
          });
          e.target.className += ' active';
        }
      });

    draw.divInvader.addEventListener('mouseover', function (e) {
      draw.preview = e.target.style.backgroundColor;
      // console.log(draw.preview);
      if (draw.clicked === true) {
        e.target.style.backgroundColor = draw.styles;
        e.target.style.opacity = 1;
        draw.preview = e.target.style.backgroundColor;
        console.log(draw.preview);
      } else {
        e.target.style.backgroundColor = draw.styles;
        e.target.style.opacity = 0.5;
      }
    });

    draw.divInvader.addEventListener('mouseout', function (e) {
      if (draw.clicked === false) {
        e.target.style.backgroundColor = draw.preview;
        e.target.style.opacity = 1;
      }
    });

    draw.divInvader.addEventListener('mousedown', function (e) {
      draw.clicked = true;
    });

    draw.divInvader.addEventListener('mouseup', function (e) {
      draw.clicked = false;
    });
  },
};

draw.drawInit();
