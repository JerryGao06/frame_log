/* ============================================
   LOCATION / PHOTO CONFIG
   改你自己的地点和照片就在这里。
   Drop your photos into photos/<location-id>/
   ============================================ */

const SITE = {
  title: 'FRAME LOG',
  subtitle: 'A PHOTOGRAPHIC JOURNAL',
  intro: 'A personal archive of light, shadow, and places that leave a mark.',
  equipment: 'Nikon Z6 II · NIKKOR Z 24-70mm f/2.8 S · NIKKOR Z 70-200mm f/2.8 VR S',
  devInfo: 'DEV 05.2026 · SELF-PROCESSED'
};

const LOCATIONS = [
  {
    id: 'banff',
    chapter: '01',
    name: 'BANFF',
    nameCN: '班夫国家公园',
    year: '2025',
    coords: '51.425, -116.177',
    tags: ['Peaks', 'Glaciers', 'Road Trip'],
    description: 'Turquoise water that looks digitally altered but isn\'t. Five days on the Icefields Parkway, peaks that make you feel small in the best way.',
    theme: { primary: '#3eb09a', accent: '#7ee8c8', bg: '#0b1713' },
    coverPhoto: '01.jpg',
    viewpoints: [
      'Abraham Lake · 亚伯拉罕湖',
      'Lake Minnewanka · 明尼万卡湖',
      'Peyto Lake · 佩托湖',
      'Lake Louise · 路易斯湖',
      'Emerald Lake · 翡翠湖'
    ],
    photos: [
      { file: '01.jpg', orientation: 'portrait', caption: 'Banff', viewpoint: '' },
      { file: '02.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '05.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '06.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '07.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '08.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '09.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '10.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '11.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '12.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '13.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '14.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '15.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '16.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '17.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '18.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '19.jpg', orientation: 'landscape', caption: '', viewpoint: '' }
    ]
  },
  {
    id: 'bigisland',
    chapter: '02',
    name: 'BIG ISLAND',
    nameCN: '夏威夷大岛',
    year: '2026',
    coords: '19.821, -155.468',
    tags: ['Volcano', 'Ocean', 'Stars'],
    description: 'The only place where lava meets ocean under a sky full of stars. From sea level to 14,000 feet in two hours.',
    theme: { primary: '#e0653a', accent: '#f0a070', bg: '#180e08' },
    coverPhoto: '01.jpg',
    viewpoints: [
      'Mauna Kea Observatories · 莫纳克亚天文台',
      'Southmost Point · 美国最南端',
      'Black Beach · 黑沙滩',
      'Volcano National Park · 火山国家公园'
    ],
    photos: [
      { file: '01.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '02.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '05.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '06.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '07.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '08.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '09.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '10.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '11.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '12.jpg', orientation: 'portrait', caption: '', viewpoint: '' }
    ]
  },
  {
    id: 'nyboston',
    chapter: '03',
    name: 'NY & BOSTON',
    nameCN: '纽约·波士顿',
    year: '2024',
    coords: '40.765, -73.973',
    tags: ['Urban', 'Sunset'],
    description: 'Two cities, one trip. Manhattan\'s vertical ambition meets Boston\'s brick-and-ivy restraint. Chasing golden hour through urban canyons.',
    theme: { primary: '#b8784a', accent: '#d4a880', bg: '#140e08' },
    coverPhoto: '01.jpg',
    viewpoints: [
      'Fifth Avenue · 第五大道',
      'Newbury Street · 纽伯里街'
    ],
    photos: [
      { file: '01.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '02.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '05.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '06.jpg', orientation: 'landscape', caption: '', viewpoint: '' }
    ]
  },
  {
    id: 'nashville',
    chapter: '04',
    name: 'NASHVILLE',
    nameCN: '纳什维尔',
    year: '2024—',
    coords: '36.163, -86.782',
    tags: ['College', 'Seasons', 'Street'],
    description: 'Not a destination. Four years of watching the same streets change color, the same campus shift through seasons. A document of becoming.',
    theme: { primary: '#8aaa40', accent: '#bcd880', bg: '#0e140a' },
    coverPhoto: '01.jpg',
    isSeasonal: true,
    seasonCovers: {
      spring: 'spring-01.jpg',
      summer: 'summer-01.jpg',
      fall: 'fall-01.jpg',
      winter: 'winter-04.jpg'
    },
    seasons: {
      spring: {
        label: 'SPRING',
        labelCN: '春',
        accent: '#d4849a',
        photos: [
          { file: 'spring-01.jpg', orientation: 'landscape', caption: '' },
          { file: 'spring-02.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-03.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-04.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-05.jpg', orientation: 'landscape', caption: '' },
          { file: 'spring-06.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-07.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-08.jpg', orientation: 'landscape', caption: '' },
          { file: 'spring-09.jpg', orientation: 'portrait', caption: '' },
          { file: 'spring-10.jpg', orientation: 'portrait', caption: '' }
        ]
      },
      summer: {
        label: 'SUMMER',
        labelCN: '夏',
        accent: '#5e9e8c',
        photos: [
          { file: 'summer-01.jpg', orientation: 'landscape', caption: '' },
          { file: 'summer-02.jpg', orientation: 'portrait', caption: '' },
          { file: 'summer-03.jpg', orientation: 'portrait', caption: '' },
          { file: 'summer-04.jpg', orientation: 'landscape', caption: '' }
        ]
      },
      fall: {
        label: 'FALL',
        labelCN: '秋',
        accent: '#b85a30',
        photos: [
          { file: 'fall-01.jpg', orientation: 'landscape', caption: '' },
          { file: 'fall-02.jpg', orientation: 'portrait', caption: '' },
          { file: 'fall-03.jpg', orientation: 'portrait', caption: '' },
          { file: 'fall-04.jpg', orientation: 'portrait', caption: '' },
          { file: 'fall-05.jpg', orientation: 'landscape', caption: '' },
          { file: 'fall-06.jpg', orientation: 'landscape', caption: '' }
        ]
      },
      winter: {
        label: 'WINTER',
        labelCN: '冬',
        accent: '#7a8ea8',
        photos: [
          { file: 'winter-01.jpg', orientation: 'portrait', caption: '' },
          { file: 'winter-02.jpg', orientation: 'portrait', caption: '' },
          { file: 'winter-03.jpg', orientation: 'landscape', caption: '' },
          { file: 'winter-04.jpg', orientation: 'landscape', caption: '' },
          { file: 'winter-05.jpg', orientation: 'landscape', caption: '' },
          { file: 'winter-06.jpg', orientation: 'portrait', caption: '' }
        ]
      }
    }
  },
  {
    id: 'keywest',
    chapter: '04',
    name: 'KEY WEST',
    nameCN: '基韦斯特',
    year: '2025',
    coords: '24.555, -81.780',
    tags: ['Ocean', 'Sunset', 'Flight'],
    description: 'Mile marker zero. Where the road ends and the sun puts on a show every single evening. Warm wind, pastel streets, the Atlantic on one side and the Gulf on the other.',
    theme: { primary: '#e0a050', accent: '#f0c880', bg: '#160e08' },
    coverPhoto: '01.jpg',
    viewpoints: [
      'Mallory Square · 日落广场',
      'Southernmost Point · 最南端浮标',
      'Duval Street · 杜瓦尔街',
      'Smathers Beach · 滨海沙滩'
    ],
    photos: [
      { file: '01.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '02.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'landscape', caption: '', viewpoint: '' }
    ]
  },
  {
    id: 'hongkong',
    chapter: '05',
    name: 'HONG KONG',
    nameCN: '香港',
    year: '2023',
    coords: '22.276, 114.145',
    tags: ['城市', '夜景'],
    description: '垂直城市永不熄灯。霓虹倒映在雨后的街道，山顶午夜俯瞰港湾如银河。',
    theme: { primary: '#e04868', accent: '#f07098', bg: '#16080e' },
    coverPhoto: '01.jpg',
    viewpoints: [
      '太平山顶',
      '尖沙咀海滨',
      '旺角',
      '庙街夜市'
    ],
    photos: [
      { file: '01.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '02.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '05.jpg', orientation: 'portrait', caption: '', viewpoint: '' }
    ]
  },
  {
    id: 'hailing',
    chapter: '06',
    name: 'HAILING ISLAND',
    nameCN: '海陵岛',
    year: '2024',
    coords: '21.580, 111.830',
    tags: ['大海', '晚霞', '夏日'],
    description: '夏天浓缩成一座岛。渔船入港，晚霞每天烧一遍天，咸湿的海风里皆是青春。',
    theme: { primary: '#4a90c0', accent: '#88c8f0', bg: '#091219' },
    coverPhoto: '01.jpg',
    viewpoints: [
      '大角湾',
      '十里银滩',
      '马尾岛',
      '闸坡渔港'
    ],
    photos: [
      { file: '01.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '02.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '03.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '04.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '05.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '06.jpg', orientation: 'portrait', caption: '', viewpoint: '' },
      { file: '07.jpg', orientation: 'landscape', caption: '', viewpoint: '' },
      { file: '08.jpg', orientation: 'landscape', caption: '', viewpoint: '' }
    ]
  }
];
