var draw = {
  gridSize: document.createElement('input'),
  button: document.createElement('button'),
  pixelSize: document.createElement('input'),
  styles: 'rgb(231, 231, 231)',
  preview: 'rgba(231, 231, 231, 0.7)',
  clicked: false,

  drawInit: function () {
    draw.gridSize.className = 'gridSize';
    draw.gridSize.type = 'number';
    draw.gridSize.placeholder = 'Taille de la grille';
    draw.gridSize.value = '100';
    draw.gridSize.min = '1';

    document.querySelector('.configuration').appendChild(draw.gridSize);

    draw.pixelSize.className = 'pixelSize';
    draw.pixelSize.type = 'number';
    draw.pixelSize.placeholder = 'Taille des pixels';
    draw.pixelSize.value = '5';
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
    document
      .querySelector('#invader')
      .addEventListener('mousedown', function handleclick(e) {
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
      .addEventListener('mousedown', function handleclick(e) {
        draw.styles = getComputedStyle(e.target);
        if (e.target.className !== 'colorSelector') {
          draw.styles = draw.styles.backgroundColor;
          document.querySelectorAll('.color').forEach(function (item) {
            item.classList.remove('active');
          });
          e.target.className += ' active';
        }
      });

    document
      .querySelector('#invader')
      .addEventListener('mouseover', function handleclick(e) {
        draw.preview = e.target.style.backgroundColor;
        if (draw.clicked === true) {
          e.target.style.backgroundColor = draw.styles;
          e.target.style.opacity = 1;
          draw.preview = e.target.style.backgroundColor;
        } else {
          e.target.style.backgroundColor = draw.styles;
          e.target.style.opacity = 0.5;
        }
      });

    document
      .querySelector('#invader')
      .addEventListener('mouseout', function handleclick(e) {
        if (draw.clicked === true) {
        } else {
          e.target.style.backgroundColor = draw.preview;
          e.target.style.opacity = 1;
        }
      });

    document
      .querySelector('#invader')
      .addEventListener('mousedown', function handleclick(e) {
        draw.clicked = true;
        console.log(draw.clicked);
      });

    document
      .querySelector('#invader')
      .addEventListener('mouseup', function handleclick(e) {
        draw.clicked = false;
        console.log(draw.clicked);
      });
  },
};

draw.drawInit();
