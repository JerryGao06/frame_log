# FRAME LOG — Photographic Journal

Personal photography portfolio. Dark editorial theme, vanilla HTML/CSS/JS, no build tools.

## Structure

```
photography-portfolio/
├── index.html          ← Homepage with location cards
├── location.html       ← Detail page (?loc=banff, ?loc=nashville, etc.)
├── css/style.css
├── js/
│   ├── config.js       ← EDIT THIS: your locations, photos, descriptions
│   ├── main.js
│   └── location.js
└── photos/
    ├── banff/          ← 01.jpg, 02.jpg, ...
    ├── bigisland/
    ├── nyboston/
    ├── nashville/      ← spring-01.jpg, summer-01.jpg, etc.
    ├── keywest/
    ├── hongkong/
    └── hailing/
```

## Getting Started

1. Drop photos into `photos/<location-id>/`
2. Edit `js/config.js` — update photo filenames, captions, orientation
3. Open `index.html` in a browser

## Photo Formats

- Recommended: 2000px+ on the long edge, JPG/PNG/WebP
- Set `orientation` per photo: `"landscape"` or `"portrait"`
- Nashville uses seasonal naming: `spring-01.jpg`, `summer-01.jpg`, etc.

## Nashville Special Page

Nashville is a seasonal location. The detail page shows four season tabs (春/夏/秋/冬). Each tab has its own photos, theme accent color, and seasonal description. The homepage card shows a "四季 · FOUR SEASONS" badge and a four-color seasonal strip on hover.
