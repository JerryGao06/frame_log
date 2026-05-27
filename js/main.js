/* ============================================
   HOME PAGE LOGIC
   ============================================ */

(function () {
  // --- Populate static text ---
  document.getElementById('homeTitle').textContent = SITE.title;
  document.getElementById('homeSubtitle').textContent = SITE.subtitle;
  document.getElementById('homeIntro').textContent = SITE.intro;
  document.getElementById('homeEquip').textContent = SITE.equipment;
  document.getElementById('homeDev').textContent = SITE.devInfo;

  const container = document.getElementById('cardsContainer');

  // --- Separate Nashville from rest ---
  const nashville = LOCATIONS.find(l => l.isSeasonal);
  const others = LOCATIONS.filter(l => !l.isSeasonal);

  // ========================================
  //  NASHVILLE — Standalone Quadrant Card
  // ========================================
  if (nashville) {
    const nCard = document.createElement('a');
    nCard.className = 'nashville-card reveal';
    nCard.href = `location.html?loc=${nashville.id}`;
    nCard.style.setProperty('--accent', nashville.theme.primary);

    const base = `photos_display/${nashville.id}/`;

    nCard.innerHTML = `
      <div class="nash-quad nash-quad-spring" style="background-image:url('${base}${nashville.seasonCovers.spring}')">
        <span class="quad-label">SPRING</span>
      </div>
      <div class="nash-quad nash-quad-summer" style="background-image:url('${base}${nashville.seasonCovers.summer}')">
        <span class="quad-label">SUMMER</span>
      </div>
      <div class="nash-quad nash-quad-fall" style="background-image:url('${base}${nashville.seasonCovers.fall}')">
        <span class="quad-label">FALL</span>
      </div>
      <div class="nash-quad nash-quad-winter" style="background-image:url('${base}${nashville.seasonCovers.winter}')">
        <span class="quad-label">WINTER</span>
      </div>
      <div class="nash-overlay"></div>
      <div class="nash-content">
        <span class="nash-chapter">✦</span>
        <span class="nash-title">${nashville.name}</span>
        <span class="nash-badge">四季 · FOUR SEASONS</span>
        <span class="nash-meta">${nashville.nameCN} · ${nashville.year} · ${nashville.tags.join(' / ')}</span>
      </div>
      <div class="nash-strip">
        <span style="background:#d4849a"></span>
        <span style="background:#5e9e8c"></span>
        <span style="background:#b85a30"></span>
        <span style="background:#7a8ea8"></span>
      </div>
    `;

    container.appendChild(nCard);
  }

  // ========================================
  //  REGULAR LOCATION CARDS
  // ========================================
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  others.forEach((loc, i) => {
    const card = document.createElement('a');
    card.className = 'location-card reveal';
    card.href = `location.html?loc=${loc.id}`;
    card.style.animationDelay = `${0.1 + i * 0.07}s`;

    const coverPath = `photos_display/${loc.id}/${loc.coverPhoto}`;

    card.innerHTML = `
      <div class="card-bg-img" style="background-image:url('${coverPath}')"></div>
      <div class="card-accent" style="background:${loc.theme.primary}"></div>
      <div class="card-overlay"></div>
      <div class="card-content">
        <span class="card-num">${loc.chapter}</span>
        <span class="card-title">${loc.name}</span>
        <span class="card-meta">${loc.nameCN} · ${loc.year} · ${loc.tags[0]}</span>
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);

  // --- Stagger reveal ---
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.animationPlayState = 'running';
    });
  });
})();
