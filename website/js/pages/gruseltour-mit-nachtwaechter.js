import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import p from '../modules/paragraph.js';
import slider from '../modules/slider.js';
import col2 from '../modules/col-2.js';
import button from '../modules/button.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import angebote from '../../data/angebote.js';
import hero from '../modules/hero.js';
import { category } from '../modules/categories.js';
import { tourDate } from '../modules/tour-dates.js';
import picture from '../modules/picture.js';

const _ = Helper.create;

function tourTemplate({ site }) {
  const tourData = angebote[Helper.getFolderData(`${site}.html`)][site];
  document.title = tourData.name;

  const map = _('template');
  map.innerHTML = `<iframe id="uMap" width="100%" height="500px" frameborder="0" allowfullscreen allow="geolocation" src="${tourData.mapSrc}?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&editMode=disabled&moreControl=false&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=false"></iframe>`;

  return [
    hero({
      img: { src: tourData.img.src, alt: tourData.img.alt },
      heading: tourData.name,
      small: true,
    }),

    section(
      [
        col2({
          right: [
            _('h2', { text: 'Nächste Termine' }),
            tourDate({ filterBy: site, noLink: true }),
            _('div', { class: 'tst-preise' }, [
              _('h2', { text: 'Offene Tour' }),
              ...p({ text: tourData.offeneTour }),
              button({
                text: 'Offene Tour buchen',
                href: 'buchung.html',
                type: 'link',
              }),
            ]),
            _('div', { class: 'tst-preise' }, [
              _('h2', { text: 'Private Tour' }),
              ...p({ text: tourData.privateTour }),
              button({
                text: 'Private Tour anfragen',
                href: 'kontakt.html',
                home: true,
              }),
            ]),

            _('h2', { text: 'Kategorie' }),
            _(
              'ul',
              { class: 'tst-kategorien' },
              tourData.kategorien.map((cat) =>
                category({ c: cat, home: true }),
              ),
            ),
          ],
          left: [
            ...p({ text: tourData.text }),
            button({
              text: 'Jetzt buchen',
              href: 'buchung.html',
              type: 'link',
            }),

            _('h2', { text: 'Treffpunkt' }),
            ...p({ text: tourData.treffpunkt }),
            map.content,
          ],
        }),
      ],
      'tst-tour-template',
    ),

    section(
      [
        _('h2', { text: 'Galerie' }),
        slider({
          content: tourData.galerie.map((img) =>
            _('li', null, [
              picture({ src: img.src, alt: img.alt, hidden: true }),
            ]),
          ),
        }),
      ],
      'tst-galerie',
    ),
  ];
}

function load() {
  document.body.append(
    nav(),
    main(...tourTemplate({ site: 'gruseltour-mit-nachtwaechter' })),
    footer(),
  );
}

export { load };
