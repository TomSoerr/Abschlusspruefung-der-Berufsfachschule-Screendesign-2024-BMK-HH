import Helper from './helper.js';
import button from './button.js';
import p from './paragraph.js';
import image from './image.js';
import { category, categoryList } from './categories.js';

const _ = Helper.create;

export default function tourCard({
  name,
  img,
  teaser = '',
  duration,
  age,
  categories = [],
  href,
}) {
  return _('section', { class: 'tst-tour-list-card' }, [
    image({
      src: img.src,
      alt: img.alt,
      hidden: true,
    }),
    _('div', null, [
      _('h2', null, [name]),
      ...p({ text: teaser, teaser: true }),
      _(
        'div',
        { class: 'tst-category-wrapper' },
        categories.map((categoryItem) => category({ c: categoryItem, home: true })),
      ),
      _('p', { class: 'tst-tour-list-duration' }, [duration]),
      _('p', { class: 'tst-tour-list-age' }, [age]),

      button({
        text: 'Mehr erfahren',
        href,
        type: 'link',
      }),
    ]),
  ]);
}
