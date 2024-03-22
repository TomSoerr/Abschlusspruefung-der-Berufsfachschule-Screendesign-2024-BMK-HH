import nav from '../modules/nav.js';
import main from '../modules/main.js';
import section from '../modules/section.js';
import footer from '../modules/footer.js';
import Helper from '../modules/helper.js';

const _ = Helper.create;

function load() {
  document.body.append(nav(), main(section(['Website im Aufbau'])), footer());
}

export { load };
