import Helper from './helper.js';
import angebote from '../../data/angebote.js';

const _ = Helper.create;
const allDates = [];

// get all objects with termine
// [['gruseltour-mit-nachtwaechter', {…}], ...]
// while the last object is the tour object
Object.entries(angebote).forEach((type) => {
  Object.entries(type[1]).forEach((tour) => {
    if (tour[1].termine) {
      allDates.push(tour);
    }
  });
});

// create an array with only the termine object,
// the name of the tour, and the filename
// [[{…}, 'Gruseltour mit Nachtwächter', 'gruseltour-mit-nachtwaechter'], ...]
// while the first object is the termine object
let allDatesArr = allDates
  .map((tour) => [tour[1].termine, tour[1].name, tour[0]]);

// create an array with objects for each date
// [[{date, name, details, href}], ...]
allDatesArr = allDatesArr.map((tour) => {
  const dates = Object.entries(tour[0]);
  const name = tour[1];
  const href = Helper.relativPath(window.location.pathname, `${tour[2]}.html`);
  const filename = tour[2];
  return dates.map((date) => ({
    date: date[0], name, details: date[1], href, filename,
  }));
});

// flatten the array so all dates are in one array
// [{date, name, details, href}, ...]
allDatesArr = allDatesArr.reduce((acc, curr) => ([...acc, ...curr]), []);

// sort the array by date
allDatesArr = allDatesArr.sort((a, b) => a.date.localeCompare(b.date));

/**
 * @param {Object} param0 - Object with the maxDates and filterBy properties
 */
function filterDates({ maxDates, filterBy }) {
  allDatesArr = allDatesArr.slice(0, maxDates);

  if (filterBy) {
    allDatesArr = allDatesArr.filter((date) => date.filename === filterBy);
  }

  return allDatesArr;
}

export default function tourDate({ maxDates = 10, filterBy = null, noLink = false } = {}) {
  return (
    _('h2', { text: 'Die nächsten Termine' }),
    _('div', { class: 'tst-tour-dates' }),
    _('ul', null, filterDates({ maxDates, filterBy }).map((date) => _('li', null, [_((noLink) ? 'span' : 'a', { href: date.href, text: `${date.name} (${date.details.join(', ')})` })])))
  );
}
