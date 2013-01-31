/**
 * Serves as a data adapter for the list view. Provides two methods:
 *
 * - getLength()
 * - getItems(offset, limit, opt_reverse)
 */
function DataAdapter() {
}

DataAdapter.prototype.getLength = function() {
  return 100000;
};

DataAdapter.prototype.getItems = function(offset, limit, opt_reverse) {
  var out = [];
  for (var i = 0; i < limit; i++) {
    if (opt_reverse) {
      out.push(this._createItem((this.getLength() - offset - 1) - i))
    } else {
      out.push(this._createItem(offset + i));
    }
  }

  return out;
};

DataAdapter.prototype._createItem = function(index) {
  return {
    index: index,
    imageUrl: 'sample.jpg',
    boundingBox: {
      x: (index * 111) % (912 - 160),
      y: (index * 99) % (684 - 120),
      w: 160,
      h: 120
    },
    renderMode: 'frame' // Can also be 'frame'.
  };
};
