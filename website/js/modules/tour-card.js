import Helper from './helper.js';
import button from './button.js';
import image from './image.js';

const _ = Helper.create;

export default function tourCard({
  name,
  img,
  teaser,
  duration,
  age,
  categories,
  href,
}) {
  return _('section', { class: 'tst-tour-card' }, [
    image({
      src: img.src,
      alt: img.alt,
      hidden: true,
    }),
    _('div', null, [
      _('h2', null, [name]),
      _('p', { class: 'tst-tour-teaser' }, [teaser]),
      button({
        text: 'Mehr erfahren',
        href,
        type: 'link',
      }),
      _('p', { class: 'tst-tour-duration' }, [duration]),
      _('p', { class: 'tst-tour-age' }, [age]),
      _('p', { class: 'tst-tour-categories' }, [categories.join(', ')]),

    ]),
  ]);
}
