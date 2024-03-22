import Helper from './helper.js';
import section from './section.js';
import productCard from './product-card.js';
import button from './button.js';

const _ = Helper.create;

const path = `${Helper.absolutePath(
  window.location.pathname,
  window.location.origin,
)}data/produkte.json`;

const dataJson = await fetch(path, {
  method: 'GET',
  mode: 'cors',
});
const productData = await dataJson.json();

let productSection;

function gridTemplateColumns() {
  productSection.classList.remove('c1', 'c2', 'c3', 'c4');

  const min = 230 * Helper.customFontSizeMultiplier;
  const gap = parseFloat(getComputedStyle(productSection.children[0].children[1].children[0]).getPropertyValue('gap'));

  const sectionWidth = productSection.children[0].children[1].clientWidth;

  let columns = 4;
  for (let i = columns; i > 0; i--) {
    if ((sectionWidth - columns * min - (columns - 1) * gap) >= 0) {
      productSection.classList.add(`c${columns}`);
      break;
    }
    columns--;
  }
}

Helper.addInitFn(() => {
  productSection = document.querySelector('.tst-product-preview');
  gridTemplateColumns();

  window.addEventListener('resize', gridTemplateColumns);
});

export default function productPreview({ classes = '' } = {}) {
  return section(
    [
      _('h2', { text: 'Meine Produkte' }),
      _('div', { class: 'tst-product-preview-outer-wrapper' }, [_('div', { class: 'tst-product-preview-wrapper' }, productData.products.reduce((prev, curr) => {
        prev.push(
          productCard({
            name: curr.name,
            img: { src: curr.image, alt: curr.name },
            price: curr.price,
            description: curr.description,
            variant: curr.variants ? curr.variants : null,
          }),
        );
        return prev;
      }, []))]),

      _('div', { class: 'tst-button-wrapper' }, [button({
        text: 'Kontakt aufnehmen',
        href: 'kontakt.html',
        type: 'link',
      }),
      button({
        text: 'Alle Produkte',
        href: 'produkte.html',
        type: 'link',
      })])],

    (classes) ? `tst-product-preview ${classes}` : 'tst-product-preview',
  );
}
