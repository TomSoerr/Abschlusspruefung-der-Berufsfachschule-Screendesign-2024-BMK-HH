import Helper from './helper.js';
import p from './paragraph.js';
import image from './image.js';
import button from './button.js';
import { categoryIcon } from './categories.js';

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

    _('div', { class: 'tst-tour-list-content' }, [
      _('h3', {}, [name]),
      ...p({
        text: teaser,
        teaser: true,
        teaserLink: href,
      }),
      _('div', null, [
        _(
          'ul',
          { class: 'tst-tour-list-info' },
          [

            ...categories.map((categoryItem) => (
              categoryIcon({ c: categoryItem, showLabel: true })
            )),
            _('li', { class: 'tst-tour-list-duration' }, [
              _('img', { src: Helper.imgPath('dauer.svg'), alt: 'Dauer' }),
              _('span', null, [duration]),
            ]),
            _('li', { class: 'tst-tour-list-age' }, [
              _('img', { src: Helper.imgPath('alter.svg'), alt: 'Alter' }),
              _('span', null, [age]),
            ]),

          ],
        ),
        button({
          type: 'link',
          text: 'Mehr erfahren',
          href,
        }),
      ]),
    ]),
  ]);
}
