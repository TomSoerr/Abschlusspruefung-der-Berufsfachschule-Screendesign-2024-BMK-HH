import Helper from './helper.js';
import section from './section.js';
import tourCard from './tour-card.js';
import { categoryList, category } from './categories.js';
import angebote from '../../data/angebote.js';

const _ = Helper.create;

const tourGridContainer = _('div', { class: 'tst-tour-grid' });
const categoriesNavContainer = _('div', null, [
  _(
    'ul',
    { class: 'tst-category-wrapper' },
    Object.keys(categoryList).map((categoryItem) => category({ c: categoryItem })),
  ),
]);

// get all tours with a "kategorie" key
function getAllTours() {
  const allTours = [];

  Object.entries(angebote).forEach((type) => {
    Object.entries(type[1]).forEach((tour) => {
      if (tour[1].kategorien) {
        allTours.push(tour);
      }
    });
  });

  return allTours;
}

function buildTourGrid(tours) {
  return tours.map((curr) => tourCard({
    img: curr[1].img,
    name: curr[1].name,
    duration: curr[1].dauer,
    age: curr[1].alter,
    categories: curr[1].kategorien,
    href: `${curr[0]}.html`,
  }));
}

function displayTours({ category }) {
  // remove all children from the tour grid container
  while (tourGridContainer.firstChild) {
    tourGridContainer.removeChild(tourGridContainer.lastChild);
  }

  const filteredTours = getAllTours().filter(
    (tour) => tour[1].kategorien.includes(category) || category === 'al',
  );

  tourGridContainer.append(...buildTourGrid(filteredTours));

  if (filteredTours.length === 0) {
    tourGridContainer.append(_('p', { text: 'Keine passenden Touren gefunden' }));
  }
}

// default init

Helper.addInitFn(() => {
  const [tag, hash] = window.location.hash.split('?');
  if (tag === '#touren-hilfe') {
    document.querySelector('#touren-hilfe').scrollIntoView();
    if (hash) {
      displayTours({ category: hash });
      categoriesNavContainer.dataset.category = hash;
    }
  }
});

displayTours({ category: 'al' });
categoriesNavContainer.dataset.category = 'al';

window.addEventListener('hashchange', () => {
  const [tag, hash] = window.location.hash.split('?');
  if (tag === '#touren-hilfe') {
    if (hash) {
      displayTours({ category: hash });
      categoriesNavContainer.dataset.category = hash;
    } else {
      displayTours({ category: 'al' });
      categoriesNavContainer.dataset.category = 'al';
    }
  }
});

export default function tourGrid({ classes = '' } = {}) {
  return section(
    [
      _('h2', { text: 'Unsere Angebote nach Kategorien', id: 'touren-hilfe' }),
      categoriesNavContainer,
      tourGridContainer,
    ],
    (classes) ? `tst-tour-preview ${classes}` : 'tst-tour-preview',
  );
}
