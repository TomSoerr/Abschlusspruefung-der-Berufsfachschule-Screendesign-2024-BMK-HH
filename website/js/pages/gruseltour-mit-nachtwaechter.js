import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import p from '../modules/paragraph.js';
import image from '../modules/image.js';
import slider from '../modules/slider.js';
import col2 from '../modules/col-2.js';
import button from '../modules/button.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import angebote from '../../data/angebote.js';
import hero from '../modules/hero.js';
import { category } from '../modules/categories.js';
import { tourDate } from '../modules/tour-dates.js';

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
    }),
    section([
      ...p({ text: tourData.text }),
      _(
        'ul',
        null,
        tourData.kategorien.map((cat) => category({ c: cat, home: true })),
      ),

      button({
        type: 'link',
        text: 'Zurück zur Übersicht',
        href: `${Helper.getFolderData(`${site}.html`)}.html`,
      }),
    ]),
    section(
      [
        col2({
          left: [
            _('h2', { text: 'Die nächste offenen Touren' }),
            tourDate({ filterBy: site, noLink: true }),
            ...p({ text: tourData.offeneTour }),
            button({
              text: 'Offene Tour buchen',
              href: 'buchung.html',
              type: 'link',
            }),
          ],
          right: [
            _('h2', { text: 'Treffpunkt' }),
            ...p({ text: tourData.treffpunkt }),
            map.content,
          ],
        }),
      ],
      'tst-offene-touren',
    ),
    section([
      _('h2', { text: 'Private Tour' }),
      ...p({ text: tourData.privateTour }),
      button({
        text: 'Private Tour anfragen',
        href: 'kontakt.html',
        home: true,
      }),
    ]),
    section(
      [
        _('h2', { text: 'Galerie' }),
        slider({
          content: tourData.galerie.map((img) =>
            _('li', null, [
              image({ src: img.src, alt: img.alt, hidden: true }),
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
