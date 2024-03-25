import Helper from './helper.js';
import section from './section.js';
import angebote from '../../data/angebote.js';

const _ = Helper.create;
const allDates = [];
const MAX_DATES = 6;

Object.entries(angebote).forEach((type) => {
  Object.entries(type[1]).forEach((tour) => {
    if (tour[1].termine) {
      allDates.push(tour);
    }
  });
});

let allDatesArr = allDates
  .map((tour) => [tour[1].termine, tour[1].name, tour[0]]);

allDatesArr = allDatesArr.map((tour) => {
  const dates = Object.entries(tour[0]);
  const name = tour[1];
  const href = Helper.relativPath(window.location.pathname, `${tour[2]}.html`);
  return dates.map((date) => ({
    date: date[0], name, details: date[1], href,
  }));
});

allDatesArr = allDatesArr.reduce((acc, curr) => ([...acc, ...curr]), []);

allDatesArr = allDatesArr.sort((a, b) => a.date.localeCompare(b.date));

allDatesArr = allDatesArr.slice(0, MAX_DATES);

export default function tourDate() {
  return (
    section([
      _('h2', { text: 'Die nächsten Termine' }),
      _('div', { class: 'tst-tour-dates' }),
      _('ul', null, allDatesArr.map((date) => _('li', null, [_('a', { href: date.href, text: `${date.name} (${date.details.join(', ')})` })]))),
    ])
  );
}
