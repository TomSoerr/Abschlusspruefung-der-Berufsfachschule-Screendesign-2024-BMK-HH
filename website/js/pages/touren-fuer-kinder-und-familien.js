import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import tourList from '../modules/tour-list.js';
import p from '../modules/paragraph.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import button from '../modules/button.js';
import hero from '../modules/hero.js';
import col2 from '../modules/col-2.js';
import { tourDateLink } from '../modules/tour-dates.js';

const _ = Helper.create;

function load() {
  // set tab title to 'Stadtführungen für Kinder und Familien'
  document.title = 'Stadtführungen für Kinder und Familien';

  document.body.append(
    nav(),
    main(
      hero({
        heading: 'Stadtführungen der anderen Art für Kinder und Familien',
        img: { src: 'ap2024-tour-06.jpg', alt: 'Hafencity' },

        small: true,
      }),
      section(
        [
          col2({
            left: [
              ...p({
                text: 'Ob historische Speicherstadt, die klingende Elbphilharmonie oder noch weniger bekannte Orte wie das kreative Oberhafenquartier – es gibt für euch einiges zu entdecken und zu hören. Geschichten und Geschichte werden bei uns spannend erzählt, ob beim Spaziergang an der Elbe oder auf einer Schnuppertour durch das Gewürzmuseum. <br> Für jede Altersklasse gibt es speziell ausgearbeitete Touren, die beispielsweise anhand von Ratespielen oder Schnitzeljagden die Geschichte des Stadtteils zum Leben erwecken. Natürlich gehen wir auch auf die Wissbegier der Eltern ein! <br> Bei Aye Aye ist alles möglich. Bucht ihr eine private Tour, dann bestimmt ihr den Tag und den Beginn der Tour. Oder ihr kommt allein, zu zweit oder als Familie und schließt euch einer der offenen Touren an, die wir regelmäßig anbieten.',
              }),
              _('div', { class: 'tst-button-group' }, [
                button({
                  text: 'Tour buchen',
                  href: 'buchen.html',
                  home: true,
                }),
                button({
                  text: 'Als Gruppe buchen',
                  href: 'kontakt.html',
                  home: true,
                  color: 'secondary',
                }),
              ]),
            ],
            right: [
              _('h2', { text: 'Nächste Touren' }),
              ...tourDateLink({
                groupBy: 'touren-fuer-kinder-und-familien',
                noLink: true,
                maxDates: 4,
              }),
            ],
          }),
        ],
        'tst-tour-overview',
      ),
      tourList({ type: 'touren-fuer-kinder-und-familien' }),
    ),
    footer(),
  );
}

export { load };
