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
  },
  {
    file: "og-estimate.png",
    eyebrow: "calculator / project estimate",
    title: ["Website cost", "calculator"],
    subtitle: [
      "Estimate budget, timeline and scope for",
      "websites, stores, landing pages and apps."
    ],
    tag: "AI ESTIMATE / BUDGET / TIMELINE",
    accent: "#c94f18",
    label: "Project range",
    diagram: "estimate"
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

  if (type === "estimate") {
    return `
      <rect x="730" y="118" width="366" height="394" rx="34" fill="#fff" stroke="#d7dee8"/>
      <rect x="766" y="158" width="148" height="16" rx="8" fill="#111827" opacity=".86"/>
      <rect x="766" y="204" width="292" height="58" rx="20" fill="#f8fafc" stroke="#d7dee8"/>
      <text x="794" y="240" font-family="Manrope, Arial, sans-serif" font-size="20" font-weight="700" fill="#111827">Corporate website</text>
      <rect x="766" y="292" width="126" height="14" rx="7" fill="${accent}"/>
      <rect x="766" y="326" width="252" height="10" rx="5" fill="#94a3b8" opacity=".44"/>
      <rect x="766" y="352" width="216" height="10" rx="5" fill="#94a3b8" opacity=".44"/>
      <rect x="766" y="392" width="98" height="60" rx="20" fill="#111827" opacity=".94"/>
      <rect x="888" y="392" width="170" height="60" rx="20" fill="#fff7ed" stroke="#fed7aa"/>
      <text x="788" y="429" font-family="Manrope, Arial, sans-serif" font-size="20" font-weight="800" fill="#fff">2-5w</text>
      <text x="914" y="429" font-family="Manrope, Arial, sans-serif" font-size="20" font-weight="800" fill="${accent}">900-2200 EUR</text>`;
  }

  return `
    <rect x="760" y="150" width="320" height="230" rx="30" fill="#fff" stroke="#d7dee8"/>
    <rect x="792" y="194" width="132" height="16" rx="8" fill="#111827" opacity=".9"/>
    <rect x="792" y="246" width="238" height="12" rx="6" fill="#94a3b8" opacity=".45"/>
    <rect x="792" y="284" width="184" height="12" rx="6" fill="${accent}" opacity=".85"/>
    <rect x="792" y="322" width="218" height="12" rx="6" fill="#94a3b8" opacity=".45"/>`;
}

function renderEstimatePreview() {
  return `
<svg width="1440" height="980" viewBox="0 0 1440 980" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="previewBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".58" stop-color="#f2f6f9"/>
      <stop offset="1" stop-color="#e2eaf2"/>
    </linearGradient>
    <filter id="previewShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="34" flood-color="#152033" flood-opacity=".16"/>
    </filter>
    <pattern id="previewGrid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0V34" fill="none" stroke="#94a3b8" stroke-opacity=".1" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1440" height="980" rx="56" fill="url(#previewBg)"/>
  <rect width="1440" height="980" rx="56" fill="url(#previewGrid)"/>
  <circle cx="1220" cy="160" r="330" fill="#cbd5e1" opacity=".34"/>
  <circle cx="150" cy="830" r="280" fill="#c94f18" opacity=".1"/>
  <g filter="url(#previewShadow)">
    <rect x="88" y="112" width="1264" height="756" rx="44" fill="#fff" stroke="#d9e1ea"/>
    <rect x="136" y="172" width="430" height="636" rx="34" fill="#fbfcfd" stroke="#e2e8f0"/>
    <text x="172" y="232" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="800" fill="#111827">Project type</text>
    <rect x="172" y="268" width="344" height="68" rx="22" fill="#fff" stroke="#c94f18" stroke-opacity=".34"/>
    <text x="204" y="312" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="700" fill="#111827">Online store</text>
    <path d="M478 294l14 14 14-14" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="172" y="394" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="800" fill="#111827">Project description</text>
    <rect x="172" y="430" width="344" height="184" rx="26" fill="#fff" stroke="#e2e8f0"/>
    <rect x="204" y="472" width="238" height="12" rx="6" fill="#94a3b8" opacity=".52"/>
    <rect x="204" y="508" width="280" height="12" rx="6" fill="#94a3b8" opacity=".42"/>
    <rect x="204" y="544" width="202" height="12" rx="6" fill="#94a3b8" opacity=".42"/>
    <rect x="172" y="660" width="344" height="72" rx="36" fill="#c94f18"/>
    <text x="248" y="706" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="900" fill="#fff">Calculate estimate</text>
    <rect x="624" y="172" width="656" height="636" rx="34" fill="#fff" stroke="#e2e8f0"/>
    <circle cx="684" cy="232" r="32" fill="#fff7ed" stroke="#fed7aa"/>
    <path d="M680 216l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" fill="none" stroke="#c94f18" stroke-width="5" stroke-linejoin="round"/>
    <text x="742" y="228" font-family="Manrope, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="8" fill="#64748b">PRELIMINARY ESTIMATE</text>
    <text x="742" y="314" font-family="Georgia, serif" font-size="54" fill="#111827">2 400 EUR - 6 800 EUR</text>
    <text x="742" y="376" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="600" fill="#4b5565">Budget, timeline and phases generated</text>
    <text x="742" y="410" font-family="Manrope, Arial, sans-serif" font-size="22" font-weight="600" fill="#4b5565">from your project brief.</text>
    <rect x="680" y="458" width="172" height="132" rx="24" fill="#fbfcfd" stroke="#e2e8f0"/>
    <rect x="884" y="458" width="172" height="132" rx="24" fill="#fbfcfd" stroke="#e2e8f0"/>
    <rect x="1088" y="458" width="132" height="132" rx="24" fill="#fbfcfd" stroke="#e2e8f0"/>
    <text x="708" y="514" font-family="Manrope, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="5" fill="#64748b">TIMELINE</text>
    <text x="708" y="556" font-family="Manrope, Arial, sans-serif" font-size="34" font-weight="800" fill="#111827">4-8w</text>
    <text x="912" y="514" font-family="Manrope, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="5" fill="#64748b">FORMAT</text>
    <text x="912" y="556" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="800" fill="#111827">MVP store</text>
    <text x="1114" y="514" font-family="Manrope, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="5" fill="#64748b">RISK</text>
    <text x="1114" y="556" font-family="Manrope, Arial, sans-serif" font-size="24" font-weight="800" fill="#111827">Medium</text>
    <rect x="680" y="642" width="540" height="18" rx="9" fill="#111827" opacity=".84"/>
    <rect x="680" y="688" width="448" height="12" rx="6" fill="#94a3b8" opacity=".42"/>
    <rect x="680" y="724" width="496" height="12" rx="6" fill="#94a3b8" opacity=".42"/>
  </g>
</svg>`;
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

await sharp(Buffer.from(renderEstimatePreview()))
  .png({compressionLevel: 9, adaptiveFiltering: true})
  .toFile(path.join(publicDir, "estimate-calculator-preview.png"));
