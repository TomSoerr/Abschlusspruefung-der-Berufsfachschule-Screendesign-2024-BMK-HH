import Helper from './helper.js';

const _ = Helper.create;

/**
 *
 * @param {string} text
 * @returns {Array}
 */
export default function p({ text, teaser, htmlClass }) {
  function applyFormatting(ctn, separator, tag, subTag = null) {
    return ctn.map((e) => {
      if (typeof e === 'string') {
        return e.split(separator).map((str, index) => {
          if (index % 2 === 0) {
            return str;
          }

          if (subTag) {
            return _(tag, null, [_(subTag, { text: str })]);
          }
          return _(tag, { text: str });
        });
      }
      return e;
    }).flat();
  }

  let paragraphs = [];
  let textString = text;

  const classes = (htmlClass) ? `tst-paragraph${htmlClass}` : 'tst-paragraph';

  if (teaser) {
    [textString] = textString.split('<teaser>');
  } else {
    textString = textString.replace('<teaser>', '');
  }

  paragraphs = textString.split('<br>').map((str) => str.trim());

  paragraphs = paragraphs.map((string) => {
    let content = [string];

    content = applyFormatting(content, '***', 'strong', 'em');
    content = applyFormatting(content, '**', 'strong');
    content = applyFormatting(content, '*', 'em');

    return _('p', { class: classes }, content);
  });

  return paragraphs;
}
