/**
 * Knows how to render a single item in the list view.
 */
function SimpleRenderer() {
}

SimpleRenderer.prototype.getHeight = function() {
  return 30;
};

SimpleRenderer.prototype.render = function(data, el) {
  el.classList.add('item');
  el.innerHTML = 'Hello';
}

/**
 * Knows how to render a single item in the list view.
 */
function ImageRenderer() {
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
}

ImageRenderer.prototype.getHeight = function() {
  return 130;
};

ImageRenderer.prototype.render = function(data, el) {
  if (data.renderMode == 'crop') {
    var bb = data.boundingBox;
    var canvas = el.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      el.appendChild(canvas);
    }
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = data.imageUrl;
    img.onload = function() {
      canvas.width = bb.w;
      canvas.height = bb.h;
      ctx.drawImage(img, bb.x, bb.y, bb.w, bb.h, 0, 0, bb.w, bb.h);
      // Draw a number.
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.font = '30pt Verdana';
      ctx.fillText(data.index, 10, 40);
      ctx.strokeText(data.index, 10, 40);
    }
  }
}
