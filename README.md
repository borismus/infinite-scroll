# Long List

A UI control for a long list of things, powered by a data adapter that
supports two methods:

    adapter.getLength();
    adapter.getItems(offset, limit);

The UI control also relies on an ItemRenderer to render each item in the
list. This objects knows how to render elements, and get their heights.

    // Estimate how tall each row will be.
    renderer.getHeight();
    // Render the item data into an element. Calls callback when done.
    renderer.render(data, callback);

To create the list view component, do this:

    // Define the data adapter that implements the above two methods.
    var da = ...;
    var el = document.querySelector('#list');
    var renderer = new ItemRenderer();
    var lv = new ListView({
      dataAdapter: da,
      itemRenderer: renderer,
      el: el
    });

If the data in the adapter changes, notify the list view component as
follows:

    list.dataChanged();

This will force the list to re-fetch the data for the list's current
position.

The list itself will render a sortable button and a scrollbar and call
the data adapter as needed.
