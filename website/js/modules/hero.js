import Helper from './helper.js';
import picture from './picture.js';
import col2 from './col-2.js';

const _ = Helper.create;

function heroInit() {
  // add resize event listener
}

Helper.addInitFn(heroInit);

/**
 * @param {Object} content
 * @param {string} content.heading - The heading of the hero
 * @param {Object} content.img - The image of the hero
 * @param {string} content.img.src - The source of the image
 * @param {string} content.img.alt - The alt of the image
 */
export default function hero({
  img,
  heading,
  content = [],
  contentAppend = [],
  small = false,
} = {}) {
  return _('header', { class: `tst-hero tst-section${small ? ' sub' : ''}` }, [
    _('div', { class: 'tst-section-inner' }, [
      col2({
        left: [_('h1', null, [heading]), ...content],
        right: [picture({ hidden: true, src: img.src, alt: img.alt })],
      }),
      ...contentAppend,
    ]),
  ]);
}
