import angebote from '../../data/angebote.js';

export default class Helper {
  static development = true;

  static imgPath(img, hidden = false, source) {
    function imgSource() {
      if (source) {
        const imgVersion = img.split('.');
        return `${imgVersion[0]}-${source}.${imgVersion[1]}`;
      }
      return img;
    }

    if (hidden && Helper.development) {
      return `${Helper.pathToMain(window.location.pathname)}img-hidden/${imgSource()}`;
    }
    return `${Helper.pathToMain(window.location.pathname)}img/${imgSource()}`;
  }

  /* ______________________________________
  angebote data functions
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  static getAngeboteSubmenu(folder) {
    return Object.entries(angebote[folder]).map(([key, value]) => ({
      text: value.name,
      href: `${key}.html`,
    }));
  }

  /* ______________________________________
  Image path
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  /* ______________________________________
  Site structure
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
  static navItems = {
    logo: { src: 'logo.svg', alt: 'Logo', srcset: 'logo-mobile.svg' },
    navigation: [
      {
        parent: 'Kinder & Familien',
        folder: 'touren-fuer-kinder-und-familien',
        text: 'Alle Touren für Kinder & Familien',
        unterpunkte: Helper.getAngeboteSubmenu('touren-fuer-kinder-und-familien'),
      },
      {
        parent: 'Jugendliche',
        folder: 'touren-fuer-jugendliche',
        text: 'Alle Touren für Jugendliche',
        unterpunkte: Helper.getAngeboteSubmenu('touren-fuer-jugendliche'),
      },
      {
        parent: 'Kindergeburtstage',
        folder: 'kindergeburtstage',
        text: 'Alle Kindergeburtstage',
        unterpunkte: Helper.getAngeboteSubmenu('kindergeburtstage'),
      },
      { text: 'Buchung', href: 'buchung.html' },
    ],
  };

  /* ______________________________________
  Set fontFaceSet
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  static fontFaceSet;

  /* ______________________________________
  Functions for removing preload class on hover links
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  static removeAfterLoad(element, singleUseEventFn) {
    element.classList.remove('tst-preload');
    element.removeEventListener('mouseover', singleUseEventFn);
    element.removeEventListener('focusin', singleUseEventFn);
  }

  static getLiElement(target) {
    if (target.tagName === 'A') {
      return target.parentElement;
    }
    if (target.tagName === 'LI') {
      return target;
    }
    console.error('Invalid target');
  }

  static singleUseEvent(event, mode) {
    const element =
      mode === 'prevent' ? event.target : Helper.getLiElement(event.target);
    Helper.removeAfterLoad(element, Helper.singleUseEvent);
    event.stopPropagation();
  }

  /* ______________________________________
  Functions to get path to produkte.js, pages/*.js, subfolder/*.html, img/*,
  index.html and from subpage to other subpage
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  static getFileName(pathname) {
    const fileNameRegEx = /[^/]+(?=\.html)/;
    let fileName = pathname.match(fileNameRegEx);

    if (fileName === null) {
      fileName = 'index';
    } else {
      fileName = fileName[0];
    }

    return fileName;
  }

  static getAllSubFolders() {
    const folders = [];
    Helper.navItems.navigation.forEach((item) => {
      if (item.folder) folders.push(item.folder);
    });
    return folders;
  }

  static folderExists(folder) {
    return Helper.getAllSubFolders().includes(folder);
  }

  static getFolderPath(pathname) {
    const path = pathname;

    if (path === '/' || path === '/index.html' || path === '/index') {
      return null;
    }

    const pathWithoutFileRegEx = /.*\//;
    const lastFolderRegEx = /[^\/]*(?=\/$)/;

    const pathWithoutFile = path.match(pathWithoutFileRegEx);

    if (pathWithoutFile) {
      const lastFolder = pathWithoutFile[0].match(lastFolderRegEx)[0];

      if (Helper.folderExists(lastFolder)) {
        return lastFolder;
      }
    }
    return null;
  }

  // input should be window.location.pathname
  static pathToMain(pathname) {
    const path = pathname;

    if (Helper.getFolderPath(path)) {
      return '../';
    }
    return '';
  }

  static getFolderData(fileName) {
    const subNav = Helper.navItems.navigation.filter((item) => item.folder);
    const folder = subNav.find((item) => {
      // folderObj is undefined if filename is not in the folder
      const folderObj = item.unterpunkte.find(
        (pages) => pages.href === fileName,
      );
      return folderObj;
    });

    if (!folder) return null;
    return folder.folder;
  }

  static checkIfNotSubpage(fileName) {
    const notSubNav = Helper.navItems.navigation.filter((item) => fileName === `${item.folder}.html` || !item.folder);
    return notSubNav.find((item) => item.href === fileName || `${item.folder}.html` === fileName);
  }

  static relativPath(from, to) {
    const relativePath = Helper.pathToMain(from);

    if (Helper.getFolderPath(from) === Helper.getFolderData(to)) {
      return to;
    }

    if (Helper.checkIfNotSubpage(to)) {
      return `${relativePath}${to}`;
    }

    return `${relativePath}${Helper.getFolderData(to)}/${to}`;
  }

  static absolutePath(pathname, origin) {
    const pathWithoutFileRegEx = /.*\//;
    const PathWithoutLastFolder = /.*\/(?=\w*\/)/;

    const pathWithoutFile = pathname.match(pathWithoutFileRegEx);

    if (pathWithoutFile[0] === '/') {
      return `${origin}/`;
    }

    if (Helper.getFolderPath(pathname)) {
      return `${origin}${pathname.match(PathWithoutLastFolder)}`;
    }

    return `${origin}${pathWithoutFile}`;
  }

  /* ______________________________________
  Functions that will load if the dom changes
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
  static customFontSizeMultiplier;

  static initFn = [];

  static addInitFn(fn) {
    Helper.initFn.push(fn);
  }

  static init() {
    // called when the js created content is added to the dom
    Promise.resolve().then(() => {
      // Init stuff before external function are called

      Helper.customFontSizeMultiplier =
        parseFloat(
          getComputedStyle(
            document.querySelector('#tst-site-nav .tst-section-inner'),
          ).getPropertyValue('gap'),
        ) /
        (parseFloat(
          getComputedStyle(document.body).getPropertyValue('--tst-nav-gap-x'),
        ) *
          10);

      // external functions
      if (Helper.initFn) Helper.initFn.forEach((fn) => fn());
      // maybe remove all functions after inital load
      Helper.initFn = null;
    });
  }

  /* ______________________________________
  Function that will load if user scrolls
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
  static scrollFn = [];

  static addScrollFn(fn) {
    Helper.scrollFn.push(fn);
  }

  static removeScrollFn(fn) {
    Helper.scrollFn = Helper.scrollFn.filter((f) => f !== fn);
  }

  static scroll(event) {
    if (Helper.scrollFn) Helper.scrollFn.forEach((fn) => fn(event));
  }

  /* ______________________________________
  Function to build HTML Elements
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
  static elements = {};

  /**
   * @param {string} el - The element to create
   * @param {Object} elAtt - Attributes for the element
   * @param {array} elChildren - Children of the element
   * @param {Array} elEvent - Object inside an Array containing a type and a listener.
   */
  static create(el, elAtt, elChildren, elEvent) {
    if (!Helper.elements[el]) {
      Helper.elements[el] = document.createElement(el);
    }

    const newEl = Helper.elements[el].cloneNode(true);

    if (elAtt) {
      Object.entries(elAtt).forEach(([key, value]) => {
        if (key === 'class') {
          value.split(' ').forEach((className) => {
            newEl.classList.add(className);
          });
        } else if (key === 'text') {
          newEl.textContent = value;
        } else if (key === 'data') {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            newEl.dataset[dataKey] = dataValue;
          });
        } else {
          newEl.setAttribute(key, value);
        }
      });
    }
    if (elChildren) {
      const truthyChildren = elChildren.filter((child) => child);
      newEl.append(...truthyChildren);
    }

    if (elEvent) {
      elEvent.forEach((event) => {
        if (event) newEl.addEventListener(event.type, event.listener);
      });
    }

    return newEl;
  }
}
