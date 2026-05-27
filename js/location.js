/* ============================================
   LOCATION DETAIL PAGE LOGIC
   Two <img> elements sharing the same decoded image buffer:
   - Background: CSS blur (GPU-accelerated)
   - Foreground: crisp, full-res
   Single decode per photo, pre-decoded before transition.
   ============================================ */

(function () {
  const params = new URLSearchParams(window.location.search);
  const locId = params.get('loc');

  const locIndex = LOCATIONS.findIndex(l => l.id === locId);
  if (locIndex === -1) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#8a857c;font-family:monospace;">Location not found. <a href="index.html" style="color:#d4953a;margin-left:0.5em;">Back</a></div>';
    return;
  }

  const loc = LOCATIONS[locIndex];
  const isSeasonal = loc.isSeasonal === true;
  let currentPhotoIdx = 0;
  let currentSeason = isSeasonal ? Object.keys(loc.seasons)[0] : null;

  const root = document.getElementById('locationRoot');
  root.style.setProperty('--accent', loc.theme.primary);
  root.style.setProperty('--accent-2', loc.theme.accent);
  root.style.setProperty('--theme-bg', loc.theme.bg);
  root.style.setProperty('--theme-primary', loc.theme.primary);

  document.getElementById('chapterTag').textContent = `CHAPTER ${loc.chapter} \u00b7 ${loc.tags[0].toUpperCase()}`;
  document.getElementById('locNameEn').textContent = loc.name;
  document.getElementById('locNameCn').textContent = loc.nameCN;
  document.getElementById('locCoords').textContent = `${loc.coords} \u00b7 ${loc.year}`;

  const tagsContainer = document.getElementById('locTags');
  loc.tags.forEach(t => { const s = document.createElement('span'); s.className = 'tag'; s.textContent = t; tagsContainer.appendChild(s); });
  document.getElementById('locDesc').textContent = loc.description;

  const viewpointsList = document.getElementById('locViewpoints');
  if (!isSeasonal && loc.viewpoints) {
    loc.viewpoints.forEach(v => { const li = document.createElement('li'); li.textContent = v; viewpointsList.appendChild(li); });
  } else { viewpointsList.style.display = 'none'; }

  const totalPhotos = isSeasonal ? Object.values(loc.seasons).reduce((s, x) => s + x.photos.length, 0) : loc.photos.length;
  document.getElementById('exposureCount').textContent = `${String(totalPhotos).padStart(2, '0')} EXPOSURES`;
  document.getElementById('locYearInfo').textContent = `\u00a9 ${loc.year}`;
  document.getElementById('navLoc').textContent = `${loc.name} \u00b7 ${loc.nameCN}`;
  document.title = `FRAME LOG \u00b7 ${loc.name}`;

  const prevBtn = document.getElementById('navPrev');
  const nextBtn = document.getElementById('navNext');
  if (locIndex > 0) { const p = LOCATIONS[locIndex - 1]; prevBtn.style.cursor = 'pointer'; prevBtn.onclick = () => { location.href = `location.html?loc=${p.id}`; }; }
  else { prevBtn.style.opacity = '0.25'; prevBtn.style.cursor = 'default'; }
  if (locIndex < LOCATIONS.length - 1) { const n = LOCATIONS[locIndex + 1]; nextBtn.style.cursor = 'pointer'; nextBtn.onclick = () => { location.href = `location.html?loc=${n.id}`; }; }
  else { nextBtn.style.opacity = '0.25'; nextBtn.style.cursor = 'default'; }

  function getCurrentPhotos() { return isSeasonal && currentSeason ? loc.seasons[currentSeason].photos : loc.photos; }
  function getPhotoPath(idx) { return `photos_display/${loc.id}/${getCurrentPhotos()[idx].file}`; }
  function getPhotoOrientation(idx) { return getCurrentPhotos()[idx].orientation; }
  function getTotalCurrentPhotos() { return getCurrentPhotos().length; }

  // ============================================
  //  PRE-DECODE SYSTEM
  //  Decoded images are kept as Image objects in a map.
  //  Both <img> tags set .src from the same path → shared GPU buffer.
  // ============================================
  const decodedMap = new Map(); // path → Image (fully decoded)

  function preDecode(path) {
    if (decodedMap.has(path)) return decodedMap.get(path);
    const img = new Image();
    const promise = img.decode ? img.decode().then(() => img).catch(() => img) : Promise.resolve(img);
    img.src = path;
    decodedMap.set(path, promise);
    return promise;
  }

  function preDecodeRange(idx) {
    const total = getTotalCurrentPhotos();
    for (let i = 0; i < 4; i++) {
      const target = (idx + i) % total;
      preDecode(getPhotoPath(target));
    }
  }

  // ============================================
  //  SHOW PHOTO
  // ============================================
  let transitionLock = false;
  const stage = document.getElementById('photoStage');
  const stageBg = document.getElementById('stageBg');
  const stagePhoto = document.getElementById('stagePhoto');
  const photoMeta = document.getElementById('photoMeta');
  const photoCounter = document.getElementById('photoCounter');

  async function showPhoto(idx) {
    if (transitionLock) return;
    const photos = getCurrentPhotos();
    if (idx < 0 || idx >= photos.length) return;

    transitionLock = true;
    currentPhotoIdx = idx;
    const photo = photos[idx];
    const path = getPhotoPath(idx);
    const orientation = getPhotoOrientation(idx);

    stage.classList.remove('landscape', 'portrait');
    stage.classList.add(orientation);

    photoMeta.textContent = photo.viewpoint ? `${photo.viewpoint} \u00b7 ${photo.caption}` : (photo.caption || '');
    photoCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    document.querySelectorAll('.contact-thumb').forEach((t, i) => t.classList.toggle('active', i === idx));

    // Fade out
    stagePhoto.style.opacity = '0';
    stagePhoto.style.transform = 'scale(0.97)';
    stageBg.style.opacity = '0';

    // Wait for fade-out + ensure the image is decoded
    await Promise.all([
      new Promise(r => setTimeout(r, 200)),
      preDecode(path)
    ]);

    // Set both <img> sources — browser shares the decoded buffer
    stageBg.src = path;
    stagePhoto.src = path;
    stagePhoto.alt = photo.caption || '';

    // Force layout + fade in
    stageBg.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        stageBg.style.opacity = '1';
        stagePhoto.style.opacity = '1';
        stagePhoto.style.transform = 'scale(1)';
        transitionLock = false;
      });
    });

    // Pre-decode upcoming photos
    preDecodeRange(idx + 1);
  }

  // --- Contact sheet ---
  const contactSheet = document.getElementById('contactSheet');
  function buildContactSheet() {
    contactSheet.querySelectorAll('.contact-thumb').forEach(t => t.remove());
    getCurrentPhotos().forEach((photo, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'contact-thumb';
      if (i === 0) thumb.classList.add('active');
      const img = document.createElement('img');
      img.src = getPhotoPath(i);
      img.alt = photo.caption;
      img.loading = 'lazy';
      thumb.appendChild(img);
      thumb.addEventListener('click', () => showPhoto(i));
      contactSheet.appendChild(thumb);
    });
  }

  // --- Season Tabs (Nashville) ---
  const seasonTabsContainer = document.getElementById('seasonTabs');
  const seasonDesc = document.getElementById('seasonDesc');
  const SD = {
    spring: 'Dogwoods blooming along 21st Ave. The campus wakes up.',
    summer: 'Empty quads, heavy air. The city slows down and the light lasts forever.',
    fall: 'Maple trees turn, brick paths glow. The best season to hold a camera.',
    winter: 'Bare branches against grey sky. The rare snow day that shuts everything down.'
  };

  if (isSeasonal) {
    viewpointsList.style.display = 'none';
    seasonTabsContainer.style.display = 'flex';
    seasonDesc.style.display = 'block';
    Object.entries(loc.seasons).forEach(([key, season]) => {
      const tab = document.createElement('button');
      tab.className = 'season-tab';
      if (key === currentSeason) tab.classList.add('active');
      tab.setAttribute('data-season', key);
      tab.innerHTML = `${season.label}<span class="tab-cn">${season.labelCN}</span>`;
      tab.addEventListener('click', () => {
        document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        root.style.setProperty('--accent', season.accent);
        currentSeason = key; currentPhotoIdx = 0;
        decodedMap.clear();
        buildContactSheet();
        showPhoto(0);
      });
      seasonTabsContainer.appendChild(tab);
    });
    seasonDesc.textContent = SD[currentSeason] || '';
    // Apply initial season accent (spring = pink, not the location default green)
    root.style.setProperty('--accent', loc.seasons[currentSeason].accent);
  } else {
    seasonTabsContainer.style.display = 'none';
    seasonDesc.style.display = 'none';
  }

  // --- Init ---
  buildContactSheet();
  preDecodeRange(0);
  showPhoto(0);

  // --- Keyboard ---
  document.addEventListener('keydown', (e) => {
    const total = getTotalCurrentPhotos();
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentPhotoIdx > 0) {
      e.preventDefault(); showPhoto(currentPhotoIdx - 1);
    }
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentPhotoIdx < total - 1) {
      e.preventDefault(); showPhoto(currentPhotoIdx + 1);
    }
  });

  // --- Wheel ---
  stage.addEventListener('wheel', (e) => {
    if (transitionLock) return;
    e.preventDefault();
    const total = getTotalCurrentPhotos();
    if (e.deltaY > 0 && currentPhotoIdx < total - 1) showPhoto(currentPhotoIdx + 1);
    else if (e.deltaY < 0 && currentPhotoIdx > 0) showPhoto(currentPhotoIdx - 1);
  }, { passive: false });

  // --- Lightbox: full-res original ---
  function openLightbox(src) {
    // Remove existing lightbox if any
    const existing = document.querySelector('.lightbox');
    if (existing) existing.remove();

    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <button class="lightbox-close">&times;</button>
      <img class="lightbox-img" src="${src}" alt="">
      <span class="lightbox-hint">Click anywhere or press Esc to close</span>
    `;

    const close = () => {
      lb.classList.add('lightbox-closing');
      setTimeout(() => lb.remove(), 300);
    };

    lb.querySelector('.lightbox-backdrop').addEventListener('click', close);
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

    const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
    document.addEventListener('keydown', onKey);

    document.body.appendChild(lb);
    requestAnimationFrame(() => lb.classList.add('lightbox-open'));
  }

  // --- Click: open full-res original in lightbox ---
  stage.addEventListener('click', (e) => {
    if (transitionLock || e.target.closest('.contact-sheet')) return;
    const origPath = `photos/${loc.id}/${getCurrentPhotos()[currentPhotoIdx].file}`;
    openLightbox(origPath);
  });
})();
