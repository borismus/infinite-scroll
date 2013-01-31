var adapter = new DataAdapter();
var renderer = new ImageRenderer();
var items = ['list_tp', 'list_fp', 'list_fn', 'list_tn'] ;
for( var i=0; i<items.length; ++i  ) {
  console.log(i);
  var el = document.querySelector('#'+items[i]);
  var list = new ListView({
    dataAdapter: adapter,
    itemRenderer: renderer,
    el: el
  });
}

