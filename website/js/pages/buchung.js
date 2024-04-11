import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import hero from '../modules/hero.js';
import p from '../modules/paragraph.js';
import { buchungForm } from '../modules/form.js';
import col2 from '../modules/col-2.js';

const _ = Helper.create;

function load() {
  document.title = 'Buchung';

  document.body.append(
    nav(),
    main(
      hero({
        img: {
          src: 'ap2024-hafencity-29.jpg',
          alt: 'Wand mit einem Rosa Rettungsring',
        },
        heading: 'Ihr direkter Draht zu uns',
        small: true,
      }),
      section([
        col2({
          right: [...buchungForm({ text: 'Ich möchte mit auf Tour …' })],
          left: [
            _('h2', { text: 'Kontakt' }),

            _('address', null, [
              _('p', null, [
                _('a', {
                  href: 'mailto:info@aye-aye.hamburg',
                  text: 'info@aye-aye.hamburg',
                }),
                _('span', { text: ' oder ' }),
                _('a', {
                  href: 'tel:+49401399040',
                  text: '(0 40) 13 99 040',
                }),
              ]),
              _('br'),
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
          ],
        }),
      ]),
    ),
    footer(),
  );
}

export { load };
