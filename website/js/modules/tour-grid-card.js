import Helper from './helper.js';
import button from './button.js';
import image from './image.js';
import { categoryIcon } from './categories.js';

const _ = Helper.create;

export default function tourGridCard({
  name,
  img,
  categories = [],
  href,
}) {
  return _('section', { class: 'tst-tour-card' }, [
    image({
      src: img.src,
      alt: img.alt,
      hidden: true,
    }),
    _('div', null, [
      _('h3', null, [name]),

      _(
        'div',
        { class: 'tst-category-icons' },
        categories.map((categoryItem) => categoryIcon({ c: categoryItem, home: true })),
      ),

      button({
        text: 'Mehr erfahren',
        href,
        type: 'link',
      }),
    ]),
  ]);
}
