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

function getLink(home) {
  let link = '';
  if (home) {
    link = Helper.pathToMain(window.location.pathname);
  }

  if (Helper.getFileName(window.location.pathname) !== PAGE_WITH_TOUR_GRID) {
    link += `${PAGE_WITH_TOUR_GRID}.html`;
  }

  return link;
}

function categoryIcon({ c, home = false } = {}) {
  const link = getLink(home);

  return _('li', null, [
    _('a', {
      class: 'tst-category-icon',
      href: `${link}#touren-hilfe?${c}`,
      data: { category: c, title: categoryList[c] },
    }, [
      _('img', {
        src: Helper.imgPath(`${c}.svg`),
        alt: categoryList[c],
      }),
    ]),
  ]);
}

function category({ c, home = false } = {}) {
  const link = getLink(home);

  return _('li', null, [_('a', {
    class: 'tst-category-cell',
    text: categoryList[c],
    href: `${link}#touren-hilfe?${c}`,
    data: { category: c },
  })]);
}

export { categoryList, category, categoryIcon };
