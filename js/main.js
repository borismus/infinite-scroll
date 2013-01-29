var adapter = new DataAdapter();
var renderer = new ImageRenderer();
var el = document.querySelector('#list');

var list = new ListView({
  dataAdapter: adapter,
  itemRenderer: renderer,
  el: el
});
