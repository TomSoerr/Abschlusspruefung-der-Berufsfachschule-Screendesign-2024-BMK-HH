import Helper from './helper.js';

const _ = Helper.create;

/**
 * @param {Object} content
 * @param {string} content.src - The source of the image
 * @param {string} content.alt - The alt of the image
 * @param {boolean} content.caption - If the image should have a caption
 * @returns {HTMLElement}
 */
export default function picture({
  hidden = false, src = 'undefined', alt = 'undefined', caption = false,
} = {}) {
  return _('figure', { class: 'tst-picture-wrapper' }, [
    _('picture', { class: 'tst-picture' }, [
      _('source', {
        media: '(min-width: 769px)',
        srcset: Helper.imgPath(src, hidden)
        ,
      }),

      _('source', {
        media: '(min-width: 481px)',
        srcset: Helper.imgPath(src, hidden, 'medium')
        ,
      }),

      _('source', {
        media: '(max-width: 480px)',
        srcset: Helper.imgPath(src, hidden, 'small')
        ,
      }),

      _('img', {
        src: Helper.imgPath(src, hidden),
        alt,
      }),

    ]),
    caption ? _('figcaption', null, caption) : '',
  ]);
}
