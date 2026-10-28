/* ==========================================================================
   site.js — shared behaviour: header, footer, data bindings, helpers.
   Exposes a tiny helper object on window.PF used by render.js and cube.js.
   ========================================================================== */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  if (!P) { return; }

  /* ---------- helpers ---------- */

  // Create an element. attrs: object (null/false values are skipped),
  // kids: array of nodes / strings / fragments.
  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) { return; }
        node.setAttribute(k, v === true ? '' : v);
      });
    }
    (kids || []).forEach(function (kid) {
      if (kid === null || kid === undefined || kid === false) { return; }
      node.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  // Turn "[PLACEHOLDER]" segments into highlighted spans so they are easy to spot.
  function rich(text) {
    var frag = document.createDocumentFragment();
    var str = String(text === null || text === undefined ? '' : text);
    var re = /\[[^\]]+\]/g;
    var last = 0;
    var m;
    while ((m = re.exec(str))) {
      if (m.index > last) { frag.appendChild(document.createTextNode(str.slice(last, m.index))); }
      var span = document.createElement('span');
      span.className = 'ph-text';
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < str.length) { frag.appendChild(document.createTextNode(str.slice(last))); }
    return frag;
  }

  function extLink(url, label) {
    return el('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, [
      label,
      el('span', { 'aria-hidden': 'true' }, [' ↗']),
      el('span', { 'class': 'sr-only' }, [' (opens in a new tab)'])
    ]);
  }

  function sectionById(id) {
    for (var i = 0; i < P.sections.length; i++) {
      if (P.sections[i].id === id) { return P.sections[i]; }
    }
    return null;
  }

  var page = document.body.getAttribute('data-page') || 'home';
  var current = sectionById(page);

  window.PF = { el: el, rich: rich, extLink: extLink, sectionById: sectionById, page: page };

  /* ---------- accent colour for the current page ---------- */
  if (current) { document.body.setAttribute('data-accent', current.color); }

  /* ---------- document title ---------- */
  document.title = (current ? current.title : 'Portfolio') + ' — ' + P.site.name;

  /* ---------- header ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var mark = el('span', { 'class': 'brand-mark', 'aria-hidden': 'true' },
      ['red', 'blue', 'yellow', 'green', 'white', 'orange', 'yellow', 'red', 'blue'].map(function (c) {
        return el('i', { 'data-color': c });
      })
    );
    var brand = el('a', { 'class': 'brand', href: 'index.html' }, [mark, el('span', { 'class': 'brand-name' }, [rich(P.site.nickname)])]);

    var toggle = el('button', { 'class': 'nav-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'site-nav' }, ['Menu']);

    var items = P.sections.map(function (s) {
      return el('li', null, [
        el('a', { href: s.file, 'data-color': s.color, 'aria-current': s.id === page ? 'page' : null }, [s.short])
      ]);
    });
    var nav = el('nav', { id: 'site-nav', 'class': 'site-nav', 'aria-label': 'Primary' }, [el('ul', null, items)]);

    header.appendChild(el('div', { 'class': 'wrap header-inner' }, [brand, toggle, nav]));

    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- footer ---------- */
  var footer = document.getElementById('site-footer');
  if (footer) {
    var links = el('ul', { 'class': 'footer-links' });
    var email = P.site.email || '';
    if (/^[^\s@\[\]]+@[^\s@\[\]]+\.[^\s@\[\]]+$/.test(email)) {
      links.appendChild(el('li', null, [el('a', { href: 'mailto:' + email }, [email])]));
    } else if (email) {
      links.appendChild(el('li', null, [rich(email)]));
    }
    (P.site.links || []).forEach(function (l) {
      if (l && l.url) { links.appendChild(el('li', null, [extLink(l.url, l.label)])); }
    });

    footer.appendChild(el('div', { 'class': 'wrap footer-inner' }, [
      el('p', { 'class': 'footer-name' }, ['© ' + new Date().getFullYear() + ' ', rich(P.site.name)]),
      links,
      el('a', { href: '#top' }, ['Back to top ↑'])
    ]));
  }

  /* ---------- data bindings: <span data-bind="site.name"> ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-bind]'), function (node) {
    var value = node.getAttribute('data-bind').split('.').reduce(function (obj, key) {
      return obj ? obj[key] : undefined;
    }, P);
    if (typeof value === 'string') {
      node.textContent = '';
      node.appendChild(rich(value));
    }
  });
})();
