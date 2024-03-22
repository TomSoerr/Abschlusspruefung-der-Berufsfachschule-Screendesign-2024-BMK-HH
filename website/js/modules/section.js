import Helper from '../modules/helper.js';

const _ = Helper.create;

/**
 *
 * @param {Array} children - Array of children
 * @param {string} classes - Classes for the section
 */
export default function section(children, classes) {
  return _(
    'section',
    { class: classes ? `tst-section ${classes}` : 'tst-section' },
    [_('div', { class: 'tst-section-inner' }, children)],
  );
}
