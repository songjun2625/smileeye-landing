// =============================================================
// Gangnam Smile · Design System Generator (Figma Plugin)
// 한 번 실행하면 현재 Figma 파일에:
//   1) 컬러 스타일 (Paint Styles) 20종
//   2) 텍스트 스타일 (Text Styles) 9종
//   3) "01 Foundation" 페이지 — 컬러/타이포 쇼케이스
//   4) "02 Components" 페이지 — Button/Tag/Stat/Card/Doctor/Timeline
//   5) "03 Card News 1080" 페이지 — 1080×1080 마스터 + 7-page 템플릿 + Safe Zone
//   6) "04 Cover" 페이지 — 디자인 시스템 표지
// 를 모두 자동 생성합니다.
// =============================================================

const FONTS = {
  pretendard: { family: "Pretendard", style: "Regular" },
  pretendardM: { family: "Pretendard", style: "Medium" },
  pretendardSB: { family: "Pretendard", style: "SemiBold" },
  pretendardB: { family: "Pretendard", style: "Bold" },
  pretendardBL: { family: "Pretendard", style: "Black" },
  inter: { family: "Inter", style: "Regular" },
  interM: { family: "Inter", style: "Medium" },
  interSB: { family: "Inter", style: "SemiBold" },
  cormorantI: { family: "Cormorant Garamond", style: "Italic" },
  cormorantSB: { family: "Cormorant Garamond", style: "SemiBold" },
  cormorantMI: { family: "Cormorant Garamond", style: "Medium Italic" },
  noto: { family: "Noto Sans", style: "Regular" },
  notoSB: { family: "Noto Sans", style: "SemiBold" },
  notoMongolian: { family: "Noto Sans Mongolian", style: "Regular" }
};

// Color tokens — hex → {r,g,b} 0-1 range
function hex(h) {
  const v = h.replace("#", "");
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255
  };
}
function solid(h, opacity = 1) {
  return { type: "SOLID", color: hex(h), opacity };
}

const COLORS = [
  // Primary
  { name: "Brand/navy",       hex: "#1C2CAE", desc: "기본 · 로고 · CTA" },
  { name: "Brand/navy-deep",  hex: "#131A8A", desc: "호버 · 푸터" },
  { name: "Brand/navy-soft",  hex: "#4654D6", desc: "그라디언트 보조" },
  { name: "Brand/navy-pale",  hex: "#DDE0F0", desc: "연한 강조" },
  { name: "Brand/navy-tint",  hex: "#EEF0F7", desc: "배경 강조" },
  { name: "Brand/gold",       hex: "#E8B143", desc: "포인트 · 띠지 텍스트" },
  // Surface
  { name: "Surface/white",    hex: "#FFFFFF", desc: "기본 배경" },
  { name: "Surface/cream",    hex: "#FCFAF5", desc: "따뜻한 베이스" },
  { name: "Surface/ivory",    hex: "#FBF8F0", desc: "섹션 구분" },
  { name: "Surface/bg-soft",  hex: "#F5F6FA", desc: "연한 회색 배경" },
  { name: "Surface/bg-warm",  hex: "#EEF0F7", desc: "따뜻한 회색 배경" },
  // Ink
  { name: "Ink/ink",          hex: "#1A1D2C", desc: "기본 텍스트" },
  { name: "Ink/ink-soft",     hex: "#5D6378", desc: "서브 텍스트" },
  { name: "Ink/ink-mute",     hex: "#8A90A3", desc: "캡션" },
  { name: "Ink/grey",         hex: "#A8ACBA", desc: "비활성" },
  // Semantic
  { name: "Semantic/success", hex: "#22C55E", desc: "정상 · 확정" },
  { name: "Semantic/warning", hex: "#F59E0B", desc: "주의" },
  { name: "Semantic/danger",  hex: "#EF4444", desc: "리스크 · MYTH" },
  { name: "Semantic/info",    hex: "#3B82F6", desc: "정보 · 링크" },
  // Lines
  { name: "Line/line",        hex: "#1C2CAE", opacity: 0.1, desc: "구분선" }
];

// Text style tokens
const TEXT_STYLES = [
  { name: "Display",     font: FONTS.pretendardBL, size: 88, lineH: 88,  spacing: -0.03 },
  { name: "H1",          font: FONTS.pretendardB,  size: 56, lineH: 64,  spacing: -0.02 },
  { name: "H2",          font: FONTS.pretendardSB, size: 36, lineH: 44,  spacing: -0.01 },
  { name: "H3",          font: FONTS.pretendardSB, size: 24, lineH: 32,  spacing: -0.005 },
  { name: "Body Large",  font: FONTS.pretendard,   size: 18, lineH: 30,  spacing: 0 },
  { name: "Body",        font: FONTS.pretendard,   size: 15, lineH: 26,  spacing: 0 },
  { name: "Caption",     font: FONTS.pretendardM,  size: 12, lineH: 18,  spacing: 0.6 },
  { name: "Eyebrow",     font: FONTS.interM,       size: 11, lineH: 14,  spacing: 3.3, upper: true },
  { name: "Italic Accent", font: FONTS.cormorantMI, size: 32, lineH: 38, spacing: 0 }
];

// =============================================================
// Helpers
// =============================================================
async function loadAllFonts() {
  const seen = new Set();
  const tasks = [];
  for (const k in FONTS) {
    const key = FONTS[k].family + "·" + FONTS[k].style;
    if (seen.has(key)) continue;
    seen.add(key);
    tasks.push(figma.loadFontAsync(FONTS[k]));
  }
  await Promise.all(tasks);
}

function makeFrame(name, x, y, w, h, fillHex) {
  const f = figma.createFrame();
  f.name = name;
  f.x = x;
  f.y = y;
  f.resize(w, h);
  f.fills = fillHex ? [solid(fillHex)] : [];
  f.cornerRadius = 0;
  f.clipsContent = false;
  return f;
}

function makeRect(name, x, y, w, h, fillHex, radius = 0) {
  const r = figma.createRectangle();
  r.name = name;
  r.x = x;
  r.y = y;
  r.resize(w, h);
  r.fills = [solid(fillHex)];
  r.cornerRadius = radius;
  return r;
}

function makeText(content, x, y, opts = {}) {
  const t = figma.createText();
  t.fontName = opts.font || FONTS.pretendard;
  t.characters = content;
  t.fontSize = opts.size || 14;
  t.fills = [solid(opts.color || "#1A1D2C", opts.opacity || 1)];
  if (opts.lineHeight) t.lineHeight = { value: opts.lineHeight, unit: "PIXELS" };
  if (opts.letterSpacing != null) t.letterSpacing = { value: opts.letterSpacing, unit: "PIXELS" };
  if (opts.upper) t.textCase = "UPPER";
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.width) {
    t.textAutoResize = "HEIGHT";
    t.resize(opts.width, t.height);
  }
  t.x = x;
  t.y = y;
  return t;
}

// Eye-mark logo symbol (two circles)
function makeLogoMark(parent, x, y, size = 42, navyHex = "#1C2CAE", goldHex = null) {
  const dotW = Math.round(size * 0.7);
  const c1 = figma.createEllipse();
  c1.name = "logo-dot-navy";
  c1.x = x;
  c1.y = y + (size - dotW) / 2;
  c1.resize(dotW, dotW);
  c1.fills = [solid(navyHex)];
  parent.appendChild(c1);
  const c2 = figma.createEllipse();
  c2.name = "logo-dot-accent";
  c2.x = x + dotW * 0.4;
  c2.y = y + (size - dotW) / 2;
  c2.resize(dotW, dotW);
  c2.fills = [solid(goldHex || "#A8ACBA"), { type: "SOLID", color: hex(goldHex || "#A8ACBA"), opacity: 0.6 }];
  c2.fills = [solid(goldHex || "#A8ACBA")];
  c2.opacity = goldHex ? 0.85 : 0.7;
  parent.appendChild(c2);
}

// =============================================================
// 1) Paint Styles
// =============================================================
async function createColorStyles() {
  // Avoid duplicate creation across re-runs
  const existing = new Set((await figma.getLocalPaintStylesAsync()).map(s => s.name));
  for (const c of COLORS) {
    if (existing.has(c.name)) continue;
    const s = figma.createPaintStyle();
    s.name = c.name;
    s.description = c.desc + "  ·  " + c.hex + (c.opacity != null ? " @" + c.opacity : "");
    s.paints = [{
      type: "SOLID",
      color: hex(c.hex),
      opacity: c.opacity != null ? c.opacity : 1
    }];
  }
}

// =============================================================
// 2) Text Styles
// =============================================================
async function createTextStyles() {
  const existing = new Set((await figma.getLocalTextStylesAsync()).map(s => s.name));
  for (const t of TEXT_STYLES) {
    if (existing.has(t.name)) continue;
    const s = figma.createTextStyle();
    s.name = t.name;
    s.description = `${t.font.family} ${t.font.style} · ${t.size}/${t.lineH} · ${t.spacing}`;
    s.fontName = t.font;
    s.fontSize = t.size;
    s.lineHeight = { value: t.lineH, unit: "PIXELS" };
    s.letterSpacing = { value: t.spacing, unit: "PIXELS" };
    if (t.upper) s.textCase = "UPPER";
  }
}

// =============================================================
// PAGE: 04 Cover
// =============================================================
function buildCoverPage() {
  const page = figma.createPage();
  page.name = "04 Cover";

  const cover = makeFrame("Cover · 1920×1080", 0, 0, 1920, 1080, "#FFFFFF");
  page.appendChild(cover);

  // Decorative circles
  const c1 = figma.createEllipse();
  c1.x = -300; c1.y = -200; c1.resize(1600, 1600);
  c1.fills = [];
  c1.strokes = [solid("#DDE0F0")];
  c1.strokeWeight = 1;
  c1.opacity = 0.4;
  cover.appendChild(c1);

  const tag = makeText("DESIGN SYSTEM · v1.0 · 2026", 120, 160, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 3.3, upper: true
  });
  cover.appendChild(tag);

  const title = makeText("Gangnam Smile\nDesign System", 120, 220, {
    font: FONTS.pretendardBL, size: 96, color: "#1A1D2C", lineHeight: 100, letterSpacing: -2.5, width: 1400
  });
  cover.appendChild(title);

  const sub = makeText("A quiet, precise visual language for vision care.", 120, 460, {
    font: FONTS.cormorantMI, size: 36, color: "#1C2CAE", width: 1200
  });
  cover.appendChild(sub);

  const lede = makeText(
    "강남스마일안과의원의 모든 디자인 자산 — 카드뉴스·랜딩페이지·소셜·인쇄물 — 의 일관성을 위한\n통합 디자인 토큰, 컴포넌트, 카피 가이드라인.",
    120, 540, { font: FONTS.pretendard, size: 18, color: "#5D6378", lineHeight: 32, width: 1100 });
  cover.appendChild(lede);

  // Meta row
  const metaItems = [
    ["BRAND", "강남스마일안과의원"],
    ["AUDIENCE", "몽골 환자 · 한국 일반"],
    ["CORE ASSET", "카드뉴스 · 랜딩 · 인쇄"],
    ["OPERATOR", "(주)포트존"]
  ];
  metaItems.forEach((m, i) => {
    const x = 120 + i * 280;
    const lab = makeText(m[0], x, 850, { font: FONTS.interM, size: 10, color: "#8A90A3", letterSpacing: 2, upper: true });
    cover.appendChild(lab);
    const val = makeText(m[1], x, 880, { font: FONTS.pretendardM, size: 14, color: "#1A1D2C" });
    cover.appendChild(val);
  });

  // Top divider
  const div = makeRect("divider", 120, 830, 1200, 1, "#1C2CAE", 0);
  div.opacity = 0.1;
  cover.appendChild(div);

  return page;
}

// =============================================================
// PAGE: 01 Foundation
// =============================================================
function buildFoundationPage() {
  const page = figma.createPage();
  page.name = "01 Foundation";

  // Header
  const head = makeText("01 · Foundation", 80, 80, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 3.3, upper: true
  });
  page.appendChild(head);
  const h1 = makeText("Color Tokens", 80, 110, { font: FONTS.pretendardSB, size: 48, color: "#1A1D2C", letterSpacing: -1 });
  page.appendChild(h1);

  // Color swatches grid — 5 columns × 4 rows = 20
  const SW = 220, SH = 200, GAP = 16;
  COLORS.forEach((c, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const x = 80 + col * (SW + GAP);
    const y = 200 + row * (SH + GAP);

    const card = makeFrame(c.name, x, y, SW, SH, "#FFFFFF");
    card.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.1 }];
    card.strokeWeight = 1;
    page.appendChild(card);

    const chip = makeRect("chip", 0, 0, SW, 120, c.hex);
    if (c.opacity != null) chip.opacity = c.opacity;
    card.appendChild(chip);

    const name = makeText(c.name, 16, 132, { font: FONTS.pretendardSB, size: 13, color: "#1A1D2C" });
    card.appendChild(name);
    const code = makeText(c.hex, 16, 152, { font: FONTS.inter, size: 11, color: "#5D6378" });
    card.appendChild(code);
    const desc = makeText(c.desc, 16, 170, { font: FONTS.pretendard, size: 10, color: "#8A90A3", width: SW - 32 });
    card.appendChild(desc);
  });

  // Typography section
  const typoY = 200 + 4 * (SH + GAP) + 80;
  const typoEb = makeText("01 · Foundation", 80, typoY, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 3.3, upper: true
  });
  page.appendChild(typoEb);
  const typoH1 = makeText("Typography Scale", 80, typoY + 30, {
    font: FONTS.pretendardSB, size: 48, color: "#1A1D2C", letterSpacing: -1
  });
  page.appendChild(typoH1);

  const samples = [
    { label: "Display", text: "99% 시력", style: TEXT_STYLES[0] },
    { label: "H1",      text: "차세대 시력교정의 기준", style: TEXT_STYLES[1] },
    { label: "H2",      text: "왜 강남스마일을 선택할까?", style: TEXT_STYLES[2] },
    { label: "H3",      text: "5세대 NEW SMILE LASIK", style: TEXT_STYLES[3] },
    { label: "Body L",  text: "25,000건 누적 수술 · 5년 추적 99.7% 유지율.", style: TEXT_STYLES[4] },
    { label: "Body",    text: "정밀 검사 50종 · 안과전문의 3인 직접 진료.", style: TEXT_STYLES[5] },
    { label: "Caption", text: "5년 추적 결과 기준 · 임상 데이터 출처", style: TEXT_STYLES[6] },
    { label: "Eyebrow", text: "CLINICAL EVIDENCE", style: TEXT_STYLES[7] },
    { label: "Italic",  text: "A clearer view, refined.", style: TEXT_STYLES[8], color: "#1C2CAE" }
  ];

  let cursor = typoY + 110;
  samples.forEach(s => {
    const lab = makeText(s.label, 80, cursor + 8, {
      font: FONTS.interM, size: 11, color: "#8A90A3", letterSpacing: 2, upper: true
    });
    page.appendChild(lab);
    const sample = makeText(s.text, 240, cursor, {
      font: s.style.font,
      size: s.style.size,
      color: s.color || "#1A1D2C",
      lineHeight: s.style.lineH,
      letterSpacing: s.style.spacing,
      upper: s.style.upper
    });
    page.appendChild(sample);
    cursor += s.style.lineH + 28;
  });

  return page;
}

// =============================================================
// PAGE: 02 Components
// =============================================================
function buildComponentsPage() {
  const page = figma.createPage();
  page.name = "02 Components";

  // ---- Header ----
  const eb = makeText("02 · Components", 80, 80, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 3.3, upper: true
  });
  page.appendChild(eb);
  const h = makeText("Buttons, Tags, Stats, Cards", 80, 110, {
    font: FONTS.pretendardSB, size: 48, color: "#1A1D2C", letterSpacing: -1
  });
  page.appendChild(h);

  // ---- Buttons ----
  let y = 220;
  page.appendChild(sectionLabel("BUTTONS", 80, y));
  y += 36;

  const btnPrimary = makeButton("상담 신청 →", "#1C2CAE", "#FFFFFF", 80, y);
  page.appendChild(btnPrimary);
  const btnGhost = makeButton("검진 안내", "#FFFFFF", "#1A1D2C", 280, y, "#1A1D2C");
  page.appendChild(btnGhost);
  const btnGold = makeButton("무료 검사 예약", "#E8B143", "#1A1D2C", 460, y);
  page.appendChild(btnGold);
  const btnLink = makeText("자세히 보기 →", 700, y + 16, { font: FONTS.pretendardM, size: 13, color: "#1C2CAE", letterSpacing: 0.65 });
  page.appendChild(btnLink);

  // ---- Tags ----
  y += 120;
  page.appendChild(sectionLabel("TAGS & BADGES", 80, y));
  y += 36;
  const tags = [
    ["5세대 SMILE", "#1C2CAE", "#FFFFFF"],
    ["정보형",       "#FFFFFF", "#1C2CAE", "#1C2CAE"],
    ["선택 사항",    "#EEF0F7", "#131A8A"],
    ["PROMOTION",   "#E8B143", "#1A1D2C"],
    ["예약 확정",    "#ECFDF3", "#067647", "#ABEFC6"],
    ["MYTH",        "#FEF3F2", "#B42318", "#FECDCA"]
  ];
  let tx = 80;
  tags.forEach(t => {
    const w = t[0].length * 12 + 32;
    const tag = makeFrame(t[0], tx, y, w, 30, t[1]);
    tag.cornerRadius = 999;
    if (t[3]) {
      tag.strokes = [solid(t[3])];
      tag.strokeWeight = 1;
    }
    page.appendChild(tag);
    const txt = makeText(t[0], 16, 8, { font: FONTS.pretendardM, size: 11, color: t[2], letterSpacing: 0.55 });
    tag.appendChild(txt);
    tx += w + 14;
  });

  // ---- Stats ----
  y += 90;
  page.appendChild(sectionLabel("STAT BLOCK", 80, y));
  y += 36;
  const stats = [
    ["25,000+", "누적 수술 건수"],
    ["99%", "목표 시력 달성률"],
    ["5세대", "NEW SMILE LASIK"],
    ["18년", "의료 전문성"]
  ];
  stats.forEach((s, i) => {
    const x = 80 + i * 220;
    const big = makeText(s[0], x, y, {
      font: FONTS.cormorantSB, size: 48, color: "#1C2CAE", lineHeight: 48
    });
    page.appendChild(big);
    const cap = makeText(s[1], x, y + 60, { font: FONTS.pretendard, size: 12, color: "#5D6378" });
    page.appendChild(cap);
  });

  // ---- Number Badges ----
  y += 130;
  page.appendChild(sectionLabel("NUMBER BADGES", 80, y));
  y += 36;
  const sizes = [32, 48, 48, 64];
  const fills = ["#1C2CAE", "#1C2CAE", "#E8B143", "#1C2CAE"];
  const colors = ["#FFFFFF", "#FFFFFF", "#1A1D2C", "#FFFFFF"];
  let bx = 80;
  sizes.forEach((sz, i) => {
    const e = figma.createEllipse();
    e.x = bx; e.y = y; e.resize(sz, sz);
    e.fills = [solid(fills[i])];
    e.name = "badge-" + (i + 1);
    page.appendChild(e);
    const num = makeText(String(i + 1).padStart(2, "0"), bx + sz * 0.25, y + sz * 0.2, {
      font: FONTS.cormorantSB, size: sz * 0.42, color: colors[i]
    });
    page.appendChild(num);
    bx += sz + 20;
  });

  // ---- Why Card ----
  y += 130;
  page.appendChild(sectionLabel("WHY CARD", 80, y));
  y += 36;
  const whyData = [
    ["01", "안과전문의 3인", "학회 정회원 · 18년 평균 경력"],
    ["02", "5세대 SMILE", "차세대 ATOS 장비 보유"],
    ["03", "몽골어 상담", "전담 통역사 상주"],
    ["04", "공항 픽업", "인천 → 강남 무료 차량"]
  ];
  whyData.forEach((w, i) => {
    const x = 80 + i * 230;
    const card = makeFrame("why-" + i, x, y, 220, 200, "#FFFFFF");
    card.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.1 }];
    card.strokeWeight = 1;
    page.appendChild(card);

    const e = figma.createEllipse();
    e.x = 86; e.y = 32; e.resize(48, 48);
    e.fills = [solid("#1C2CAE")];
    card.appendChild(e);
    const num = makeText(w[0], 100, 39, { font: FONTS.cormorantSB, size: 18, color: "#FFFFFF" });
    card.appendChild(num);

    const t = makeText(w[1], 24, 100, { font: FONTS.pretendardSB, size: 15, color: "#1A1D2C", align: "CENTER", width: 172 });
    card.appendChild(t);
    const d = makeText(w[2], 24, 130, { font: FONTS.pretendard, size: 12, color: "#5D6378", lineHeight: 18, align: "CENTER", width: 172 });
    card.appendChild(d);
  });

  // ---- Treatment Card ----
  y += 250;
  page.appendChild(sectionLabel("TREATMENT CARD", 80, y));
  y += 36;
  const treatments = [
    { gen: "5세대 · 차세대", code: "NEW SMILE", title: "NEW SMILE LASIK", desc: "최소 절개 · 빠른 회복", dark: true },
    { gen: "고도근시 대안",  code: "ICL",       title: "ICL 렌즈 삽입술",  desc: "각막 두께 부족 환자 적합", dark: true },
    { gen: "노안 교정",      code: "ECHO",      title: "ECHO 다초점",     desc: "40대 이상 원·근거리", dark: false },
    { gen: "정밀 검사",      code: "EXAM",      title: "50종 정밀 검진",   desc: "수술 전 안구 상태 분석", dark: false }
  ];
  treatments.forEach((t, i) => {
    const x = 80 + i * 230;
    const card = makeFrame("treatment-" + i, x, y, 220, 240, "#FFFFFF");
    card.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.1 }];
    card.strokeWeight = 1;
    page.appendChild(card);

    const img = makeRect("img", 0, 0, 220, 130, t.dark ? "#1C2CAE" : "#EEF0F7");
    card.appendChild(img);

    const gen = makeText(t.gen, 18, 18, {
      font: FONTS.interM, size: 9, color: t.dark ? "#FFFFFF" : "#131A8A", letterSpacing: 1.8, upper: true
    });
    card.appendChild(gen);
    const code = makeText(t.code, 18, 80, {
      font: FONTS.cormorantSB, size: 22, color: t.dark ? "#FFFFFF" : "#131A8A"
    });
    card.appendChild(code);

    const title = makeText(t.title, 18, 150, { font: FONTS.pretendardSB, size: 14, color: "#1A1D2C" });
    card.appendChild(title);
    const desc = makeText(t.desc, 18, 175, { font: FONTS.pretendard, size: 11, color: "#5D6378", lineHeight: 18, width: 184 });
    card.appendChild(desc);
  });

  // ---- Doctor Card ----
  y += 290;
  page.appendChild(sectionLabel("DOCTOR CARD", 80, y));
  y += 36;
  const docs = [
    ["대표원장", "윤준상 전문의", "대한안과학회 정회원 · 18년", "YJ"],
    ["진료원장", "정희원 전문의", "SMILE 누적 12,000건",       "JH"],
    ["진료원장", "염상수 전문의", "ICL · 노안교정 12년",        "YS"]
  ];
  docs.forEach((d, i) => {
    const x = 80 + i * 310;
    const card = makeFrame("doctor-" + i, x, y, 290, 110, "#FFFFFF");
    card.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.1 }];
    card.strokeWeight = 1;
    page.appendChild(card);

    const av = figma.createEllipse();
    av.x = 24; av.y = 19; av.resize(72, 72);
    av.fills = [solid("#EEF0F7")];
    card.appendChild(av);
    const ini = makeText(d[3], 38, 36, { font: FONTS.cormorantMI, size: 24, color: "#1C2CAE" });
    card.appendChild(ini);

    const tag = makeText(d[0], 116, 22, {
      font: FONTS.interM, size: 9, color: "#1C2CAE", letterSpacing: 1.8, upper: true
    });
    card.appendChild(tag);
    const name = makeText(d[1], 116, 42, { font: FONTS.pretendardSB, size: 15, color: "#1A1D2C" });
    card.appendChild(name);
    const meta = makeText(d[2], 116, 66, { font: FONTS.pretendard, size: 12, color: "#5D6378" });
    card.appendChild(meta);
  });

  // ---- Generation Timeline ----
  y += 160;
  page.appendChild(sectionLabel("GENERATION TIMELINE", 80, y));
  y += 36;
  const gens = ["G1", "G2", "G3", "G4", "G5"];
  const labels = ["2010 · LASIK", "2014 · SMILE", "2018 · SMILE Pro", "2022 · SMILE+", "2024 · NEW SMILE"];
  gens.forEach((g, i) => {
    const active = i === 4;
    const x = 80 + i * 180;
    const c = figma.createEllipse();
    c.x = x; c.y = y; c.resize(88, 88);
    c.fills = [solid(active ? "#1C2CAE" : "#FFFFFF")];
    c.strokes = [solid(active ? "#1C2CAE" : "#A8ACBA")];
    c.strokeWeight = 1.5;
    page.appendChild(c);
    const lbl = makeText(g, x + 28, y + 32, {
      font: FONTS.interSB, size: 14, color: active ? "#FFFFFF" : "#5D6378"
    });
    page.appendChild(lbl);
    const cap = makeText(labels[i], x - 16, y + 100, {
      font: FONTS.pretendardM, size: 11, color: active ? "#1C2CAE" : "#5D6378", align: "CENTER", width: 120
    });
    page.appendChild(cap);
  });

  // ---- Footer Band ----
  y += 200;
  page.appendChild(sectionLabel("FOOTER BAND · 1080×60", 80, y));
  y += 36;
  const band = makeRect("footer-band", 80, y, 1080, 60, "#1C2CAE");
  page.appendChild(band);
  const bandTxt = makeText("강남스마일안과의원   ·   5세대 NEW SMILE LASIK   ·   몽골어 상담 가능",
    80 + 250, y + 22, { font: FONTS.interSB, size: 14, color: "#FFFFFF", letterSpacing: 0.7 });
  page.appendChild(bandTxt);

  return page;
}

function sectionLabel(text, x, y) {
  return makeText(text, x, y, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 2.2, upper: true
  });
}

function makeButton(label, bg, fg, x, y, stroke) {
  const f = makeFrame("btn-" + label, x, y, 180, 50, bg);
  if (stroke) {
    f.strokes = [solid(stroke)];
    f.strokeWeight = 1;
  }
  const t = makeText(label, 0, 17, {
    font: FONTS.pretendardM, size: 13, color: fg, align: "CENTER", width: 180, letterSpacing: 0.65
  });
  f.appendChild(t);
  return f;
}

// =============================================================
// PAGE: 03 Card News 1080
// =============================================================
function buildCardNewsPage() {
  const page = figma.createPage();
  page.name = "03 Card News 1080";

  // Header
  const eb = makeText("03 · Card News Template", 80, 80, {
    font: FONTS.interM, size: 11, color: "#1C2CAE", letterSpacing: 3.3, upper: true
  });
  page.appendChild(eb);
  const h = makeText("1080 × 1080 · 7-Page Series", 80, 110, {
    font: FONTS.pretendardSB, size: 48, color: "#1A1D2C", letterSpacing: -1
  });
  page.appendChild(h);

  // Safe Zone Master
  const sz = makeFrame("00 · Safe Zone Master", 80, 220, 1080, 1080, "#FFFFFF");
  sz.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.2 }];
  sz.strokeWeight = 1;
  page.appendChild(sz);

  const safeOuter = makeFrame("safe-area", 72, 72, 936, 936, null);
  safeOuter.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.4 }];
  safeOuter.strokeWeight = 1;
  safeOuter.dashPattern = [6, 4];
  safeOuter.fills = [];
  sz.appendChild(safeOuter);

  const hero = makeRect("HERO ZONE  y=140-440", 72, 140, 936, 300, "#1C2CAE");
  hero.opacity = 0.06;
  sz.appendChild(hero);
  const heroLab = makeText("HERO ZONE · y=140–440", 72 + 350, 140 + 140, {
    font: FONTS.interSB, size: 14, color: "#1C2CAE", letterSpacing: 1.4
  });
  sz.appendChild(heroLab);

  const body = makeRect("BODY ZONE  y=460-1020", 72, 460, 936, 560, "#1C2CAE");
  body.opacity = 0.03;
  sz.appendChild(body);
  const bodyLab = makeText("BODY ZONE · y=460–960", 72 + 350, 460 + 270, {
    font: FONTS.interSB, size: 14, color: "#1C2CAE", letterSpacing: 1.4
  });
  sz.appendChild(bodyLab);

  const band = makeRect("FOOTER BAND  1080×60", 0, 1020, 1080, 60, "#1C2CAE");
  sz.appendChild(band);
  const bandLab = makeText("FOOTER BAND · y=1020–1080 (60px)", 350, 1040, {
    font: FONTS.interSB, size: 12, color: "#FFFFFF", letterSpacing: 1.2
  });
  sz.appendChild(bandLab);

  // 7-page templates (laid out to right of master)
  const pages = [
    { kind: "P1 · Cover" },
    { kind: "P2 · Definition" },
    { kind: "P3 · Process" },
    { kind: "P4 · Big Number" },
    { kind: "P5 · Compare" },
    { kind: "P6 · Audience" },
    { kind: "P7 · CTA" }
  ];

  const startX = 80 + 1080 + 80;
  const startY = 220;
  const cnW = 540;
  const gap = 40;

  pages.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = startX + col * (cnW + gap);
    const y = startY + row * (cnW + gap);
    const f = buildCardNewsTemplate(p.kind, i + 1, x, y, cnW);
    page.appendChild(f);
  });

  return page;
}

function buildCardNewsTemplate(kind, num, x, y, size) {
  const SCALE = size / 1080; // for content positioning
  const cn = makeFrame(kind, x, y, size, size, "#FFFFFF");
  cn.strokes = [{ type: "SOLID", color: hex("#1C2CAE"), opacity: 0.1 }];
  cn.strokeWeight = 1;

  const padX = 130 * SCALE;
  const padY = 160 * SCALE;

  if (kind.startsWith("P1")) {
    // Cover
    cn.fills = [solid("#FFFFFF")];
    const tag = makeFrame("tag", padX, padY, 130 * SCALE, 28 * SCALE, "#1C2CAE");
    tag.cornerRadius = 4;
    cn.appendChild(tag);
    const tagT = makeText("정보형 · 시력교정", 14 * SCALE, 7 * SCALE, {
      font: FONTS.pretendardM, size: 10 * SCALE, color: "#FFFFFF", letterSpacing: 1.5
    });
    tag.appendChild(tagT);

    const head = makeText("3분 만에 알 수 있는\n나에게 맞는 시력교정", padX, padY + 200 * SCALE, {
      font: FONTS.pretendardB, size: 64 * SCALE, color: "#1A1D2C",
      lineHeight: 78 * SCALE, letterSpacing: -2 * SCALE, width: size - padX * 2
    });
    cn.appendChild(head);

    const it = makeText("A clearer view, refined.", padX, padY + 380 * SCALE, {
      font: FONTS.cormorantMI, size: 32 * SCALE, color: "#1C2CAE"
    });
    cn.appendChild(it);

  } else if (kind.startsWith("P2")) {
    addEyebrow(cn, "DEFINITION", padX, padY, SCALE);
    addTitle(cn, "NEW SMILE LASIK이란?", padX, padY + 40 * SCALE, SCALE);
    const checks = ["최소 절개 · 약 2mm", "각막 보존율 향상", "당일 일상 복귀 가능", "건조감 부담 감소"];
    checks.forEach((c, i) => {
      const t = makeText("✓  " + c, padX, padY + 200 * SCALE + i * 70 * SCALE, {
        font: FONTS.pretendardM, size: 28 * SCALE, color: "#1A1D2C"
      });
      cn.appendChild(t);
    });

  } else if (kind.startsWith("P3")) {
    addEyebrow(cn, "PROCESS", padX, padY, SCALE);
    addTitle(cn, "수술 당일 흐름", padX, padY + 40 * SCALE, SCALE);
    const steps = ["도착 · 사전 검진", "전문의 상담", "마취 · 대기", "수술 약 15분", "회복 · 귀가"];
    steps.forEach((s, i) => {
      const cy = padY + 200 * SCALE + i * 90 * SCALE;
      const e = figma.createEllipse();
      e.x = padX; e.y = cy; e.resize(54 * SCALE, 54 * SCALE);
      e.fills = [solid("#1C2CAE")];
      cn.appendChild(e);
      const num = makeText(String(i + 1), padX + 20 * SCALE, cy + 12 * SCALE, {
        font: FONTS.cormorantSB, size: 22 * SCALE, color: "#FFFFFF"
      });
      cn.appendChild(num);
      const txt = makeText(s, padX + 80 * SCALE, cy + 14 * SCALE, {
        font: FONTS.pretendardM, size: 24 * SCALE, color: "#1A1D2C"
      });
      cn.appendChild(txt);
    });

  } else if (kind.startsWith("P4")) {
    cn.fills = [solid("#EEF0F7")];
    addEyebrow(cn, "CLINICAL DATA", padX, padY + 100 * SCALE, SCALE, "CENTER", size);
    const big = makeText("99.7%", 0, padY + 200 * SCALE, {
      font: FONTS.cormorantSB, size: 280 * SCALE, color: "#1C2CAE", align: "CENTER", width: size,
      lineHeight: 280 * SCALE
    });
    cn.appendChild(big);
    const desc = makeText("5년 추적 시력 유지율\n(2019–2024 · 8,400명 누적)", 0, padY + 580 * SCALE, {
      font: FONTS.pretendard, size: 22 * SCALE, color: "#5D6378", lineHeight: 38 * SCALE,
      align: "CENTER", width: size
    });
    cn.appendChild(desc);

  } else if (kind.startsWith("P5")) {
    addEyebrow(cn, "COMPARE", padX, padY, SCALE);
    addTitle(cn, "기존 LASIK vs NEW SMILE", padX, padY + 40 * SCALE, SCALE);

    const colW = (size - padX * 2 - 24 * SCALE) / 2;
    const cy = padY + 220 * SCALE;
    const cH = 480 * SCALE;

    const col1 = makeFrame("col-old", padX, cy, colW, cH, "#F5F6FA");
    cn.appendChild(col1);
    const old1 = makeText("기존 LASIK", 28 * SCALE, 32 * SCALE, {
      font: FONTS.pretendardSB, size: 22 * SCALE, color: "#1A1D2C"
    });
    col1.appendChild(old1);
    const old2 = makeText("각막 절편 생성\n회복 3~5일\n건조감 가능성",
      28 * SCALE, 90 * SCALE, {
        font: FONTS.pretendard, size: 18 * SCALE, color: "#5D6378", lineHeight: 32 * SCALE
      });
    col1.appendChild(old2);

    const col2 = makeFrame("col-new", padX + colW + 24 * SCALE, cy, colW, cH, "#1C2CAE");
    cn.appendChild(col2);
    const new1 = makeText("NEW SMILE", 28 * SCALE, 32 * SCALE, {
      font: FONTS.pretendardSB, size: 22 * SCALE, color: "#FFFFFF"
    });
    col2.appendChild(new1);
    const new2 = makeText("2mm 최소 절개\n당일 일상 복귀\n각막 보존",
      28 * SCALE, 90 * SCALE, {
        font: FONTS.pretendard, size: 18 * SCALE, color: "#FFFFFF", lineHeight: 32 * SCALE, opacity: 0.92
      });
    col2.appendChild(new2);

  } else if (kind.startsWith("P6")) {
    addEyebrow(cn, "AUDIENCE", padX, padY, SCALE);
    addTitle(cn, "이런 분께 적합합니다", padX, padY + 40 * SCALE, SCALE);
    const aud = [
      "안경·렌즈 의존도가 높은 분",
      "건조감으로 라식이 망설여졌던 분",
      "회복 기간이 짧아야 하는 분",
      "운동·야외 활동이 많은 분",
      "해외 거주로 1회 방문 수술이 필요한 분"
    ];
    aud.forEach((a, i) => {
      const cy = padY + 200 * SCALE + i * 80 * SCALE;
      const dash = makeRect("dash", padX, cy + 14 * SCALE, 24 * SCALE, 2, "#1C2CAE");
      cn.appendChild(dash);
      const t = makeText(a, padX + 44 * SCALE, cy, {
        font: FONTS.pretendardM, size: 24 * SCALE, color: "#1A1D2C"
      });
      cn.appendChild(t);
    });

  } else if (kind.startsWith("P7")) {
    cn.fills = [solid("#1C2CAE")];
    addEyebrow(cn, "CONTACT", padX, padY, SCALE, null, null, "#E8B143");
    const head = makeText("무료 검진부터\n편하게 시작하세요", padX, padY + 80 * SCALE, {
      font: FONTS.pretendardB, size: 56 * SCALE, color: "#FFFFFF",
      lineHeight: 72 * SCALE, letterSpacing: -1.5 * SCALE, width: size - padX * 2
    });
    cn.appendChild(head);
    const it = makeText("Talk to us, in your language.", padX, padY + 250 * SCALE, {
      font: FONTS.cormorantMI, size: 30 * SCALE, color: "#E8B143"
    });
    cn.appendChild(it);
    const cta = makeFrame("cta", padX, padY + 400 * SCALE, 320 * SCALE, 64 * SCALE, "#E8B143");
    cn.appendChild(cta);
    const ctaT = makeText("메시지로 문의 →", 0, 18 * SCALE, {
      font: FONTS.pretendardSB, size: 22 * SCALE, color: "#1A1D2C", align: "CENTER", width: 320 * SCALE
    });
    cta.appendChild(ctaT);
  }

  // Common footer band
  const fb = makeRect("footer-band", 0, size - 60 * SCALE, size, 60 * SCALE, "#1C2CAE");
  cn.appendChild(fb);
  const fbT = makeText("강남스마일안과의원   ·   NEW SMILE", 0, 18 * SCALE, {
    font: FONTS.interSB, size: 16 * SCALE, color: "#FFFFFF", letterSpacing: 1, align: "CENTER", width: size
  });
  fb.appendChild(fbT);

  // Page label
  const lab = makeText(num + " / 7", 0, size - 40 * SCALE, {
    font: FONTS.interSB, size: 11 * SCALE, color: "#FFFFFF", align: "CENTER", width: size, opacity: 0.6
  });
  fb.appendChild(lab);

  return cn;
}

function addEyebrow(parent, text, x, y, scale, align, width, color) {
  const e = makeText(text, x, y, {
    font: FONTS.interM, size: 14 * scale, color: color || "#1C2CAE",
    letterSpacing: 4 * scale, upper: true, align: align || undefined,
    width: width || undefined
  });
  parent.appendChild(e);
  return e;
}
function addTitle(parent, text, x, y, scale) {
  const t = makeText(text, x, y, {
    font: FONTS.pretendardB, size: 44 * scale, color: "#1A1D2C", letterSpacing: -1 * scale,
    width: 1080 * scale - x - 130 * scale, lineHeight: 56 * scale
  });
  parent.appendChild(t);
  return t;
}

// =============================================================
// MAIN
// =============================================================
async function run() {
  try {
    figma.notify("폰트 로딩 중…");
    await loadAllFonts();

    figma.notify("컬러 스타일 생성…");
    await createColorStyles();

    figma.notify("텍스트 스타일 생성…");
    await createTextStyles();

    figma.notify("페이지 생성 중 (4개)…");
    const cover = buildCoverPage();
    const found = buildFoundationPage();
    const comps = buildComponentsPage();
    const cards = buildCardNewsPage();

    figma.currentPage = cover;
    figma.viewport.scrollAndZoomIntoView(cover.children);

    figma.notify("✓ 강남스마일 디자인 시스템 v1 생성 완료", { timeout: 4000 });
  } catch (err) {
    console.error(err);
    figma.notify("✕ 오류: " + err.message, { error: true, timeout: 6000 });
  } finally {
    figma.closePlugin();
  }
}

run();
