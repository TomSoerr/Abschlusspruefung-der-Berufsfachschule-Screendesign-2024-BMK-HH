import Helper from './helper.js';

const _ = Helper.create;

const events = [
  {
    type: 'mouseover',
    listener: (e) => Helper.singleUseEvent(e, 'prevent'),
  },
  {
    type: 'focusin',
    listener: (e) => Helper.singleUseEvent(e, 'prevent'),
  },
];

export default function footer() {
  return _('footer', { class: 'tst-section', id: 'tst-footer' }, [
    _('div', { class: 'tst-section-inner' }, [
      _('ul', null, [
        _('li', null, [
          _(
            'a',
            {
              href: `${Helper.pathToMain(window.location.pathname)}impressum.html`,
              class: 'tst-preload',
            },
            ['Impressum'],
            events,
          ),
        ]),
        _('li', null, [
          _(
            'a',
            {
              href: `${Helper.pathToMain(
                window.location.pathname,
              )}datenschutz.html`,
              class: 'tst-preload',
            },
            ['Datenschutz'],
            events,
          ),
        ]),
        _('li', { class: 'tst-contact-link' }, [
          'Webdesign von ',
          _(
            'a',
            {
              href: 'https://tomsoerr.github.io/portfolio/#/contact',
              target: '_blank',
              class: 'tst-preload',
            },
            ['Tom Soerr'],
            events,
          ),
        ]),
      ]),

    ]),
  ]);
}
