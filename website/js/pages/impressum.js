import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';

const _ = Helper.create;

function load() {
  document.body.append(nav(), main(section([
    'Keine kommerzielle Website, nur für Bildungszwecke.',
    _('br'),
    _('a', { href: 'https://tomsoerr.github.io/#/impressum', text: "Impressum" })
  ])), footer());
}

export { load };
