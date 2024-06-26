import nav from '../modules/nav.js';
import main from '../modules/main.js';
import hero from '../modules/hero.js';
import section from '../modules/section.js';
import p from '../modules/paragraph.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import button from '../modules/button.js';
import tourGrid from '../modules/tour-grid.js';
import { tourDateSlider } from '../modules/tour-dates.js';
import slider from '../modules/slider.js';
import image from '../modules/image.js';
import col2 from '../modules/col-2.js';
import cta from '../modules/cta.js';
import picture from '../modules/picture.js';

const _ = Helper.create;

const kundenmeinungenData = [
  {
    text: 'Vielen Dank für einen unvergesslichen Tag in Hamburg. Abseits der Touristenströme haben wir sehr persönliche Einblicke in diesen wunderbaren Stadtteil erhalten.',
    author: 'Mike Gruenewald',
  },
  {
    text: 'Absolute Empfehlung! Sympathische Guides, die die Herzen der Kinder im Sturm erobern.',
    author: 'Steffen Cole',
  },
  {
    text: 'Der Kindergeburtstag meiner Tochter war der absolute Bringer! Die Kinder spielten noch wochenlang die Pfefferkörner nach und dachten sich immer neue Fälle aus.',
    author: 'Robert Ehrlichmann',
  },
  {
    text: 'Spannender geht Sightseeing nicht. So macht auch Kindern Stadtgeschichte Spaß.',
    author: 'Andreas Adler',
  },
];

const kundenmeinungen = ({ quotes }) =>
  section([
    _('h2', { text: 'Kundenmeinungen', id: 'kume' }),
    slider({
      content: quotes.map((quote) =>
        _('li', null, [
          _('blockquote', {
            text: quote.text,
            data: { author: quote.author },
          }),
        ]),
      ),
    }),
  ]);

const empfehlungenData = [
  {
    heading: 'Akinas Lieblingstour: Die Gruseltour mit Nachtwächter',
    text: 'Ich mag die *Gruseltour mit dem Nachtwächter* am liebsten. Bei der Ausarbeitung dieser Tour sind wir auf großartige Geschichten und Legenden aus der Speicherstadt gestoßen. Unser Guide Thomas taucht mit den Kindern innerhalb kürzester Zeit in eine ***fantastische Welt*** ein, sodass sie alles um sich herum vergessen und nur noch den **gruseligen Geschichten** lauschen. Auch manch Erwachsene habe ich schon vor Schreck kreischen hören, wenn unsere Schausteller unvermittelt auftauchen. Ein großer Gruselspaß!',
    link: { text: 'Zur Gruseltour', href: 'gruseltour-mit-nachtwaechter.html' },
    img: { src: 'ap2024-team-Akina-Henyes-2.jpg', alt: 'Akina Henyes' },
  },
  {
    heading: 'Anjulis Lieblingstour: Die Klabautermann-Tour',
    text: 'Mein absoluter Favorit ist unsere *Klabautermann-Tour*. Ich mag die **Seefahrer- und Schmugglergeschichten** und entdecke an den Orten, die wir besuchen, immer wieder neue und spannende Details. Die Kinder wollen am Ende der Tour immer alle zur See fahren und das zeigt mir, dass wir alles richtig gemacht haben.',
    link: { text: 'Zur Klabautermann Tour', href: 'klabautermann-tour.html' },
    img: { src: 'ap2024-team-Anjuli-Sayyed-2.jpg', alt: 'Anjuli Sayyed' },
  },
];

const empfehlungen = ({ data }) =>
  section(
    [
      _('h2', { text: 'Unsere persönlichen Empfehlungen' }),

      ...data.map((item) =>
        _('section', { class: 'tst-empfelungen-section' }, [
          _('div', null, [
            _('h3', { text: item.heading }),
            ...p({
              text: item.text,
              teaserLink: item.link.href,
              teaserText: item.link.text,
            }),
          ]),
          image({ hidden: true, size: 'small', ...item.img }),
        ]),
      ),
    ],
    'tst-empfehlungen',
  );

const agentur = () =>
  section(
    [
      _('h2', { text: 'Mehr über unsere Agentur' }),

      col2({
        left: [
          ...p({
            text: 'Unser aufgeschlossenes und junges Team aus **Kunsthistorikerinnen**, **Architektur-** und **Schauspielstudenten** freut sich darauf, mit euch die spannenden und bislang unbekannten Seiten der Hafencity zu erkunden und vermittelt Hintergrundwissen in altersangemessener und fesselnder Art und Weise. <br> Wir sind seit vielen Jahren in diesem neuen Stadtteil verwurzelt und haben uns zum Ziel gesetzt, euch die Hafencity aus einem ganz eigenen Blickwinkel zu zeigen und euch die vielseitigen Facetten erleben zu lassen. <br> Ganz nach euren Wünschen könnt ihr uns jeden Tag in der Woche im Rahmen einer **privaten Tour** buchen, oder ihr schließt euch einer unserer **offenen Touren** an, die wir in regelmäßigen Abständen anbieten. <br> Wir freuen uns auf euch demnächst hier an der Waterkant <br> *Akina Henyes und Anjuli Sayyed*',
          }),

          button({
            text: 'Kontakt aufnehmen',
            href: 'kontakt.html',
            type: 'link',
          }),
        ],

        right: [
          picture({
            src: 'ap2024-team-Anjuli-Akina-2.jpg',
            hidden: true,
            alt: 'Akina Henyes und Anjuli Sayyed an einem Computer',
          }),
        ],
      }),
    ],
    'tst-agentur',
  );

function load() {
  document.body.append(
    nav(),
    main(
      hero({
        img: {
          src: 'ap2024-tour-08.jpg',
          alt: 'Grüne hügelige Wiese in der Hafencity mit Familien die Picknick machen und spielen',
          hidden: true,
        },
        heading: 'Leinen los für Erlebnisse im Hamburger Hafen? Aye, Aye!',
        content: [
          ...p({
            text: 'Wir nehmen euch mit auf eine **Entdeckungsreise** in den neuesten und den ältesten Stadtteil Hamburgs, die Hafencity und die Speicherstadt.',
          }),
        ],
        contentAppend: [
          col2({
            right: [
              ...p({
                text: 'Wir möchten euch zeigen, dass Geschichte und Architektur alles andere als langweilig, sondern – ganz im Gegenteil – *spannend* und voller *Überraschungen* sein können. Ob bei einem **Kindergeburtstag**, einer **Klassenfahrt**, einer **Stadtrallye** oder einem **Familienausflug** hier bei uns an der Elbe gibt es immer etwas Aufregendes zu erleben und zu erfahren. ',
              }),
            ],
            left: [
              button({
                text: 'Alle Angebote ansehen',
                href: '#touren-hilfe',
                color: 'primary',
              }),
            ],
          }),
        ],
      }),

      section([
        _('h2', { text: 'Die nächsten Termine' }),
        tourDateSlider({ maxDates: 6 }),
      ]),

      kundenmeinungen({ quotes: kundenmeinungenData }),

      tourGrid(),

      cta({
        text: 'Egal ob Familienurlaub, Stadtreise, Kindergeburtstag oder Klassenfahrt, bei uns ist für jeden etwas dabei. Buche jetzt eines unserer Angebote!',
        buttonObj: {
          text: 'Buchen',
          href: 'buchung.html',
          // color: 'primary',
        },
        // classes: 'secondary',
      }),

      empfehlungen({ data: empfehlungenData }),

      agentur(),
    ),
    footer(),
  );
}

export { load };
