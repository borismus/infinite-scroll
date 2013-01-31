/**
 * Handles overall rendering of the list view.
 */

function ListView(opts) {
  opts = opts || {};
  this.dataAdapter = opts.dataAdapter || this.error('No data adaptor specified');
  this.el = opts.el || this.error('No root element specified');
  this.itemRenderer = opts.itemRenderer || this.error('No item renderer specified');

  this.isReversed = false;

  this.init();
  this.scheduleRender();

  this.EXTRA_PADDING = 200;
}


/**
 * Called when the view is created the first time.
 */
ListView.prototype.init = function() {
  // Create list content element.
  this.contentEl = document.createElement('div');
  this.contentEl.classList.add('list-content');
  this.el.appendChild(this.contentEl);
  // Create force height element.
  this.forceHeightEl = document.createElement('div');
  this.forceHeightEl.classList.add('list-force-height');
  this.contentEl.appendChild(this.forceHeightEl);
  // Create item container element.
  this.itemsEl = document.createElement('div');
  this.itemsEl.classList.add('list-items');
  this.contentEl.appendChild(this.itemsEl);
  // Setup event listeners for scrolling.
  this.contentEl.addEventListener('scroll', this._onScroll.bind(this));

  // Create the sort order button.
  this.sortButtonEl = document.createElement('button');
  // Setup event listeners for sorting.
  this.sortButtonEl.addEventListener('click', this._onSort.bind(this));
  this.sortButtonEl.innerHTML = 'Sort';
  this.el.appendChild(this.sortButtonEl);

  // Estimate the total height of all of the elements in the list.
  var count = this.dataAdapter.getLength();
  var height = this.itemRenderer.getHeight();
  var totalHeight = count * height;
  // Set the height of the list control.
  this.forceHeightEl.style.height = totalHeight + 'px';
};

/**
 * Render once the list element has a height.
 */
ListView.prototype.scheduleRender = function() {
  this.scheduleRenderTimer = setInterval(function() {
    // Check if the list has a height.
    if (this.el.clientHeight) {
      this.render();
      clearInterval(this.scheduleRenderTimer);
    }
  }.bind(this), 100);
};

/**
 * Called whenever something internal to the list view changed (scroll
 * position or sort order).
 */
ListView.prototype.render = function() {
  // TODO: Be smarter about reusing existing items to prevent flicker.
  this.itemsEl.innerHTML = '';
  // Get the list's current viewport (scrollTop, height).
  var pxOffset = this.contentEl.scrollTop;
  var pxLimit = this.contentEl.offsetHeight + this.EXTRA_PADDING;
  // Convert the viewport to coordinates.
  var itemHeight = this.itemRenderer.getHeight();
  var offset = parseInt(pxOffset / itemHeight);
  var limit = parseInt(pxLimit / itemHeight);
  // Fetch the items and render them.
  var itemData = this.dataAdapter.getItems(offset, limit, this.isReversed);
  for (var i = 0; i < itemData.length; i++) {
    var item = itemData[i];
    var top = (offset + i) * itemHeight;
    (function(top) {
      var el = this.itemRenderer.render(item, function(el) {
        el.style.top = top + 'px';
        this.itemsEl.appendChild(el);
      }.bind(this));
    }.bind(this))(top);
  }
  itemData.forEach(function(item) {}.bind(this));
};

/**
 * Called when something in the data adapter changed, so we need to
 * refetch initial data.
 */
ListView.prototype.dataChanged = function() {
  this.render();
}

/**
 * Handles scroll event on the list element.
 */
ListView.prototype._onScroll = function(e) {
  this.render();
};

/**
 * Handles the sort event on the list element.
 */
ListView.prototype._onSort = function(e) {
  this.isReversed = !this.isReversed;
  this.render();
};
