import Helper from './helper.js';

const _ = Helper.create;

function customHoverIn(event) {
  Helper.getLiElement(event.target).classList.add('tst-hover');
}

function customHoverOut(event) {
  setTimeout(() => {
    Helper.getLiElement(event.target).classList.remove('tst-hover');
  }, 300);
}

function clickToOpen(event) {
  const liElement = Helper.getLiElement(event.target);
  if (liElement.classList.contains('tst-nav-sub-level')) {
    Helper.getLiElement(event.target).classList.toggle('tst-open');
    event.preventDefault();
  }
}

const defaultEvent = [
  {
    type: 'mouseover',
    listener: Helper.singleUseEvent,
  },
  {
    type: 'focusin',
    listener: Helper.singleUseEvent,
  },
];

const subMenuEvent = [
  {
    ...defaultEvent,
    type: 'click',
    listener: clickToOpen,
  },
];

const subMenuItemEvent = [
  {
    type: 'mouseover',
    listener: customHoverIn,
  },
  {
    type: 'mouseout',
    listener: customHoverOut,
  },
  {
    type: 'focusin',
    listener: customHoverIn,
  },
  {
    type: 'focusout',
    listener: customHoverOut,
  },
];

export default function navLink({ href, text, data }, subMenu, isSubMenuItem) {
  const relHref = Helper.relativPath(window.location.pathname, href);
  let event;

  if (isSubMenuItem) {
    event = subMenuItemEvent;
  } else if (subMenu) {
    event = subMenuEvent;
  } else {
    event = defaultEvent;
  }

  return _(
    'li',
    {
      class: !subMenu ? 'tst-preload' : 'tst-preload tst-nav-sub-level',
      data: (data) ? { href: data } : null,
    },
    [_('a', { href: relHref, text }), subMenu],
    event,
  );
}
