import Helper from './helper.js';

const _ = Helper.create;

/**
 *
 * @param {Object} content
 * @param {('link' | 'button' | 'submit')} content.type
 * @param {string} content.text
 * @param {string} content.href
 * @param {string=} content.target
 * @param {string=} content.color
 * @param {Object=} content.event
 * @param {string} content.event.type
 * @param {Function} content.event.listener
 * @returns
 */
export default function button({
  text,
  href,
  type,
  target = '',
  event,
  color = 'accent',
}) {
  if (type === 'link') {
    return _('a', {
      href: Helper.relativPath(window.location.pathname, href),
      target,
      text,
      class: `tst-button ${color}`,
    });
  }

  return _(
    'button',
    {
      type,
      text,
      class: `tst-button ${color}`,
    },
    null,
    event ? [event] : null,
  );
}
