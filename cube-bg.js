(function () {
  const COLORS = ['#e8323c', '#f7a823', '#ffd53e', '#2c74e6', '#1fa971', '#f1f1f1'];
  const FACES  = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];

  // [x, y, kích thước px, độ mờ px, độ trong suốt]  — x,y tính theo % màn hình
  const CUBES = [
    [80, 14, 300, 5, .95], [3, 88, 270, 7, .95], [93, 90, 230, 6, .9],
    [4, 17, 62, 0, 1],   [22, 18, 78, 0, 1],   [8, 34, 76, 0, 1],
    [40, 11, 64, 0, 1],  [47, 29, 56, 0, 1],   [47, 6, 46, 0, 1],
    [38, 25, 30, 0, .9], [14, 28, 24, 0, .9],  [96, 37, 90, 2, .95],
    [95, 64, 58, 0, 1],  [9, 52, 50, 0, 1],    [14, 51, 28, 0, .8],
    [65, 20, 40, 1, .9], [28, 36, 22, 0, .8]
  ];

  const layer = document.getElementById('cubes');
  const small = innerWidth < 700;
  let seed = 7;
  const rnd = (a, b) => { seed = (seed * 16807) % 2147483647; return a + (seed / 2147483647) * (b - a); };

  CUBES.forEach(([x, y, s, b, o], i) => {
    if (small && s < 60 && i % 2) return;           // ít khối hơn trên điện thoại
    const sz = small ? s * .6 : s;
    const w = document.createElement('div');
    w.className = 'cbg-wrap';
    const st = {
      '--x': x + '%', '--y': y + '%', '--s': sz + 'px', '--b': b + 'px', '--o': o,
      '--ft': rnd(9, 18).toFixed(1) + 's',
      '--fx': rnd(-18, 18).toFixed(0) + 'px', '--fy': rnd(-26, 26).toFixed(0) + 'px',
      '--st': rnd(45, 95).toFixed(0) + 's',
      '--x0': rnd(-40, 40).toFixed(0) + 'deg', '--y0': rnd(0, 90).toFixed(0) + 'deg', '--z0': rnd(-25, 25).toFixed(0) + 'deg',
      '--dx': (rnd(0, 1) > .5 ? 360 : -360) + 'deg', '--dz': (rnd(0, 1) > .5 ? 180 : -180) + 'deg'
    };
    for (const k in st) w.style.setProperty(k, st[k]);
    w.style.animationDelay = (-rnd(0, 12)).toFixed(1) + 's';

    const cube = document.createElement('div');
    cube.className = 'cbg-cube';
    FACES.forEach(f => {
      const face = document.createElement('div');
      face.className = 'cbg-face';
      face.style.setProperty('--f', f);
      for (let c = 0; c < 9; c++) {
        const cell = document.createElement('i');
        cell.style.backgroundColor = COLORS[Math.floor(rnd(0, 6))];
        face.appendChild(cell);
      }
      cube.appendChild(face);
    });
    w.appendChild(cube);
    layer.appendChild(w);
  });

  // Sao
  const cv = document.getElementById('stars'), cx = cv.getContext('2d');
  function stars() {
    const d = devicePixelRatio || 1;
    cv.width = innerWidth * d; cv.height = innerHeight * d;
    cx.scale(d, d);
    const n = Math.round(innerWidth * innerHeight / 5200);
    for (let i = 0; i < n; i++) {
      const r = Math.random() < .08 ? rnd(1.2, 1.9) : rnd(.3, .9);
      cx.fillStyle = `rgba(${Math.random() < .3 ? '255,220,170' : '190,210,255'},${rnd(.25, .9).toFixed(2)})`;
      cx.beginPath();
      cx.arc(Math.random() * innerWidth, Math.random() * innerHeight, r, 0, 6.283);
      cx.fill();
    }
  }
  stars();
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(stars, 200); });

  // Parallax nhẹ theo chuột
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && !small) {
    addEventListener('pointermove', e => {
      const mx = e.clientX / innerWidth - .5, my = e.clientY / innerHeight - .5;
      layer.style.transform = `translate(${(-mx * 22).toFixed(1)}px, ${(-my * 22).toFixed(1)}px)`;
    });
  }
})();