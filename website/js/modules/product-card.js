import Helper from './helper.js';
import button from './button.js';
import image from './image.js';

const _ = Helper.create;

export default function productCard({
  name,
  img,
  price,
  description,
  variant,
}) {
  return _('section', { class: 'tst-product-card' }, [
    image({
      src: img.src,
      alt: img.alt,
      hidden: true,
    }),
    _('div', null, [
      _('h2', null, [name]),
      _('p', { class: 'tst-product-price' }, [price]),

      button({
        type: 'link',
        text: 'Details',
        color: 'secondary',
      }),
    ]),
  ]);
}
