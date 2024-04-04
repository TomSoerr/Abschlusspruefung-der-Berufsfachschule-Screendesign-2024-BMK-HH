import Helper from './helper.js';

const _ = Helper.create;

export default function col2({ left, right }) {
  return _('div', { class: 'tst-col-2' }, [
    _('div', { class: 'tst-col-2-left' }, left),
    _('div', { class: 'tst-col-2-right' }, right),
  ]);
}
