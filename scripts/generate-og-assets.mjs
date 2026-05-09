import path from "node:path";
import {fileURLToPath} from "node:url";
import sharp from "sharp";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");

const defaultOg = {
  file: "og-image.png",
  eyebrow: "oberemchuk.online",
  title: ["Websites that", "work as systems"],
  subtitle: [
    "Development, structure and technical SEO",
    "for business websites and products"
  ],
  tag: "NEXT.JS / REACT / SEO",
  accent: "#9a6a35",
  label: "Product systems",
  diagram: "system"
};

const sectionOgs = [
  {
    file: "og-services.png",
    eyebrow: "services / delivery",
    title: ["Web services", "built to convert"],
    subtitle: [
      "Landing pages, company websites and web apps",
      "with structure, speed and SEO control."
    ],
    tag: "DISCOVERY / BUILD / LAUNCH",
    accent: "#b8733b",
    label: "Offer architecture",
    diagram: "stack"
  },
  {
    file: "og-portfolio.png",
    eyebrow: "portfolio / selected work",
    title: ["Digital work", "with business logic"],
    subtitle: [
      "Selected projects with clearer positioning,",
      "stronger trust and practical outcomes."
    ],
    tag: "CASES / UX / FRONT-END",
    accent: "#3b6f8f",
    label: "Case system",
    diagram: "cards"
  },
  {
    file: "og-blog.png",
    eyebrow: "blog / content layer",
    title: ["Website thinking", "for better launches"],
    subtitle: [
      "Articles about structure, Next.js execution,",
      "SEO-ready launches and relaunch strategy."
    ],
    tag: "STRATEGY / SEO / PRODUCT",
    accent: "#8b6f47",
    label: "Editorial layer",
    diagram: "article"
  },
  {
    file: "og-solutions.png",
    eyebrow: "solutions / search intent",
    title: ["SEO pages", "for real demand"],
    subtitle: [
      "Dedicated landing pages for commercial search",
      "intent, sharper positioning and lead generation."
    ],
    tag: "INTENT / LANDING / GROWTH",
    accent: "#8064a2",
    label: "Intent map",
    diagram: "map"
  }
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderDiagram(type, accent) {
  if (type === "stack") {
    return `
      <rect x="760" y="150" width="310" height="62" rx="18" fill="#fff" stroke="#d7dee8"/>
      <rect x="760" y="236" width="310" height="62" rx="18" fill="#111827" opacity=".94"/>
      <rect x="760" y="322" width="310" height="62" rx="18" fill="#fff" stroke="#d7dee8"/>
      <circle cx="792" cy="181" r="9" fill="${accent}"/><rect x="820" y="174" width="160" height="14" rx="7" fill="#94a3b8" opacity=".55"/>
      <circle cx="792" cy="267" r="9" fill="${accent}"/><rect x="820" y="260" width="200" height="14" rx="7" fill="#fff" opacity=".68"/>
      <circle cx="792" cy="353" r="9" fill="${accent}"/><rect x="820" y="346" width="142" height="14" rx="7" fill="#94a3b8" opacity=".55"/>`;
  }

  if (type === "cards") {
    return `
      <rect x="765" y="140" width="230" height="302" rx="28" fill="#fff" stroke="#d7dee8" transform="rotate(-5 880 291)"/>
      <rect x="852" y="178" width="230" height="302" rx="28" fill="#111827" opacity=".95" transform="rotate(6 967 329)"/>
      <rect x="804" y="222" width="126" height="16" rx="8" fill="${accent}" opacity=".85"/>
      <rect x="804" y="268" width="160" height="12" rx="6" fill="#94a3b8" opacity=".48"/>
      <rect x="895" y="282" width="112" height="12" rx="6" fill="#fff" opacity=".56"/>
      <rect x="895" y="322" width="92" height="12" rx="6" fill="${accent}" opacity=".9"/>`;
  }

  if (type === "article") {
    return `
      <rect x="762" y="134" width="316" height="342" rx="30" fill="#fff" stroke="#d7dee8"/>
      <rect x="796" y="176" width="96" height="12" rx="6" fill="${accent}"/>
      <rect x="796" y="218" width="230" height="20" rx="10" fill="#111827" opacity=".9"/>
      <rect x="796" y="260" width="246" height="10" rx="5" fill="#94a3b8" opacity=".45"/>
      <rect x="796" y="288" width="220" height="10" rx="5" fill="#94a3b8" opacity=".45"/>
      <rect x="796" y="316" width="240" height="10" rx="5" fill="#94a3b8" opacity=".45"/>
      <rect x="796" y="372" width="128" height="42" rx="14" fill="#111827" opacity=".92"/>
      <rect x="944" y="386" width="92" height="12" rx="6" fill="${accent}" opacity=".85"/>`;
  }

  if (type === "map") {
    return `
      <path d="M770 410C816 332 812 250 872 204C930 160 988 186 1042 130" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-dasharray="14 15"/>
      <rect x="748" y="340" width="170" height="96" rx="24" fill="#fff" stroke="#d7dee8"/>
      <rect x="892" y="220" width="178" height="106" rx="24" fill="#111827" opacity=".94"/>
      <circle cx="770" cy="410" r="12" fill="#111827"/><circle cx="872" cy="204" r="12" fill="${accent}"/><circle cx="1042" cy="130" r="12" fill="#111827"/>
      <rect x="774" y="378" width="86" height="12" rx="6" fill="#94a3b8" opacity=".5"/>
      <rect x="922" y="262" width="96" height="12" rx="6" fill="#fff" opacity=".62"/>`;
  }

  return `
    <rect x="760" y="150" width="320" height="230" rx="30" fill="#fff" stroke="#d7dee8"/>
    <rect x="792" y="194" width="132" height="16" rx="8" fill="#111827" opacity=".9"/>
    <rect x="792" y="246" width="238" height="12" rx="6" fill="#94a3b8" opacity=".45"/>
    <rect x="792" y="284" width="184" height="12" rx="6" fill="${accent}" opacity=".85"/>
    <rect x="792" y="322" width="218" height="12" rx="6" fill="#94a3b8" opacity=".45"/>`;
}

function renderOg(config) {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fbfcfd"/>
      <stop offset=".54" stop-color="#edf2f7"/>
      <stop offset="1" stop-color="#dfe7ef"/>
    </linearGradient>
    <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="26" stdDeviation="34" flood-color="#152033" flood-opacity=".15"/>
    </filter>
    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M36 0H0V36" fill="none" stroke="#94a3b8" stroke-opacity=".12" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity=".72"/>
  <circle cx="1045" cy="80" r="300" fill="#cbd5e1" opacity=".36"/>
  <circle cx="110" cy="552" r="250" fill="${config.accent}" opacity=".13"/>
  <g filter="url(#shadow)">${renderDiagram(config.diagram, config.accent)}</g>
  <g transform="translate(92 86)">
    <text x="0" y="96" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="8" fill="#7b8796">${escapeXml(config.eyebrow)}</text>
    <text x="0" y="206" font-family="Manrope, Arial, sans-serif" font-size="70" font-weight="800" letter-spacing="2" fill="#111827">${escapeXml(config.title[0])}</text>
    <text x="0" y="286" font-family="Manrope, Arial, sans-serif" font-size="70" font-weight="800" letter-spacing="2" fill="#111827">${escapeXml(config.title[1])}</text>
    <text x="4" y="350" font-family="Manrope, Arial, sans-serif" font-size="27" font-weight="500" fill="#4b5565">${escapeXml(config.subtitle[0])}</text>
    <text x="4" y="386" font-family="Manrope, Arial, sans-serif" font-size="27" font-weight="500" fill="#4b5565">${escapeXml(config.subtitle[1])}</text>
    <rect x="4" y="444" width="322" height="2" fill="#111827" opacity=".16"/>
    <text x="4" y="496" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="5" fill="${config.accent}">${escapeXml(config.tag)}</text>
  </g>
  <g transform="translate(824 448)">
    <rect x="0" y="0" width="252" height="58" rx="18" fill="#fff" opacity=".72" stroke="#d7dee8"/>
    <text x="24" y="37" font-family="Manrope, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="3" fill="#111827">${escapeXml(config.label)}</text>
  </g>
</svg>`;
}

async function writeOg(config) {
  await sharp(Buffer.from(renderOg(config)))
    .png({compressionLevel: 9, adaptiveFiltering: true})
    .toFile(path.join(publicDir, config.file));
}

for (const config of [defaultOg, ...sectionOgs]) {
  await writeOg(config);
}
