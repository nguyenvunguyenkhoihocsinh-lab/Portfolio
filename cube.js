/* ==========================================================================
   cube.js — the interactive CSS-3D cube on the homepage.

   How it works
   - The cube is built from PORTFOLIO.sections, so every face is a real <a href>
     that always points at its own page, whatever the cube's orientation.
   - Orientation is two angles (rx, ry) written to CSS variables.
   - Pointer drag rotates the cube. A drag that moves more than a few pixels
     cancels the click that follows, so rotating never triggers navigation,
     while a plain click/tap on a face follows its link.
   - Keyboard: focus the cube, then use the arrow keys (rotate by one face),
     Home (reset) or Enter (open the face that is facing you).
   ========================================================================== */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var PF = window.PF;
  var scene = document.getElementById('cube-scene');
  if (!P || !PF || !scene) { return; }

  var el = PF.el;
  var DEFAULT = { rx: -24, ry: -34 };
  var DRAG_THRESHOLD = 6;      // px before a press becomes a drag
  var DRAG_SPEED = 0.45;       // degrees per px
  var CLICK_GUARD_MS = 120;

  var rx = DEFAULT.rx;
  var ry = DEFAULT.ry;

  /* ---------- build the cube ---------- */

  var cube = el('div', { 'class': 'cube', id: 'cube' });
  var faceEls = {};   // id -> element

  P.sections.forEach(function (s) {
    var stickers = [];
    for (var i = 0; i < 9; i++) {
      if (i === 4) {
        stickers.push(el('div', { 'class': 'sticker is-center', 'aria-hidden': 'true' }, [
          el('b', null, [s.num]),
          el('span', null, [s.short])
        ]));
      } else {
        stickers.push(el('div', { 'class': 'sticker', 'aria-hidden': 'true' }));
      }
    }
    var face = el('a', {
      'class': 'face',
      href: s.file,
      draggable: 'false',
      tabindex: '-1',
      'data-face': s.face,
      'data-color': s.color,
      'data-id': s.id,
      'aria-label': s.title + ' — open section ' + s.num
    }, stickers);
    faceEls[s.id] = face;
    cube.appendChild(face);
  });

  var shadow = el('div', { 'class': 'cube-shadow', 'aria-hidden': 'true' });
  scene.appendChild(shadow);
  scene.appendChild(cube);

  /* ---------- orientation maths ---------- */

  // Face normals in cube space (CSS: x right, y down, z toward viewer).
  var NORMALS = {
    front: [0, 0, 1], back: [0, 0, -1], right: [1, 0, 0],
    left: [-1, 0, 0], top: [0, -1, 0], bottom: [0, 1, 0]
  };
  // Orientation (rx, ry) that puts each face squarely in front.
  var FACE_POSE = {
    front: { rx: 0, ry: 0 }, right: { rx: 0, ry: -90 }, left: { rx: 0, ry: 90 },
    back: { rx: 0, ry: 180 }, top: { rx: -90, ry: 0 }, bottom: { rx: 90, ry: 0 }
  };

  function rad(d) { return d * Math.PI / 180; }

  // The cube is transformed by rotateX(rx) rotateY(ry): rotate about Y first, then X.
  function depthOf(normal) {
    var x = normal[0], y = normal[1], z = normal[2];
    var cy = Math.cos(rad(ry)), sy = Math.sin(rad(ry));
    var z1 = -x * sy + z * cy;
    var y1 = y;
    var cx = Math.cos(rad(rx)), sx = Math.sin(rad(rx));
    return y1 * sx + z1 * cx;
  }

  function facingSection() {
    var best = null, bestDepth = -2;
    P.sections.forEach(function (s) {
      var d = depthOf(NORMALS[s.face]);
      if (d > bestDepth) { bestDepth = d; best = s; }
    });
    return best;
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ---------- rendering ---------- */

  var statusEl = document.getElementById('cube-status');
  var liveEl = document.getElementById('cube-live');
  var facing = null;
  var liveTimer = null;
  var frame = null;

  function paint() {
    frame = null;
    cube.style.setProperty('--rx', rx + 'deg');
    cube.style.setProperty('--ry', ry + 'deg');

    var f = facingSection();
    if (f !== facing) {
      facing = f;
      P.sections.forEach(function (s) {
        // Only the face pointing at the viewer is reachable by Tab,
        // so keyboard focus never lands on an invisible face.
        faceEls[s.id].setAttribute('tabindex', s.id === f.id ? '0' : '-1');
      });
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.appendChild(document.createTextNode('Facing you: '));
        statusEl.appendChild(el('strong', null, [f.title]));
      }
    }
  }

  function schedulePaint() {
    if (!frame) { frame = requestAnimationFrame(paint); }
  }

  function announce() {
    if (!liveEl) { return; }
    clearTimeout(liveTimer);
    liveTimer = setTimeout(function () {
      var f = facingSection();
      liveEl.textContent = 'Facing ' + f.title + '. Press Enter to open.';
    }, 500);
  }

  function animateTo(nextRx, nextRy) {
    rx = nextRx;
    ry = nextRy;
    cube.classList.add('is-animating');
    schedulePaint();
    announce();
  }

  cube.addEventListener('transitionend', function () { cube.classList.remove('is-animating'); });

  /* ---------- stepping by one face (buttons + keyboard) ---------- */

  function snapped() {
    return {
      rx: clamp(Math.round(rx / 90) * 90, -90, 90),
      ry: Math.round(ry / 90) * 90
    };
  }

  function step(dir) {
    var s = snapped();
    var nextRx = s.rx, nextRy = s.ry;
    var wasTilted = Math.abs(rx - s.rx) > 1 || Math.abs(ry - s.ry) > 1;

    if (dir === 'left' || dir === 'right') {
      nextRx = 0;                                   // always turn around the vertical axis
      nextRy = s.ry + (dir === 'right' ? 90 : -90);
    } else if (dir === 'up') {                      // bottom comes to the front
      nextRx = clamp(s.rx + 90, -90, 90);
    } else if (dir === 'down') {                    // top comes to the front
      nextRx = clamp(s.rx - 90, -90, 90);
    }
    // If the cube was resting at an angle, the first press just squares it up
    // in the pressed direction (keeps behaviour predictable).
    if (wasTilted && (dir === 'up' || dir === 'down')) { nextRy = s.ry; }

    animateTo(nextRx, nextRy);
  }

  function reset() { animateTo(DEFAULT.rx, DEFAULT.ry); }

  function showFace(id) {
    var s = PF.sectionById(id);
    if (!s) { return; }
    var pose = FACE_POSE[s.face];
    // keep ry within a half-turn of where it is now to avoid long spins
    var base = Math.round((ry - pose.ry) / 360) * 360;
    animateTo(pose.rx, pose.ry + base);
  }
  window.PF.showFace = showFace;

  Array.prototype.forEach.call(document.querySelectorAll('[data-cube-dir]'), function (btn) {
    btn.addEventListener('click', function () {
      var dir = btn.getAttribute('data-cube-dir');
      if (dir === 'reset') { reset(); } else { step(dir); }
    });
  });

  /* ---------- drag to rotate ---------- */

  var drag = null;          // active drag state
  var suppressClick = false;
  var suppressTimer = null;

  scene.addEventListener('pointerdown', function (e) {
    if (drag || (e.pointerType === 'mouse' && e.button !== 0)) { return; }
    clearTimeout(suppressTimer);
    suppressClick = false;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lastX: e.clientX, lastY: e.clientY, moved: false };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  });

  function onMove(e) {
    if (!drag || e.pointerId !== drag.id) { return; }
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < DRAG_THRESHOLD) { return; }
      drag.moved = true;
      cube.classList.remove('is-animating');
      scene.classList.add('is-dragging');
    }
    ry += (e.clientX - drag.lastX) * DRAG_SPEED;
    rx = clamp(rx - (e.clientY - drag.lastY) * DRAG_SPEED, -90, 90);
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
    schedulePaint();
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) { return; }
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (drag.moved) {
      // The browser still fires a click on the face under the pointer; swallow it.
      suppressClick = true;
      suppressTimer = setTimeout(function () { suppressClick = false; }, CLICK_GUARD_MS);
      announce();
    }
    scene.classList.remove('is-dragging');
    drag = null;
  }

  // Capture phase: runs before the link's default action.
  scene.addEventListener('click', function (e) {
    if (suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    }
  }, true);

  // Stop the browser starting a native link/image drag.
  scene.addEventListener('dragstart', function (e) { e.preventDefault(); });

  /* ---------- keyboard ---------- */

  scene.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) { return; }
    var map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
    if (map[e.key]) {
      e.preventDefault();
      step(map[e.key]);
    } else if (e.key === 'Home' || e.key === 'Escape') {
      e.preventDefault();
      reset();
    } else if (e.key === 'Enter' && e.target === scene) {
      e.preventDefault();
      var f = facingSection();
      if (f) { window.location.href = f.file; }
    }
  });

  paint();
  announce();
})();
