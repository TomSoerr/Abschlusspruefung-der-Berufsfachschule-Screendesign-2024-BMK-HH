import Helper from './helper.js';
// import picture from './picture.js';
// import image from './image.js';
// import button from './button.js';

const _ = Helper.create;

const video = _('video', {
  poster: Helper.imgPath('hero.jpeg', true),
  muted: '',
  controlslist: 'nofullscreen nodownload',
  autoplay: '',
  controls: '',
  loop: '',
  playsinline: '',
  disablepictureinpicture: '',
  disableremoteplayback: '',
}, [
  _('source', {
    src: Helper.imgPath('hero.mp4', true),
    type: 'video/mp4',
  }),
]);

/**
 * @param {Object} content
 * @param {string} content.heading - The heading of the hero
 * @param {string} content.text - The text of the hero
 * @param {Object} content.img - The image of the hero
 * @param {string} content.img.src - The source of the image
 * @param {string} content.img.alt - The alt of the image
 * @param {Object} content.button - The button of the hero
 * @param {string} content.button.text - The text of the button
 * @param {string} content.button.href - The link of the button
 */
export default function hero({
  heading = 'undefined',
} = {}) {
  return _('header', { class: 'tst-hero tst-section secondary-2 wide' }, [
    _('div', { class: 'tst-section-inner' }, [
      video,
      _('h1', null, [heading]),
    ]),
  ]);
}
