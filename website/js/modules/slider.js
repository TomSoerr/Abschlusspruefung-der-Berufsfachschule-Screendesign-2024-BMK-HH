import Helper from './helper.js';
import section from './section.js';
import tourCard from './tour-card.js';
import angebote from '../../data/angebote.js';

const _ = Helper.create;

let tourSection;

function gridTemplateColumns() {
  tourSection.classList.remove('c1', 'c2', 'c3', 'c4');

  const min = 300 * Helper.customFontSizeMultiplier;
  const gap = parseFloat(getComputedStyle(tourSection.children[0].children[1].children[0]).getPropertyValue('gap'));

  const sectionWidth = tourSection.children[0].children[1].clientWidth;

  let columns = 4;
  for (let i = columns; i > 0; i--) {
    if ((sectionWidth - columns * min - (columns - 1) * gap) >= 0) {
      tourSection.classList.add(`c${columns}`);
      break;
    }
    columns--;
  }
}

Helper.addInitFn(() => {
  tourSection = document.querySelector('.tst-tour-preview');
  gridTemplateColumns();

  window.addEventListener('resize', gridTemplateColumns);
});

export default function productPreview({ type = 'touren-fuer-kinder-und-familien', classes = '' } = {}) {
  return section(
    [
      _('h2', { text: 'Unsere Touren' }),
      _('div', { class: 'tst-tour-preview-outer-wrapper' }, [
        _('div', { class: 'tst-tour-preview-wrapper' }, Object.entries(angebote[type]).reduce((prev, curr) => {
          prev.push(
            tourCard({
              img: curr[1].img,
              name: curr[1].name,
              teaser: curr[1].text,
              duration: curr[1].dauer,
              age: curr[1].alter,
              categories: curr[1].kategorien,
              href: `${curr[0]}.html`,
            }),
          );
          return prev;
        }, []))]),

    ],

    (classes) ? `tst-tour-preview ${classes}` : 'tst-tour-preview',
  );
}
