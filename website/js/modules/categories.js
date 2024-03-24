import Helper from './helper.js';

const _ = Helper.create;

const PAGE_WITH_TOUR_GRID = 'index';

const categoryList = {
  al: 'Alle Angebote',
  kt: 'Kindertour',
  jt: 'Jugendtour',
  be: 'Begleitung Erwachsener',
  in: 'Indoor',
  ou: 'Outdoor',
};

function category({ c, home = false } = {}) {
  let link = '';
  if (home) {
    link = Helper.pathToMain(window.location.pathname);
  }

  if (Helper.getFileName(window.location.pathname) !== PAGE_WITH_TOUR_GRID) {
    link += `${PAGE_WITH_TOUR_GRID}.html`;
  }

  return _('li', null, [_('a', {
    class: 'tst-category-cell',
    text: categoryList[c],
    href: `${link}#touren-hilfe?${c}`,
    data: { category: c },
  })]);
}

function categories() {
  return _('ul', { class: 'tst-category-wrapper' }, Object.keys(categoryList).map((categoryItem) => category({ c: categoryItem })));
}

export { categoryList, categories, category };
