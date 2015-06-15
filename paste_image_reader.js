// Created by STRd6
// MIT License
// jquery.paste_image_reader.js
(function($) {
  var defaults;
  $.event.fix = (function(originalFix) {
    return function(event) {
      event = originalFix.apply(this, arguments);
      if (event.type.indexOf('copy') === 0 || event.type.indexOf('paste') === 0) {
        event.clipboardData = event.originalEvent.clipboardData;
      }
      return event;
    };
  })($.event.fix);
  defaults = {
    callback: $.noop,
    matchType: /image.*/
  };
  return $.fn.pasteImageReader = function(options) {
    if (typeof options === "function") {
      options = {
        callback: options
      };
    }
    options = $.extend({}, defaults, options);
    return this.each(function() {
      var $this, element;
      element = this;
      $this = $(this);
      return $this.bind('paste', function(event) {
        var clipboardData, found;
        found = false;
        clipboardData = event.clipboardData;
        return Array.prototype.forEach.call(clipboardData.types, function(type, i) {
          var file, reader;
          if (found) {
            return;
          }
          if (type.match(options.matchType) || clipboardData.items[i].type.match(options.matchType)) {
            file = clipboardData.items[i].getAsFile();
            reader = new FileReader();
            reader.onload = function(evt) {
              return options.callback.call(element, {
                dataURL: evt.target.result,
                event: evt,
                file: file,
                name: file.name
              });
            };
            reader.readAsDataURL(file);
            return found = true;
          }
        });
      });
    });
  };
})(jQuery);


$("html").pasteImageReader(function(results) {
  var dataURL, filename;
  filename = results.filename, dataURL = results.dataURL;
  dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  $('#loading').removeClass('hidden');
  $('#link_holder').addClass('hidden');

  $.ajax({
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': 'Client-ID 1c2773cd677b6df'
    },
    type: 'POST',
    data: {
      'image': dataURL
    },
    success: function(result) {
      $('#link_holder').val(result.data.link);
      $('#link_holder').removeClass('hidden');
      $('#loading').addClass('hidden');
      localStorage.imgur_link = result.data.link;
      var img = document.createElement('img');
      img.className = 'thumb';
      img.src= result.data.link;
      $('#inner').html(img);
    }
  });

});