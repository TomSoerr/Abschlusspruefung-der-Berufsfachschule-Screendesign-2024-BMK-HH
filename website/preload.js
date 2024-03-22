const link = document.createElement('link');

function addPreload(filename) {
  // clone the link element
  const preloadLink = link.cloneNode(true);
  preloadLink.href = filename;
  preloadLink.rel = 'modulepreload';
  document.head.appendChild(preloadLink);
}

function getFileName(pathname) {
  const fileNameRegEx = /[^/]+(?=\.html)/;
  let fileName = pathname.match(fileNameRegEx);

  if (fileName === null) {
    fileName = 'index';
  } else {
    fileName = fileName[0];
  }

  return fileName;
}

addPreload(`./js/pages/${getFileName(window.location.pathname)}.js`);
