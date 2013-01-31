/**
 * Knows how to render a single item in the list view.
 */
function SimpleRenderer() {
}

SimpleRenderer.prototype.getHeight = function() {
  return 30;
};

SimpleRenderer.prototype.render = function(data) {
  var el = document.createElement('div');
  el.classList.add('item');
  el.innerHTML = 'Hello';
  return el;
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

function FitIntoSquare(  w,  h,  dst_size ) {
  // maintains aspect ratio and fits w x h into dst_size x dst_size
  if(w > h) {
    // fat box
    dst_w = dst_size;
    dst_h = h/(w*1.0) * dst_w;
  } else {
    dst_h = dst_size ;
    dst_w = w/(h*1.0) * dst_h;
  }
  return {w:dst_w, h:dst_h};
}

ImageRenderer.prototype.render = function(data, callback) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = data.imageUrl;
  var bb = data.boundingBox;
  var canvas_size = 160;
  canvas.width = canvas.height = canvas_size;

  img.onload = function() {
    if (data.renderMode == 'crop') {
      var dst = FitIntoSquare(bb.w, bb.h, canvas_size);
      ctx.drawImage(img, bb.x, bb.y, bb.w, bb.h, 0, 0, dst.w, dst.h);
    } else if (data.renderMode == 'frame' ) {
      var dst = FitIntoSquare(img.width, img.height, canvas_size);
      ctx.drawImage(img, 0, 0, dst.w, dst.h);
      var x=dst.w*bb.x/img.width;
      var y=dst.h*bb.y/img.height;
      var w=dst.w*bb.w/img.width;
      var h=dst.h*bb.h/img.height;
      ctx.strokeRect(x,y,w,h);

    }
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '30pt Verdana';
    ctx.fillText(data.index, 10, 40);
    ctx.strokeText(data.index, 10, 40);
    callback(canvas);
  }
}
