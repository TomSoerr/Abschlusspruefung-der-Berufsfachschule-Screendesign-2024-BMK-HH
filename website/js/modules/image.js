import Helper from './helper.js';

const _ = Helper.create;

function injectImageSize(src, size) {
  if (!size) {
    return src;
  }

  const [name, ext] = src.split('.');
  return `${name}-${size}.${ext}`;
}

/**
 * @param {Object} content
 * @param {string} content.src - The source of the image
 * @param {string} content.alt - The alt of the image
 * @param {boolean} content.hidden - The hidden state of the image
 * @returns {HTMLElement}
 */
export default function image({
  hidden = false,
  src = 'undefined',
  alt = 'undefined',
  size = null,
} = {}) {
  return _('img', {
    src: injectImageSize(Helper.imgPath(src, hidden), size),
    alt,
    class: 'tst-img',
  });
}
