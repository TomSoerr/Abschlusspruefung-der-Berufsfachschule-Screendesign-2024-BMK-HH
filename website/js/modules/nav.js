import Helper from './helper.js';
import navLink from './nav-link.js';

const _ = Helper.create;

const navigation = (function navigationIIFE() {
  let navHtmlEl = null;
  let navImgEl = null;
  let navSubMenuEl = null;
  let navImgTimeout = 1;
  let navBreakpoint = null;
  let navIconFontSize = null;
  let htmlSpaceX = null;
  let navGapX = null;
  let mediaQuery = null;
  const minBreakpoint = 768;
  const navSecurePadding = 2;
  let mobile = null;
  const scrollHistory = [];

  /* ______________________________________
  Shrinking Navigation when scrolled
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  function scrolled() {
    const scrollTop = document.querySelector(
      'main > header:first-child',
    ).clientHeight;
    return (
      document.body.scrollTop > scrollTop ||
      document.documentElement.scrollTop > scrollTop
    );
  }

  function shrinkNav() {
    if (scrolled()) {
      document.documentElement.dataset.scrolled = true;
    } else {
      document.documentElement.dataset.scrolled = false;
    }
  }

  function removePreloadClass() {
    if (scrolled()) {
      navHtmlEl.classList.remove('tst-preload');
      Helper.removeScrollFn(removePreloadClass);
    }
  }

  /* ______________________________________
  Hide nav when scrolled down on Mobile
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  function hideNavOnScroll() {
    if (scrollHistory.length < 2) {
      scrollHistory.push(document.documentElement.scrollTop);
    } else {
      scrollHistory.shift();
      scrollHistory.push(document.documentElement.scrollTop);
    }

    if (window.innerWidth <= 425 && scrolled()) {
      if (scrollHistory[0] < scrollHistory[1]) {
        navHtmlEl.classList.add('tst-nav-hide');
      } else {
        navHtmlEl.classList.remove('tst-nav-hide');
      }
    }
  }

  /* ______________________________________
  Mobile Navigation
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */

  function checkNavBreakpoint() {
    const add = () => {
      navHtmlEl.classList.add('tst-nav-mobile');
      mobile = true;
    };

    const remove = () => {
      navHtmlEl.classList.remove('tst-nav-mobile', 'tst-nav-open');
      document.body.style.overflow = 'visible';
      mobile = false;
    };

    if (mobile === null) {
      if (
        window.innerWidth <= navBreakpoint ||
        window.innerWidth <= minBreakpoint
      ) {
        add();
      } else {
        remove();
      }
    } else if (mobile === true) {
      remove();
    } else if (mobile === false) {
      add();
    }
  }

  // why: the width of the nav can only be calculated when the image is loaded
  function navImgLoaded() {
    return new Promise((resolve, reject) => {
      (function interval() {
        if (navImgEl.getClientRects()[0].width > 0) {
          resolve();
        } else {
          navImgTimeout += navImgTimeout;
          setTimeout(interval, navImgTimeout);
        }
      })();
    });
  }

  async function fontsLoaded() {
    // load font that is use in the navigation
    return new Promise((resolve, reject) => {
      const fontFile = new FontFace(
        'Noto Sans',
        `url(${Helper.pathToMain(window.location.pathname)}fonts/noto-sans-v36-latin-regular.woff2)`,
        {
          weight: '400',
          style: 'normal',
          display: 'swap',
        },
      );
      document.fonts.add(fontFile);

      fontFile.load().then(resolve, reject);
    });
  }

  function calculateNavBreakpoint(start = 0) {
    navHtmlEl.classList.remove('tst-nav-mobile');

    let navWidth = start;

    // navWidth += navSubMenuEl * navIconFontSize;
    navWidth += htmlSpaceX * 2;
    navWidth += navImgEl.getClientRects()[0].width;
    navHtmlEl.querySelectorAll('.tst-nav-top-level > li').forEach((li) => {
      navWidth += navGapX;
      navWidth += li.getClientRects()[0].width;
    });

    navBreakpoint = Math.ceil(navWidth);
    navBreakpoint += navSecurePadding;

    // check if the nav should collapse after the image is loaded
    mobile = null;
    checkNavBreakpoint();

    // add function that is called when the window is resized
    // why: to check if the nav links are to wide for the screen
    if (mediaQuery)
      mediaQuery.removeEventListener('change', checkNavBreakpoint);
    mediaQuery = window.matchMedia(
      `(max-width: ${navBreakpoint > minBreakpoint ? navBreakpoint : minBreakpoint}px)`,
    );
    mediaQuery.addEventListener('change', checkNavBreakpoint);
  }

  // why: sets the important vars and waits for the image to load
  async function initNav() {
    navHtmlEl = document.querySelector('#tst-site-nav');
    navImgEl = navHtmlEl.querySelector('#tst-site-nav #tst-site-logo img');
    navSubMenuEl = navHtmlEl.querySelectorAll('.tst-nav-sub-level').length;

    navGapX = parseFloat(
      getComputedStyle(navHtmlEl.children[0]).getPropertyValue('gap'),
    );

    navIconFontSize =
      parseFloat(
        getComputedStyle(document.body).getPropertyValue(
          '--tst-nav-icon-font-size',
        ),
      ) * 10;

    navIconFontSize *= Helper.customFontSizeMultiplier;

    htmlSpaceX = parseFloat(
      getComputedStyle(navHtmlEl.children[0]).getPropertyValue('padding-left'),
    );

    Helper.addScrollFn(shrinkNav);
    Helper.addScrollFn(removePreloadClass);
    Helper.addScrollFn(hideNavOnScroll);

    // highlight the current nav link
    if (Helper.pathToMain(window.location.pathname)) {
      const activeLink = document.querySelector(
        `[data-href="${Helper.getFolderPath(window.location.pathname)}"]`,
      );

      if (activeLink) {
        activeLink.classList.add('tst-active');
      }
    } else {
      const activeLink = document.querySelector(
        `[data-href="${Helper.getFileName(window.location.pathname)}"]`,
      );

      if (activeLink) {
        activeLink.classList.add('tst-active');
      }
    }

    // calculate the min width of the nav for the Breakpoint
    calculateNavBreakpoint(10);

    // wait till the image is loaded so the correct nav width can be calculated
    await navImgLoaded();

    // calculate the min width of the nav for the Breakpoint

    calculateNavBreakpoint(10);

    fontsLoaded().then(
      () => calculateNavBreakpoint(10),
      (err) => {
        console.error('Error while loading the font with js');
        calculateNavBreakpoint(20);
      },
    );
  }

  // add function that is called when the js created content is added to the dom
  // why: to check if the nav links are to wide for the screen
  // this can only be done with js
  Helper.addInitFn(initNav);

  /* ______________________________________
  HTML Elements
  ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯ */
  function nav() {
    return _('nav', { id: 'tst-site-nav', class: 'tst-section tst-preload' }, [
      _('div', { class: 'tst-section-inner' }, [
        _(
          'a',
          {
            href: `${Helper.pathToMain(window.location.pathname)}index.html`,
            id: 'tst-site-logo',
          },
          [
            _('img', {
              src: Helper.imgPath(Helper.navItems.logo.src),
              alt: Helper.navItems.logo.alt,
            }),
          ],
        ),
        // Main Navigation
        // ///////////////////////////////////////////////////////////////////
        _('ul', { class: 'tst-nav-top-level' }, [
          ...Helper.navItems.navigation.reduce((acc, item) => {
            if (item.unterpunkte) {
              acc.push(
                navLink(
                  { href: '#', text: item.parent, data: item.folder },
                  _('ul', null, [
                    navLink(
                      { text: item.text, href: `${item.folder}.html` },
                      null,
                      true,
                    ),
                    ...item.unterpunkte.reduce((accInner, itemInner) => {
                      accInner.push(
                        navLink(
                          {
                            href: itemInner.href,
                            text: itemInner.text,
                          },
                          null,
                          true,
                        ),
                      );
                      return accInner;
                    }, []),
                  ]),
                ),
              );
              return acc;
            }
            acc.push(
              navLink({
                href: item.href,
                text: item.text,
                data: Helper.getFileName(item.href),
              }),
            );
            return acc;
          }, []),
        ]),
        // ///////////////////////////////////////////////////////////////////
        _(
          'button',
          {
            id: 'tst-menu-btn',
          },
          null,
          [
            {
              type: 'click',
              listener: () => {
                if (navHtmlEl.classList.contains('tst-nav-open')) {
                  navHtmlEl.classList.add('tst-nav-close');
                  setTimeout(() => {
                    navHtmlEl.classList.remove('tst-nav-open', 'tst-nav-close');
                  }, 200);
                  document.body.style.overflow = 'visible';
                } else {
                  navHtmlEl.classList.add('tst-nav-open');
                  document.body.style.overflow = 'hidden';
                }
              },
            },
          ],
        ),
        _('div', { class: 'tst-nav-overlay' }, null, [
          {
            type: 'click',
            listener: () => {
              navHtmlEl.classList.add('tst-nav-close');
              setTimeout(() => {
                navHtmlEl.classList.remove('tst-nav-open', 'tst-nav-close');
                document.body.style.overflow = 'visible';
              }, 100);
            },
          },
        ]),
      ]),
    ]);
  }
  return {
    nav,
  };
})();

export default navigation.nav;
