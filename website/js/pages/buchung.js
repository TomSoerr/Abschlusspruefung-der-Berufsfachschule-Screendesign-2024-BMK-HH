import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';
import p from '../modules/paragraph.js';
import { buchungForm } from '../modules/form.js';

const _ = Helper.create;

function load() {
  document.body.append(
    nav(),
    main(
      section([
        _('h1', { text: 'Ihr direkter Draht zu uns' }),
        ...p(
          'info@aye-aye.hamburg oder (0 40) 13 99 040 <br> Agentur Aye Aye <br> Akina Henyes und Anjuli Sayyed <br> Am Sandtorkai 48 <br> 20457 Hamburg <br> Mail: info@aye-aye.hamburg <br> Telefon (0 40) 13 99 04-0 <br> Telefax (0 40) 13 99 04-30',
        ),
        _('h2', { text: 'Ich möchte mit auf Tour …' }),
      ]),
      buchungForm(),
    ),
    footer(),
  );
}

export { load };
