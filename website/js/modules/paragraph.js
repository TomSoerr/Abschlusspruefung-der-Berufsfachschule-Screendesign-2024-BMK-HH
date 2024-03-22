import Helper from './helper.js';

const _ = Helper.create;

/**
 *
 * @param {string} text
 * @returns {Array}
 */
export default function p(text) {
  const textArray = text.split('<br>').map((str) => str.trim());
  const pragraphs = textArray.reduce((prev, curr) => {
    prev.push(_('p', { text: curr, class: 'tst-paragraph' }));
    return prev;
  }, []);

  return pragraphs;
}
