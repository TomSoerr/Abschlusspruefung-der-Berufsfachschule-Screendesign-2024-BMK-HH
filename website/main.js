import Helper from './js/modules/helper.js';

if (window.location.hostname.match(/github/)) {
  Helper.development = false;
}

/* ______________________________________
initialize Helper class
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
Helper.observer = new MutationObserver(Helper.init);

Helper.observer.observe(document.body, {
  attributes: false,
  childList: true,
  subtree: true,
});

window.addEventListener('resize', Helper.resize);
window.addEventListener('scroll', Helper.scroll);

/* ______________________________________
load js file for html site
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

const siteModule = await import(
  `./js/pages/${Helper.getFileName(window.location.pathname)}.js`
);

siteModule.load();
