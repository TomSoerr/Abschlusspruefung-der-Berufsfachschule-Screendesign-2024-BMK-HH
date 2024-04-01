import Helper from './helper.js';

const _ = Helper.create;

/**
 * @param {Object} content
 * @param {string} content.src - The source of the image
 * @param {string} content.alt - The alt of the image
 * @param {boolean} content.hidden - The hidden state of the image
 * @param {string} content.CssClass - The class of the image
 * @returns {HTMLElement}
 */
export default function image({
  hidden = false, src = 'undefined', alt = 'undefined', CssClass = '',
} = {}) {
  return _('img', {
    src: Helper.imgPath(src, hidden),
    alt,
    class: (!CssClass) ? 'tst-img' : `tst-img ${CssClass}`,
  });
}
