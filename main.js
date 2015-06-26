$(document).ready(function(){

  if (localStorage.imgur_link !== undefined && localStorage.imgur_link != "") {
    $('#link_holder').val(localStorage.imgur_link);
  }

    var holder = document.getElementById('placeholder'),
      tests = {
        filereader: typeof FileReader != 'undefined',
        dnd: 'draggable' in document.createElement('span'),
        formdata: !!window.FormData,
        progress: "upload" in new XMLHttpRequest
      },

      acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      },

      fileupload = document.getElementById('upload');

  function previewfile(file) {
    if (tests.filereader === true && acceptedTypes[file.type] === true) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var image = new Image();
        image.className = 'thumb';
        image.src = event.target.result;
        // image.width = 250; // a fake resize
        $('#inner').html(image);
      };
      reader.readAsDataURL(file);
    }  else {
      holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
    }
  }

  function readfiles(files) {
      var formData = tests.formdata ? new FormData() : null;
      for (var i = 0; i < files.length; i++) {
        if (tests.formdata) formData.append('image', files[i]);
        previewfile(files[i]);
      }

      // now post a new XHR request
      if (tests.formdata) {
        // $('#link_holder').val('Uploading...');
        $('#loading').removeClass('hidden');
        $('#link_holder').addClass('hidden');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.onload = function() {

          result_link = JSON.parse(xhr.responseText).data.link;
          $('#link_holder').val(result_link);
          localStorage.imgur_link = result_link;
          $('#link_holder').removeClass('hidden');
          $('#loading').addClass('hidden');

        };
        xhr.setRequestHeader('Authorization', 'Client-ID 1c2773cd677b6df');
        xhr.send(formData);
      }

  }

  if (tests.dnd) {
    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
      this.className = '';
      e.preventDefault();
      readfiles(e.dataTransfer.files);
    };
    fileupload.querySelector('input').onchange = function () {
      readfiles(this.files);
    };
  } else {
    fileupload.className = 'hidden';
    fileupload.querySelector('input').onchange = function () {
      readfiles(this.files);
    };
  }

});

function copy() {
  document.getElementById('link_holder').select();
  document.execCommand("Copy", false, null);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("copy-btn").onclick = copy;
});