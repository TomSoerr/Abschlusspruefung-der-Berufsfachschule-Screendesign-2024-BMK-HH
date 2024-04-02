import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import p from '../modules/paragraph.js';
import image from '../modules/image.js';
import button from '../modules/button.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import angebote from '../../data/angebote.js';
import hero from '../modules/hero.js';
import { category } from '../modules/categories.js';
import tourDates from '../modules/tour-dates.js';

const _ = Helper.create;

function tourTemplate({ site }) {
  const tourData = angebote[Helper.getFolderData(`${site}.html`)][site];
  return [
    hero({ img: { src: tourData.img.src, alt: tourData.img.alt }, heading: tourData.name }),
    section([
      ...p({ text: tourData.text }),
      _('ul', null, tourData.kategorien.map((cat) => category({ c: cat, home: true }))),
      tourDates({ filterBy: site, noLink: true }),
      button({ type: 'link', text: 'Zurück zur Übersicht', href: `${Helper.getFolderData(`${site}.html`)}.html` }),
    ]),
  ];
}

function load() {
  document.body.append(
    nav(),
    main(
      ...tourTemplate({ site: 'gruseltour-mit-nachtwaechter' }),
      section([
        _('h2', { text: 'Offene Touren' }),
        ...p({ text: 'Einzelpreis: <br> Erwachsene 17,50 Euro <br> Kinder (bis 12 Jahre) 10 Euro <br> Treffpunkt: Südufer Brooksbrücke, vor der Bar Barrossa' }),
        image({ src: 'karte', alt: 'Einbindung des Orientierungsplans mit Kennzeichnung des Treffpunkts' }),
        button({
          text: 'Offene Tour buchen', href: 'buchen.html', type: 'link',
        }),
        _('h2', { text: 'Private Touren' }),
        ...p({ text: 'Teilnehmeranzahl: max. 12 Teilnehmer <br> Gruppenpreis: 180 €' }),
        button({
          text: 'Private Tour anfragen', href: 'kontakt.html', type: 'link',
        }),
      ]),
    ),
    footer(),
  );
}

export { load };
