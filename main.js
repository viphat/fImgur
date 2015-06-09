$(document).ready(function(){

  // Authorization: Client-ID 1c2773cd677b6df
  if (localStorage.imgur_link !== undefined && localStorage.imgur_link != "") {
    $('#link_holder').val(localStorage.imgur_link);
  }

});

function copy() {
  //Get Input Element
  document.getElementById('link_holder').select();

  //Select all content
  // document.execCommand('SelectAll');
  //Copy Content
  document.execCommand("Copy", false, null);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("copy-btn").onclick = copy;
});