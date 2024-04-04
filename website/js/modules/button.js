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
  type = 'link',
  target = '',
  event,
  color = null,
  home = false,
}) {
  if (type === 'link') {
    const link = home
      ? `${Helper.pathToMain(window.location.pathname, href)}${href}`
      : Helper.relativPath(window.location.pathname, href);
    return _('a', {
      href: link,
      target,
      text,
      class: color ? `tst-button ${color}` : 'tst-button',
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
