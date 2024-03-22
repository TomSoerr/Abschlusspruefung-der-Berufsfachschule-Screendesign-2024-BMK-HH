import Helper from './helper.js';
import section from './section.js';
import picture from './picture.js';
import button from './button.js';
import p from './paragraph.js';

const _ = Helper.create;

/**
 * @param {Object} content
 * @param {string} content.heading - The heading of the section
 * @param {string} content.text - The text of the section
 * @param {Object} content.img - The image of the section
 * @param {string} content.img.src - The source of the image
 * @param {string} content.img.alt - The alt of the image
 * @param {string} content.background - Tag that will be added to the section
 * @param {boolean} content.reverse - If true, the order of the elements will be reversed
 * @param {Object} content.buttonObj - The button of the section
 */
export default function sectionImgText({
  heading = 'undefined',
  text = 'undefined',
  img = { src: 'handseife.jpg', alt: 'Orangene Handseife mit einer Orange als Deko im Hintergrund', hidden: false },
  background,
  reverse,
  buttonObj = '',
} = {}) {
  Helper.pathToMain(img.src);

  let classes = 'tst-section-img-text grid-2';

  if (background) {
    classes = `${classes} ${background}`;
  }

  if (reverse) {
    classes = `${classes} ro`;
  }

  return section(
    [
      _('div', null, [
        _('h2', null, [heading]),
        ...p(text),
        buttonObj ? button(buttonObj) : '',
      ]),

      picture({
        src: img.src,
        alt: img.alt,
        hidden: img.hidden,
      }),
    ],
    classes,
  );
}
