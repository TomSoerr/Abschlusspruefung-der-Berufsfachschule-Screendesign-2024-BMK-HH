import Helper from './helper.js';
import section from './section.js';
import button from './button.js';

const _ = Helper.create;

const validateInput = {
  type: 'click',
  listener: (e) => {
    document
      .querySelectorAll('#tst-form :is(input, textarea, select)')
      .forEach((input) => {
        if (input.validity.valueMissing) {
          input.setCustomValidity(
            'Bitte fülle dieses Feld aus, es ist verpflichtend',
          );
        } else if (!input.validity.valid) {
          input.setCustomValidity(input.dataset.msg);
        } else {
          input.setCustomValidity('');
        }
        input.reportValidity();

        const resetValidity = (e) => {
          if (!e.target.validity.patternMismatch) {
            e.target.removeEventListener('input', resetValidity);
            e.target.setCustomValidity('');
          }
          e.target.reportValidity();
        };

        input.addEventListener('input', resetValidity);
      });
  },
};

const formItems = (() => {
  const givenName = () =>
    _('label', { for: 'name' }, [
      _('span', { text: 'Name*', class: 'label' }),
      _('input', {
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: ' ',
        autocomplete: 'given-name',
        required: '',
        title: 'Vorname',
        pattern: '.{2,}',
        data: { msg: 'Bitte gib deinen Vornamen ein' },
      }),
      _('span'),
    ]);

  const famName = () =>
    _('label', { for: 'nachname' }, [
      _('span', { text: 'Nachname*', class: 'label' }),
      _('input', {
        type: 'text',
        name: 'nachname',
        id: 'nachname',
        placeholder: ' ',
        required: true,
        autocomplete: 'family-name',
        title: 'Nachname',
        pattern: '.{2,}',
        data: { msg: 'Bitte gib deinen Nachnamen ein' },
      }),
      _('span'),
    ]);

  const tel = () =>
    _('label', { for: 'phone' }, [
      _('span', { text: 'Telefon*', class: 'label' }),
      _('input', {
        type: 'tel',
        id: 'phone',
        name: 'phone',
        inputmode: 'numeric',
        placeholder: ' ',
        autocomplete: 'off',
        pattern: '\\d{10,18}',
        title: 'Telefonnummer',
        required: true,
        data: {
          msg: 'Bitte gib deine Telefonnummer im richtigen Format an (Beispiel: 012345678901)',
        },
      }),
      _('span'),
    ]);

  const email = () =>
    _('label', { for: 'email' }, [
      _('span', { text: 'E-Mail*', class: 'label' }),
      _('input', {
        type: 'email',
        name: 'email',
        id: 'email',
        autocomplete: 'email',
        placeholder: ' ',
        required: true,
        title: 'E-Mail',
        data: {
          msg: 'Bitte gib deine E-Mail an (Beispiel:vorname@nachname.com)',
        },
      }),
      _('span'),
    ]);

  const numberOfPeople = () =>
    _('label', { for: 'people' }, [
      _('span', { text: 'Anzahl Personen*', class: 'label' }),
      _('input', {
        type: 'number',
        name: 'people',
        id: 'people',
        placeholder: ' ',
        required: true,
        min: '1',
        max: '50',
        title: 'Anzahl der Personen',
        data: {
          msg: 'Bitte gib die Anzahl der Personen an',
        },
      }),
      _('span'),
    ]);

  const dateEvent = [
    {
      type: 'focus',
      listener: (e) => {
        e.target.classList.remove('tst-preload');
        const today = new Date().toISOString().split('T')[0];
        e.target.setAttribute('min', today);
        e.target.removeEventListener('focus', dateEvent[0].listener);
      },
    },
  ];

  const date = () =>
    _('label', { for: 'date' }, [
      _('span', { text: 'Datum*', class: 'label' }),
      _(
        'input',
        {
          type: 'date',
          class: 'tst-preload',
          name: 'date',
          id: 'date',
          placeholder: ' ',
          required: true,
          title: 'Datum',
          data: {
            msg: 'Bitte gib das Datum an',
          },
        },
        null,
        dateEvent,
      ),
      _('span'),
    ]);

  const tourThema = () =>
    _('div', { class: 'tour' }, [
      _('div', null, [
        _('label', { for: 'tour' }, [
          _('span', { text: 'Tour*', class: 'label' }),
          _(
            'select',
            {
              title: 'Tour auswählen',
              name: 'tour',
              id: 'tour',
              required: '',
              data: {
                msg: 'Bitte wähle ein Tour aus',
              },
            },
            [
              _(
                'option',
                {
                  value: '',
                  title: 'Tour',
                  disabled: '',
                  selected: '',
                },
                ['Keine Tour ausgewählt'],
              ),
              ...Helper.navItems.navigation.reduce((acc, item) => {
                if (item.parent && item.folder !== 'kindergeburtstage') {
                  acc.push(
                    _('optgroup', { label: item.parent }, [
                      ...item.unterpunkte.map((subpage) =>
                        _(
                          'option',
                          { value: subpage.href.match(/(.*)\.html/)[1] },
                          [subpage.text],
                        ),
                      ),
                    ]),
                  );
                }
                return acc;
              }, []),
            ],
          ),
        ]),
      ]),
    ]);

  const message = () =>
    _('label', { for: 'message' }, [
      _('span', { text: 'Nachricht*', class: 'label' }),
      _('textarea', {
        name: 'message',
        id: 'message',
        placeholder: ' ',
        rows: '4',
        required: true,
        title: 'Nachricht',
        data: {
          msg: 'Schreibe mir eine Nachricht, damit ich deine Anfrage noch schneller beantworten kann',
        },
      }),
    ]);

  const submit = () =>
    button({
      type: 'submit',
      text: 'Absenden',
      event: validateInput,
    });

  return {
    givenName,
    famName,
    numberOfPeople,
    tourThema,
    date,
    tel,
    email,
    message,
    submit,
  };
})();

function buchungForm({ text }) {
  return [
    _('h2', { text }),
    _('p', null, [
      _('strong', {
        text: 'Verpflichtende Felder sind mit einem * gekennzeichnet.',
      }),
    ]),
    _(
      'form',
      {
        id: 'tst-form',
        action: 'https://formspree.io/f/mleqbrwr',
        method: 'POST',
      },
      [
        _('div', { class: 'two-col' }, [
          formItems.givenName(),
          formItems.famName(),
        ]),
        formItems.numberOfPeople(),
        formItems.tourThema(),
        formItems.date(),
        formItems.tel(),
        formItems.email(),
        formItems.message(),
        formItems.submit(),
      ],
    ),
  ];
}

export { buchungForm };
