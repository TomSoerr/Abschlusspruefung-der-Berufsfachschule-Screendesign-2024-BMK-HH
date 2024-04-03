import Helper from './helper.js';

const _ = Helper.create;

let tourSection;
const THRESHOLD = 20;

function gridTemplateColumns() {
  tourSection.classList.remove('c1', 'c2', 'c3', 'c4');

  const min = 300 * Helper.customFontSizeMultiplier;

  const gap = parseFloat(getComputedStyle(tourSection.children[0]).getPropertyValue('gap'));

  const sectionWidth = tourSection.clientWidth;

  let columns = 4;
  for (let i = columns; i > 0; i--) {
    if ((sectionWidth - columns * min - (columns - 1) * gap) >= 0) {
      tourSection.classList.add(`c${columns}`);
      break;
    }
    columns--;
  }
}

function checkIfButtonShown() {
  function checkThreshold(position) {
    return Math.abs(position) < THRESHOLD;
  }

  if (checkThreshold(tourSection.scrollLeft)) {
    tourSection.parentElement.classList.add('tst-hide-prev');
  } else {
    tourSection.parentElement.classList.remove('tst-hide-prev');
  }

  if (checkThreshold(
    tourSection.scrollLeft - (tourSection.scrollWidth - tourSection.clientWidth
    ),
  )) {
    tourSection.parentElement.classList.add('tst-hide-next');
  } else {
    tourSection.parentElement.classList.remove('tst-hide-next');
  }
}

function sliderButton({ direction }) {
  return () => {
    const items = Array.from(tourSection.children[0].children);

    const tourRight = tourSection.getBoundingClientRect().right;
    const tourLeft = tourSection.getBoundingClientRect().left;

    const scrollObj = { behavior: 'smooth', block: 'nearest' };

    items.forEach((item) => {
      if (direction === 'next') {
        const itemRight = item.getBoundingClientRect().right;
        if (Math.abs(itemRight - tourRight) < 2) {
          item.nextElementSibling.scrollIntoView(scrollObj);
        }
      }
      if (direction === 'prev') {
        const itemLeft = item.getBoundingClientRect().left;
        if (Math.abs(itemLeft - tourLeft) < 2) {
          item.previousElementSibling.scrollIntoView(scrollObj);
        }
      }
    });
  };
}

Helper.addInitFn(() => {
  tourSection = document.querySelector('.tst-slider-outer');
  gridTemplateColumns();

  checkIfButtonShown();
  tourSection.addEventListener('scroll', checkIfButtonShown);

  window.addEventListener('resize', gridTemplateColumns);
});

export default function slider({ content }) {
  return _('div', { class: 'tst-slider-wrapper' }, [
    _('div', { class: 'tst-slider-outer' }, [
      _('ul', { class: 'tst-slider' }, content),
    ]),
    _('button', { class: 'tst-slider-prev' }, null, [
      { type: 'click', listener: sliderButton({ direction: 'prev' }) },
    ]),
    _('button', { class: 'tst-slider-next' }, null, [
      { type: 'click', listener: sliderButton({ direction: 'next' }) },
    ]),
  ]);
}
