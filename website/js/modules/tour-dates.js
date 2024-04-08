import Helper from './helper.js';
import angebote from '../../data/angebote.js';
import image from './image.js';
import col2 from './col-2.js';

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
// [[{…}, 'Gruseltour mit Nachtwächter', 'gruseltour-mit-nachtwaechter', {…}], ...]
// while the first object is the termine object
let allDatesArr = allDates.map((tour) => [
  tour[1].termine,
  tour[1].name,
  tour[0],
  tour[1].img,
]);

// create an array with objects for each date
// [[{date, name, details, href}], ...]
allDatesArr = allDatesArr.map((tour) => {
  const dates = Object.entries(tour[0]);
  const name = tour[1];
  const href = Helper.relativPath(window.location.pathname, `${tour[2]}.html`);
  const filename = tour[2];
  const img = tour[3];
  return dates.map((date) => ({
    date: date[0],
    name,
    details: date[1],
    href,
    filename,
    img,
  }));
});

// flatten the array so all dates are in one array
// [{date, name, details, href}, ...]
allDatesArr = allDatesArr.reduce((acc, curr) => [...acc, ...curr], []);

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

const tourDateSliderHelper = {
  previousItems: [],
  slider: null,
  sliderLength: 0,

  moveTo: (id) => {
    if (tourDateSliderHelper.previousItems.length === 0) {
      tourDateSliderHelper.previousItems[0] =
        tourDateSliderHelper.slider.querySelectorAll('li.active');
    }

    tourDateSliderHelper.previousItems[0].forEach((item) => {
      item.classList.remove('active');
      item.classList.add('hidden');
    });

    tourDateSliderHelper.previousItems[0] =
      tourDateSliderHelper.slider.querySelectorAll(`li[data-id="${id}"]`);

    tourDateSliderHelper.previousItems[0].forEach((item) => {
      item.classList.remove('hidden');
      item.classList.add('active');
    });
  },

  move: (direction) => {
    if (tourDateSliderHelper.previousItems.length === 0) {
      tourDateSliderHelper.previousItems[0] =
        tourDateSliderHelper.slider.querySelectorAll('li.active');
    }

    tourDateSliderHelper.previousItems[0].forEach((item) => {
      item.classList.remove('active');
      item.classList.add('hidden');
    });

    let { id } = tourDateSliderHelper.previousItems[0][0].dataset;
    const length = tourDateSliderHelper.sliderLength - 1;

    id = +id;

    if (direction === 'up') {
      id = id === 0 ? length : id - 1;
    }

    if (direction === 'down') {
      id = id === length ? 0 : id + 1;
    }

    tourDateSliderHelper.previousItems[0] =
      tourDateSliderHelper.slider.querySelectorAll(`li[data-id="${id}"]`);

    tourDateSliderHelper.previousItems[0].forEach((item) => {
      item.classList.remove('hidden');
      item.classList.add('active');
    });
  },

  cycle: () => {
    if (window.innerWidth > 1024) {
      setInterval(() => {
        if (window.innerWidth > 1024) {
          tourDateSliderHelper.move('right');
        }
      }, 1000);
    }
  },

  event: () => {
    const listener = (e) => {
      if (window.innerWidth > 1024) {
        const { id } =
          e.target.nodeName === 'A'
            ? e.target.parentElement.dataset
            : e.target.parentElement.parentElement.dataset;

        tourDateSliderHelper.moveTo(id);
      }
    };
    return [
      { type: 'mouseover', listener },
      { type: 'focus', listener },
    ];
  },
};

function tourDateSlider({ maxDates = 10, filterBy = null }) {
  const datesList = [];
  const imgList = [];

  filterDates({ maxDates, filterBy }).forEach((date, index) => {
    datesList.push(
      _(
        'li',
        {
          data: { id: index, status: date.details[1] },
          class: index === 0 ? 'active' : 'hidden',
        },
        [
          _(
            'a',
            {
              href: date.href,
            },
            [
              _('strong', { text: date.name, class: 'arrow' }),
              _('span', { text: date.details[0], class: 'tst-date' }),
              _('span', { text: date.details[1], class: 'tst-status' }),
            ],
            tourDateSliderHelper.event(),
          ),
        ],
      ),
    );

    imgList.push(
      _(
        'li',
        {
          data: { id: index, status: date.details[1] },
          class: index === 0 ? 'active' : 'hidden',
        },
        [
          image({
            src: date.img.src,
            alt: date.img.alt,
            hidden: true,
          }),
        ],
      ),
    );
  });

  const slider = col2({
    left: [_('ul', { class: 'tst-tour-dates' }, datesList)],
    right: [
      _('ul', null, [
        ...imgList,
        _('button', { class: 'tst-tour-up' }, null, [
          { type: 'click', listener: () => tourDateSliderHelper.move('up') },
        ]),
        _('button', { class: 'tst-tour-down' }, null, [
          { type: 'click', listener: () => tourDateSliderHelper.move('down') },
        ]),
      ]),
    ],
    htmlClass: 'tst-tour-dates-slider',
  });

  tourDateSliderHelper.slider = slider;
  tourDateSliderHelper.sliderLength = slider.querySelectorAll(
    '.tst-tour-dates [data-id]',
  ).length;

  // tourDateSliderHelper.cycle();

  return slider;
}

function tourDate({ maxDates = 10, filterBy = null } = {}) {
  const datesList = [];

  filterDates({ maxDates, filterBy }).forEach((date, index) => {
    datesList.push(
      _(
        'li',
        {
          data: { status: date.details[1] },
        },
        [
          _(
            'div',
            {
              href: date.href,
            },
            [
              _('strong', { text: date.details[0] }),
              _('span', { text: date.details[1], class: 'tst-status' }),
            ],
          ),
        ],
      ),
    );
  });
  return _('ul', { class: 'tst-tour-dates' }, datesList);
}

export { tourDate, tourDateSlider };
