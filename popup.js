var popupWindow = window.open(
    chrome.extension.getURL("index.html"),
    "fImgUr",
    "width=320,height=400"
  );
window.close();