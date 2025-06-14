import Helper from './helper.js';
import image from './image.js';

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

const allTours = Object.values(Helper.navItems.navigation).filter(
  (item) => item.folder,
);

export default function footer() {
  return _('footer', { class: 'tst-section', id: 'tst-footer' }, [
    _('span', { style: 'z-index: 1000; position: fixed; bottom: 0; left: 0; color: black; background-color: white; text-decoration: none; font-size: 16px; font-family: sans-serif; padding: 2px; border: thin solid black;', text: 'Keine kommerzielle Website, nur für Bildungszwecke.' }),
    _('a', {style: 'z-index: 1000; position: fixed; bottom: 0; right: 0; color: black; background-color: white; text-decoration: none; font-size: 16px; font-family: sans-serif; padding: 2px; border: thin solid black;', href: 'https://tomsoerr.github.io/#/impressum', text: "Impressum" }),
    _('div', { class: 'tst-section-inner' }, [
      image({ src: 'logo-sw.svg', alt: 'Logo' }),

      _('div', { class: 'tst-footer-socials' }, [
        _('ul', null, [
          _('li', null, [
            _(
              'a',
              {
                href: 'https://www.facebook.com/AyeAyeHamburg',
                target: '_blank',
              },
              [
                // image({
                //   src: 'facebook.svg',
                //   hidden: true,
                //   alt: 'Facebook',
                // }),
                "Facebook"
              ],
            ),
          ]),
          _('li', null, [
            _(
              'a',
              {
                href: 'https://www.instagram.com/AyeAyeHamburg/',
                target: '_blank',
              },
              [
                // image({
                //   src: 'instagram.svg',
                //   alt: 'Instagram',
                //   hidden: true,
                // }),
                "Instagram"
              ],
            ),
          ]),
        ]),
      ]),

      _('div', { class: 'tst-footer-contact' }, [
        _('h3', null, ['Kontakt']),
        _('address', null, [
          _('p', { text: 'Agentur Aye Aye' }),
          _('p', { text: 'Am Sandtorkai 48' }),
          _('p', { text: '20457 Hamburg' }),
          _('p', null, [
            _('a', {
              href: 'tel:+49401399040',
              text: '(0 40) 13 99 040',
            }),
          ]),
          _('p', null, [
            _('a', {
              href: 'mailto:info@aye-aye.hamburg',
              text: 'info@aye-aye.hamburg',
            }),
          ]),
        ]),
      ]),

      ...allTours.map((tour) =>
        _('div', { class: `tst-footer-${tour.folder}` }, [
          _('h3', null, [tour.parent]),
          _('ul', null, [
            ...tour.unterpunkte.map((sub) =>
              _('li', null, [
                _(
                  'a',
                  {
                    href: `${Helper.relativPath(window.location.pathname, sub.href)}`,
                    class: 'tst-preload',
                    text: sub.text,
                  },
                  null,
                  events,
                ),
              ]),
            ),
          ]),
        ]),
      ),

      _('div', { class: 'tst-footer-legal' }, [
        _('h3', null, ['Rechtliches']),
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
                href: `${Helper.pathToMain(window.location.pathname)}datenschutz.html`,
                class: 'tst-preload',
              },
              ['Datenschutz'],
              events,
            ),
          ]),
          _('li', null, [
            _(
              'a',
              {
                href: `${Helper.pathToMain(window.location.pathname)}kontakt.html`,
                class: 'tst-preload',
              },
              ['Kontakt'],
              events,
            ),
          ]),
        ]),
      ]),
      _('div', { class: 'tst-by-link' }, [
        'Webdesign von ',
        _(
          'a',
          {
            href: 'https://tomsoerr.github.io/#/kontakt',
            target: '_blank',
            class: 'tst-preload',
          },
          ['Tom Soerr'],
          events,
        ),
      ]),
    ]),
  ]);
}
