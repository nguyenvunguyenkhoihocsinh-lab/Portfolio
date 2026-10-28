/* ==========================================================================
   home.js — homepage lists (quick navigation + index of faces).
   Built from PORTFOLIO.sections so titles and links stay in one place.
   ========================================================================== */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var PF = window.PF;
  if (!P || !PF) { return; }

  var el = PF.el;

  // Compact navigation: an accessible alternative to the cube.
  var quick = document.getElementById('quick-nav-list');
  if (quick) {
    P.sections.forEach(function (s) {
      quick.appendChild(el('li', null, [
        el('a', { href: s.file }, [el('span', { 'class': 'dot', 'data-color': s.color, 'aria-hidden': 'true' }), s.short])
      ]));
    });
  }

  // Index below the fold.
  var index = document.getElementById('index-list');
  if (index) {
    P.sections.forEach(function (s) {
      index.appendChild(el('li', null, [
        el('a', { href: s.file }, [
          el('span', { 'class': 'index-chip', 'data-color': s.color, 'aria-hidden': 'true' }, [s.num]),
          el('span', null, [
            el('span', { 'class': 'index-title' }, [s.title]),
            el('span', { 'class': 'index-blurb' }, [s.blurb])
          ]),
          el('span', { 'class': 'index-arrow', 'aria-hidden': 'true' }, ['→'])
        ])
      ]));
    });
  }
})();
