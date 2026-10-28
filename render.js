/* ==========================================================================
   render.js — builds the content pages from window.PORTFOLIO (content.js).
   Runs on the six section pages only (body[data-page] = section id).
   ========================================================================== */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var PF = window.PF;
  if (!P || !PF) { return; }

  var el = PF.el;
  var rich = PF.rich;

  var section = PF.sectionById(PF.page);
  var data = P.pages[PF.page];
  var main = document.getElementById('content');
  if (!section || !data || !main) { return; }

  /* ---------- small builders ---------- */

  function image(img, extraClass) {
    img = img || {};
    var cls = 'figure' + (extraClass ? ' ' + extraClass : '');
    if (img.src) {
      return el('figure', { 'class': cls }, [
        el('img', { src: img.src, alt: img.alt || '', loading: 'lazy' }),
        img.caption ? el('figcaption', null, [rich(img.caption)]) : null
      ]);
    }
    // Placeholder box (no image yet)
    return el('figure', { 'class': cls + ' is-placeholder' }, [
      el('div', { 'class': 'ph-box', role: 'img', 'aria-label': 'Image placeholder' }, [
        el('span', null, [rich(img.caption || '[IMAGE PLACEHOLDER]')])
      ])
    ]);
  }

  function heading(text) {
    return el('h2', { 'class': 'block-title' }, [text]);
  }

  function paragraphs(list) {
    return (list || []).map(function (t) { return el('p', null, [rich(t)]); });
  }

  function tagList(items, cls) {
    if (!items || !items.length) { return null; }
    return el('ul', { 'class': cls || 'chips' }, items.map(function (t) { return el('li', null, [rich(t)]); }));
  }

function entry(it) {
  return el('article', { 'class': 'entry' }, [
    it.meta ? el('p', { 'class': 'entry-meta' }, [rich(it.meta)]) : null,
    el('div', { 'class': 'entry-body' }, [
      el('h3', null, [rich(it.title)]),
      it.subtitle ? el('p', { 'class': 'entry-sub' }, [rich(it.subtitle)]) : null,
      it.body ? el('p', null, [rich(it.body)]) : null,
      it.points && it.points.length
        ? el('ul', { 'class': 'bullets' }, it.points.map(function (p) {
            return el('li', null, [rich(p)]);
          }))
        : null,
      tagList(it.tags, 'chips chips-small'),
      it.images && it.images.length
        ? el('div', { 'class': 'entry-images' }, it.images.map(function (img) {
            return image(img);
          }))
        : null
    ])
  ]);
}

  /* ---------- block renderers ---------- */

  var blocks = {

    text: function (b) {
      return [heading(b.title), el('div', { 'class': 'prose' }, paragraphs(b.paragraphs))];
    },

    split: function (b) {
      var cls = 'split' + (b.image && b.image.portrait ? ' split-portrait' : '');
      return [
        heading(b.title),
        el('div', { 'class': cls }, [
          el('div', { 'class': 'prose' }, paragraphs(b.paragraphs)),
          image(b.image, b.image && b.image.portrait ? 'figure-portrait' : '')
        ])
      ];
    },

    facts: function (b) {
      return [
        heading(b.title),
        el('dl', { 'class': 'facts' }, b.items.map(function (row) {
          return el('div', null, [el('dt', null, [row[0]]), el('dd', null, [rich(row[1])])]);
        }))
      ];
    },

    chips: function (b) {
      return [
        heading(b.title),
        el('div', { 'class': 'chip-groups' }, b.groups.map(function (g) {
          return el('div', { 'class': 'chip-group' }, [
            g.label ? el('h3', null, [rich(g.label)]) : null,
            tagList(g.items)
          ]);
        }))
      ];
    },

    timeline: function (b) {
      return [heading(b.title), el('div', { 'class': 'timeline' }, b.items.map(entry))];
    },

    entries: function (b) {
      return [heading(b.title), el('div', { 'class': 'entries' }, b.items.map(entry))];
    },

    groups: function (b) {
      return [
        heading(b.title),
        el('div', { 'class': 'groups' }, b.groups.map(function (g) {
          return el('section', { 'class': 'group' }, [
            el('h3', { 'class': 'group-label' }, [g.label]),
            el('div', { 'class': 'entries' }, g.items.map(entry))
          ]);
        }))
      ];
    },

    interests: function (b) {
      return [
        heading(b.title),
        el('ul', { 'class': 'interests' }, b.items.map(function (i) {
          return el('li', null, [el('strong', null, [rich(i.name)]), el('span', null, [rich(i.note)])]);
        }))
      ];
    },

    list: function (b) {
      return [
        heading(b.title),
        el('ul', { 'class': 'bullets bullets-large' }, b.items.map(function (t) { return el('li', null, [rich(t)]); }))
      ];
    },

    projects: function (b) {
      return [
        heading(b.title),
        el('div', { 'class': 'projects' }, b.items.map(function (p, idx) {
         var links = [];
if (p.links && p.links.paper) {
  links.push(el('li', null, [PF.extLink(p.links.paper, 'Read the paper ↗')]));
}
if (p.links && p.links.github) {
  links.push(el('li', null, [PF.extLink(p.links.github, 'GitHub ↗')]));
}
if (p.links && p.links.demo) {
  links.push(el('li', null, [PF.extLink(p.links.demo, 'Live demo ↗')]));
}

          var shots = (p.images && p.images.length) ? p.images : [];

          return el('article', {
  'class': 'project' + (shots.length ? '' : ' project-no-shots')
}, [
  shots.length
    ? el('div', { 'class': 'project-shots shots-' + Math.min(shots.length, 2) }, shots.map(function (s) { return image(s); }))
    : null,
            el('div', { 'class': 'project-info' }, [
              el('p', { 'class': 'entry-meta' }, [
                String(idx + 1).padStart(2, '0') + ' · ',
                rich(p.year || ''),
                p.role ? ' · ' : '',
                p.role ? rich(p.role) : ''
              ]),
              el('h3', null, [rich(p.title)]),
              el('p', null, [rich(p.summary)]),
              tagList(p.tech, 'chips chips-small'),
              links.length ? el('ul', { 'class': 'project-links' }, links) : null
            ])
          ]);
        }))
      ];
    }
  };

  /* ---------- page header ---------- */

  var hero = el('header', { 'class': 'page-hero wrap' }, [
    el('a', { 'class': 'back-link', href: 'index.html' }, [el('span', { 'aria-hidden': 'true' }, ['← ']), 'Back to the cube']),
    el('div', { 'class': 'page-hero-row' }, [
      el('span', { 'class': 'page-sticker', 'aria-hidden': 'true' }, [section.num]),
      el('div', null, [
        el('p', { 'class': 'eyebrow' }, ['Section ' + section.num + ' of 06']),
        el('h1', null, [section.title]),
        el('p', { 'class': 'lede' }, [rich(data.intro)])
      ])
    ])
  ]);
  main.parentNode.insertBefore(hero, main);



  /* ---------- body blocks ---------- */

  data.blocks.forEach(function (b) {
    var render = blocks[b.type];
    if (!render) { return; }
    var kids = render(b);
    main.appendChild(el('section', { 'class': 'block block-' + b.type }, kids));
  });

  /* ---------- previous / next pager ---------- */

  var idx = P.sections.indexOf(section);
  var prev = P.sections[(idx + P.sections.length - 1) % P.sections.length];
  var next = P.sections[(idx + 1) % P.sections.length];

  function pagerLink(s, dir) {
    return el('a', { 'class': 'pager-link pager-' + dir, href: s.file, 'data-color': s.color, rel: dir }, [
      el('span', { 'class': 'pager-dir' }, [dir === 'prev' ? '← Previous' : 'Next →']),
      el('span', { 'class': 'pager-title' }, [s.title])
    ]);
  }

  main.appendChild(el('nav', { 'class': 'pager', 'aria-label': 'Other sections' }, [
    pagerLink(prev, 'prev'),
    pagerLink(next, 'next')
  ]));
})();
