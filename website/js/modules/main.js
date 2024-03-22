import Helper from '../modules/helper.js';

const _ = Helper.create;

export default function main(...args) {
  const content = _('main');
  content.append(...args);
  return content;
}
