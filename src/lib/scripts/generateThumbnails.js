const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', '..', '..', 'public', 'thumbnails');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const tiktokCards = [
  {
    file: 'tt-01-1.svg',
    title: '3 Marketing Tricks Boutiques Use',
    subtitle: 'Central African Market Price Anchoring',
    curator: 'Curator Clovert Reaves',
    duration: '0:45',
    color1: '#00F0FF',
    color2: '#1E40AF',
    tag: 'RETAIL PSYCHOLOGY',
  },
  {
    file: 'tt-01-2.svg',
    title: 'Why Douala Fashion Brands Get 200 Views',
    subtitle: 'Fixing Hook Speed & 3-Second Framing',
    curator: 'Curator Clovert Reaves',
    duration: '0:34',
    color1: '#3B82F6',
    color2: '#8B5CF6',
    tag: 'HOOK SPEED',
  },
  {
    file: 'tt-02-1.svg',
    title: 'How Agro-Tech Startups Use QR Codes',
    subtitle: 'Connecting Packaging to Mobile Money Ordering',
    curator: 'Curator Sarah Mbarga',
    duration: '0:52',
    color1: '#10B981',
    color2: '#06B6D4',
    tag: 'AGRO-TECH COMMERCE',
  },
  {
    file: 'tt-03-1.svg',
    title: 'Asking Douala Street Vendors Price Secrets',
    subtitle: 'Real-world Negotiations in Akwa Commercial Hub',
    curator: 'Curator Jean-Paul Ngu',
    duration: '0:58',
    color1: '#F59E0B',
    color2: '#EF4444',
    tag: 'STREET INTERVIEWS',
  },
  {
    file: 'tt-04-1.svg',
    title: 'Light Short Videos Without Expensive Gear',
    subtitle: 'Window Diffusion + Cardboard Reflector Hacks',
    curator: 'Curator Amara Kamga',
    duration: '0:40',
    color1: '#EC4899',
    color2: '#8B5CF6',
    tag: 'STUDIO LIGHTING',
  },
  {
    file: 'tt-05-1.svg',
    title: 'Why Billboards Cost 10x More Than TikTok',
    subtitle: 'Yaounde Highway Ads vs 100K Targeted Views',
    curator: 'Curator David Fon',
    duration: '0:49',
    color1: '#06B6D4',
    color2: '#3B82F6',
    tag: 'ROI COMPARISON',
  },
  {
    file: 'tt-06-1.svg',
    title: 'How Douala Creators Sell to Gabon & Chad',
    subtitle: 'CEMAC Cross-Border WhatsApp Funnel',
    curator: 'Curator Clovert Reaves',
    duration: '0:55',
    color1: '#10B981',
    color2: '#3B82F6',
    tag: 'REGIONAL COMMERCE',
  },
  {
    file: 'tt-07-1.svg',
    title: 'Stop Accepting Free Products for Ads',
    subtitle: 'How African Creators Negotiate Upfront Cash',
    curator: 'Curator Sarah Mbarga',
    duration: '0:42',
    color1: '#F59E0B',
    color2: '#10B981',
    tag: 'BRAND CONTRACTS',
  },
  {
    file: 'tt-08-1.svg',
    title: 'Trending Sounds That 10x Watch Time',
    subtitle: 'Cameroon Regional TikTok Audio Audit',
    curator: 'Curator Jean-Paul Ngu',
    duration: '0:38',
    color1: '#8B5CF6',
    color2: '#EC4899',
    tag: 'AUDIO RETENTION',
  },
  {
    file: 'tt-09-1.svg',
    title: 'Supermarket Doubled Baskets Using TikTok',
    subtitle: 'Yaounde Flash Sales & 15s Recipe Shorts',
    curator: 'Curator David Fon',
    duration: '0:46',
    color1: '#00F0FF',
    color2: '#10B981',
    tag: 'RETAIL GROWTH',
  },
];

for (const card of tiktokCards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080C16"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#090D1A"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${card.color1}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${card.color2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${card.color1}"/>
      <stop offset="100%" stop-color="${card.color2}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>

  <!-- Subtle Grid lines -->
  <path d="M0,180 L1280,180 M0,360 L1280,360 M0,540 L1280,540 M320,0 L320,720 M640,0 L640,720 M960,0 L960,720" stroke="#334155" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Top bar tags -->
  <g transform="translate(60, 60)">
    <!-- Platform Pill -->
    <rect width="130" height="42" rx="21" fill="#000000" stroke="${card.color1}" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="32" y="27" fill="${card.color1}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" letter-spacing="1">TIKTOK</text>
    <circle cx="20" cy="21" r="5" fill="#EF4444"/>

    <!-- Category Tag -->
    <rect x="145" width="220" height="42" rx="21" fill="#1E293B" fill-opacity="0.6" stroke="#475569" stroke-opacity="0.4" stroke-width="1"/>
    <text x="165" y="26" fill="#E2E8F0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">${card.tag}</text>
  </g>

  <!-- Center Content Frame -->
  <g transform="translate(60, 220)">
    <text x="0" y="40" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" letter-spacing="-1">
      ${card.title}
    </text>
    <text x="0" y="100" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500">
      ${card.subtitle}
    </text>
  </g>

  <!-- Sound spectrum animation bars -->
  <g transform="translate(60, 480)">
    <rect x="0" y="30" width="8" height="50" rx="4" fill="${card.color1}"/>
    <rect x="16" y="10" width="8" height="70" rx="4" fill="${card.color1}"/>
    <rect x="32" y="40" width="8" height="40" rx="4" fill="${card.color2}"/>
    <rect x="48" y="20" width="8" height="60" rx="4" fill="${card.color1}"/>
    <rect x="64" y="0" width="8" height="80" rx="4" fill="${card.color1}"/>
    <rect x="80" y="25" width="8" height="55" rx="4" fill="${card.color2}"/>
    <rect x="96" y="45" width="8" height="35" rx="4" fill="${card.color1}"/>
    <rect x="112" y="15" width="8" height="65" rx="4" fill="${card.color1}"/>
    <rect x="128" y="35" width="8" height="45" rx="4" fill="${card.color2}"/>
    <rect x="144" y="5" width="8" height="75" rx="4" fill="${card.color1}"/>
  </g>

  <!-- Bottom Curator stamp -->
  <g transform="translate(60, 620)">
    <circle cx="16" cy="16" r="16" fill="#1E40AF"/>
    <text x="11" y="22" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800">CL</text>
    <text x="44" y="21" fill="#00F0FF" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700">
      Curated by ${card.curator}
    </text>
  </g>

  <!-- Duration Badge -->
  <g transform="translate(1120, 620)">
    <rect width="100" height="38" rx="8" fill="#000000" fill-opacity="0.8" stroke="#334155" stroke-width="1"/>
    <text x="26" y="25" fill="#FFFFFF" font-family="monospace" font-size="16" font-weight="700">${card.duration}</text>
  </g>

  <!-- Big Play overlay in right half -->
  <g transform="translate(1000, 320)">
    <circle cx="50" cy="50" r="56" fill="#1E40AF" fill-opacity="0.8" stroke="${card.color1}" stroke-width="3"/>
    <polygon points="42,32 72,50 42,68" fill="#FFFFFF"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, card.file), svg, 'utf-8');
}
console.log('Generated 10 curator video thumbnails in public/thumbnails');
