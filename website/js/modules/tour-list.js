import Helper from './helper.js';
import section from './section.js';
import tourListCard from './tour-list-card.js';
import angebote from '../../data/angebote.js';

const _ = Helper.create;

export default function productPreview({ type = 'touren-fuer-kinder-und-familien', classes = '' } = {}) {
  return section(
    [
      _('h2', { text: 'Unsere Touren' }),

      _('div', { class: 'tst-tour-list' }, Object.entries(angebote[type]).reduce((prev, curr) => {
        prev.push(
          tourListCard({
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
      }, [])),

    ],

    (classes) ? `tst-tour-preview ${classes}` : 'tst-tour-preview',
  );
}
