import Helper from './helper.js';

const _ = Helper.create;

/**
  * Create paragraphs from text string
  * @param {Object} param0 - Object with text, teaser, htmlClass, teaserLink
  * @param {string} text - Text string
  * @param {boolean} teaser - If the text should be as long as a teaser
  * @param {string} htmlClass - Class for the paragraph
  * @param {string} teaserLink - Link for the teaser
  * @returns {Array}
  */
export default function p({
  text, teaser, htmlClass, teaserLink = null,
} = {}) {
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

  if (teaser && teaserLink) {
    paragraphs[paragraphs.length - 1].append('... ', _('a', {
      class: 'tst-read-more',
      text: 'Weiterlesen',
      href: Helper.relativPath(window.location.pathname, teaserLink),
    }));
  }

  return paragraphs;
}
