import nav from '../modules/nav.js';
import main from '../modules/main.js';
import hero from '../modules/hero.js';
import section from '../modules/section.js';
import p from '../modules/paragraph.js';
import footer from '../modules/footer.js';
import tourPreview from '../modules/tour-preview.js';
import Helper from '../modules/helper.js';
import button from '../modules/button.js';

const _ = Helper.create;

function load() {
  document.body.append(
    nav(),
    main(
      hero({
        img: {
          src: 'ap2024_hafencity_12.jpg',
          alt: 'Hafencity',
          hidden: true,
        },
        heading: 'Leinen los für Erlebnisse im Hamburg Hafen? Aye, Aye!',
        buttonObj: {
          text: 'Zu den Angeboten',
          href: 'produkte.html',
          type: 'link',
        },
      }),
      tourPreview(),
      section([
        ...p(
          { text: 'Wir nehmen euch mit auf eine Entdeckungsreise in den neuesten und den ältesten Stadtteil Hamburgs, die Hafencity und die Speicherstadt. <br> Wir möchten euch zeigen, dass Geschichte und Architektur alles andere als langweilig, sondern – ganz im Gegenteil – spannend und voller Überraschungen sein können. Ob bei einem Kindergeburtstag, einer Klassenfahrt, einer Stadtrallye oder einem Familienausflug hier bei uns an der Elbe gibt es immer etwas Aufregendes zu erleben und zu erfahren. <br> Unser aufgeschlossenes und junges Team aus Kunsthistorikerinnen, Architektur- und Schauspielstudenten freut sich darauf, mit euch die spannenden und bislang unbekannten Seiten der Hafencity zu erkunden und vermittelt Hintergrundwissen in altersangemessener und fesselnder Art und Weise. <br> Wir sind seit vielen Jahren in diesem neuen Stadtteil verwurzelt und haben uns zum Ziel gesetzt, euch die Hafencity aus einem ganz eigenen Blickwinkel zu zeigen und euch die vielseitigen Facetten erleben zu lassen. <br> Ganz nach euren Wünschen könnt ihr uns jeden Tag in der Woche im Rahmen einer privaten Tour buchen, oder ihr schließt euch einer unserer offenen Touren an, die wir in regelmäßigen Abständen anbieten. <br> Wir freuen uns auf euch demnächst hier an der Waterkant <br> Akina Henyes und Anjuli Sayyed' },
        ),
      ]),
      section(
        [
          _('h2', { text: 'Die nächsten Termine' }),
          _(
            'ul',
            null,
            [
              'Speicherstadt & Gewürzmuseum (3. Juni 15:00-16:30 Uhr) [Verlinkung zur Unterseite, Anzeige: wenige Restplätze]',
              'Die wachsende Stadt (4. Juni 14:00 Uhr) [Verlinkung zur Unterseite, Anzeige: wenige Restplätze]',
              'Sportliche Entdeckertour mit dem Fahrrad (5. Juni 14:00 Uhr) ) [Verlinkung zur Unterseite, Anzeige: ausreichend Restplätze]',
              'Gruseltour mit Nachtwächter (9. Juni 20:00-21:30 Uhr) ) [Verlinkung zur Unterseite, Anzeige: ausgebucht]',
              'Große Baumeister (10. Juni 16:00 Uhr) [Verlinkung zur Unterseite, Anzeige: ausgebucht]',
              'Klabautermanntour (11. Juni 15:00-16:30 Uhr) [Verlinkung zur Unterseite, Anzeige: ausreichend Restplätze]',
            ].reduce((prev, curr) => {
              prev.push(_('li', { text: curr }));
              return prev;
            }, []),
          ),
        ],
        'secondary',
      ),

      section(
        [
          _('h2', { text: 'Kundenmeinungen' }),
          _('blockquote', {
            text: 'Absolute Empfehlung! Sympathische Guides, die die Herzen der Kinder im Sturm erobern.',
          }),
          _('blockquote', {
            text: 'Spannender geht Sightseeing nicht. So macht auch Kindern Stadtgeschichte Spaß.',
          }),
          _('blockquote', {
            text: 'Der Kindergeburtstag meiner Tochter war der absolute Bringer! Die Kinder spielten noch wochenlang die Pfefferkörner nach und dachten sich immer neue Fälle aus.',
          }),
          _('blockquote', {
            text: 'Vielen Dank für einen unvergesslichen Tag in Hamburg. Abseits der Touristenströme haben wir sehr persönliche Einblicke in diesen wunderbaren Stadtteil erhalten.',
          }),
        ],
        'secondary-2',
      ),

      section([
        _('h2', { text: 'Unsere persönlichen Empfehlungen' }),
        ...p({ text: '**Akinas Lieblingstour: Die Gruseltour mit Nachtwächter**' }),
        _('blockquote', {
          text: 'Ich mag die Gruseltour mit dem Nachtwächter am liebsten. Bei der Ausarbeitung dieser Tour sind wir auf großartige Geschichten und Legenden aus der Speicherstadt gestoßen. Unser Guide Thomas taucht mit den Kindern innerhalb kürzester Zeit in eine fantastische Welt ein, sodass sie alles um sich herum vergessen und nur noch den gruseligen Geschichten lauschen. Auch manch Erwachsene habe ich schon vor Schreck kreischen hören, wenn unsere Schausteller unvermittelt auftauchen. Ein großer Gruselspaß!',
        }),
        button({ text: 'Zur Gruseltour', href: 'produkte.html' }),

        _('h2', { text: 'Unsere persönlichen Empfehlungen' }),
        ...p({ text: '**Anjulis Lieblingstour: Die Klabautermann-Tour**' }),
        _('blockquote', {
          text: 'Mein absoluter Favorit ist unsere Klabautermann-Tour. Ich mag die Seefahrer- und Schmugglergeschichten und entdecke an den Orten, die wir besuchen, immer wieder neue und spannende Details. Die Kinder wollen am Ende der Tour immer alle zur See fahren und das zeigt mir, dass wir alles richtig gemacht haben.',
        }),
        button({ text: 'Klabautermann-Tour', href: 'produkte.html' }),
      ]),

      // productPreview(),
    ),
    footer(),
  );
}

export { load };
