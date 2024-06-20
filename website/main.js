import Helper from './js/modules/helper.js';

// if (window.location.hostname.match(/github/)) {
//   Helper.development = false;
// }

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
load js file when for html site
¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

// this is extremely poor. I know that all my files are accessible
// The reason for this is that no one would think this is a real website
// In this case i would need a Impressum
// async function generateHash(data) {
//   const dataBuffer = new TextEncoder().encode(data);

//   const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray
//     .map((byte) => byte.toString(16).padStart(2, '0'))
//     .join('');

//   return hashHex;
// }

// const hash = 'bb1965f98f1bc8db46b2d93ff372c68f2d798cb68c93ab2bdfb9d118bcf0ad8a';

// // check local storage
// let userInput = localStorage.getItem('passwd');

// // check url hash for password
// if (window.location.hash) {
//   if (window.location.hash.match(/#pw=/)) {
//     userInput = window.location.hash.replace('#pw=', '');
//   }
// }

// if (userInput === null) {
//   userInput = window.prompt('Password eingeben:');
// }

// generateHash(userInput)
//   .then(async (userHash) => {
//     if (hash === userHash) {
//       localStorage.setItem('passwd', userInput);

//       const siteModule = await import(
//         `./js/pages/${Helper.getFileName(window.location.pathname)}.js`
//       );

//       siteModule.load();
//     } else {
//       console.error('Wrong password');
//     }
//   })
//   .catch((error) => console.error('Error generating hash:', error));

const siteModule = await import(
  `./js/pages/${Helper.getFileName(window.location.pathname)}.js`
);

siteModule.load();
