import Helper from './helper.js';

const _ = Helper.create;

/**
 * @param {Object} content
 * @param {string} content.src - The source of the image
 * @param {string} content.alt - The alt of the image
 * @returns {HTMLElement}
 */
export default function image({ hidden = false, src = 'undefined', alt = 'undefined' } = {}) {
  return _('img', {
    src: Helper.imgPath(src, hidden),
    alt,
    class: 'tst-img',
  });
}
