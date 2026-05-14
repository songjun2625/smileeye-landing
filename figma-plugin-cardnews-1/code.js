// =============================================================
// Gangnam Smile · FB Brand Launch Cardnews (1200×1200) Plugin
// 한 번 실행 → 현재 Figma 파일에 다음 페이지를 자동 생성:
//   1) "{YYMM}_카드뉴스_FB브랜드런칭"     — KR + MN + 메모 쌍(pair) 리뷰용
//   2) "{YYMM}_카드뉴스_FB브랜드런칭_MN"  — MN 전면 치환 배포용
// 6장 시리즈: F1 인트로 / F2 진료영역 / F3 의료진 / F4 스마일프로 / F5 위치 / F6 CTA
// =============================================================

const YYMM = (() => {
  const d = new Date();
  return String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, "0");
})();

// -------------------- Fonts --------------------
const F = {
  prR:  { family: "Pretendard", style: "Regular" },
  prM:  { family: "Pretendard", style: "Medium" },
  prSB: { family: "Pretendard", style: "SemiBold" },
  prB:  { family: "Pretendard", style: "Bold" },
  prBL: { family: "Pretendard", style: "Black" },
  inR:  { family: "Inter", style: "Regular" },
  inM:  { family: "Inter", style: "Medium" },
  inSB: { family: "Inter", style: "SemiBold" },
  inB:  { family: "Inter", style: "Bold" },
  inBL: { family: "Inter", style: "Black" },
  mn:   { family: "Noto Sans Mongolian", style: "Regular" }
};

async function loadFonts() {
  const seen = new Set();
  const tasks = [];
  for (const k in F) {
    const key = F[k].family + "·" + F[k].style;
    if (seen.has(key)) continue;
    seen.add(key);
    tasks.push(figma.loadFontAsync(F[k]));
  }
  await Promise.all(tasks);
}

// -------------------- Color helpers --------------------
const C = {
  bluePrimary:  "#1C2CAE",
  navyDeep:     "#0F1A30",
  gold:         "#E8B143",
  white:        "#FFFFFF",
  inkDeep:      "#0F1A30",
  ink50:        "#798183",
  bg50:         "#F2F4F7",
  line:         "#E5E9EF"
};

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

// -------------------- Primitive builders --------------------
function frame(parent, name, x, y, w, h, fillHex, opacity) {
  const f = figma.createFrame();
  f.name = name;
  f.x = x; f.y = y;
  f.resize(w, h);
  f.fills = fillHex ? [solid(fillHex, opacity == null ? 1 : opacity)] : [];
  f.cornerRadius = 0;
  f.clipsContent = true;
  parent.appendChild(f);
  return f;
}
function rect(parent, name, x, y, w, h, fillHex, radius, opacity) {
  const r = figma.createRectangle();
  r.name = name;
  r.x = x; r.y = y;
  r.resize(w, h);
  r.fills = [solid(fillHex, opacity == null ? 1 : opacity)];
  if (radius) r.cornerRadius = radius;
  parent.appendChild(r);
  return r;
}
function ellipse(parent, name, x, y, w, h, fillHex) {
  const e = figma.createEllipse();
  e.name = name;
  e.x = x; e.y = y;
  e.resize(w, h);
  e.fills = [solid(fillHex)];
  parent.appendChild(e);
  return e;
}
function txt(parent, content, x, y, opts) {
  opts = opts || {};
  const t = figma.createText();
  t.fontName = opts.font || F.prR;
  t.characters = content == null ? "" : content;
  t.fontSize = opts.size || 14;
  t.fills = [solid(opts.color || C.inkDeep, opts.opacity == null ? 1 : opts.opacity)];
  if (opts.lh != null) t.lineHeight = { value: opts.lh, unit: "PIXELS" };
  if (opts.ls != null) t.letterSpacing = { value: opts.ls, unit: "PIXELS" };
  if (opts.upper) t.textCase = "UPPER";
  if (opts.align) t.textAlignHorizontal = opts.align;
  if (opts.width) {
    t.textAutoResize = "HEIGHT";
    t.resize(opts.width, t.height);
  }
  t.x = x; t.y = y;
  parent.appendChild(t);
  return t;
}
function pickFontBL(lang) { return lang === "mn" ? F.mn : F.prBL; }
function pickFontB(lang)  { return lang === "mn" ? F.mn : F.prB; }
function pickFontSB(lang) { return lang === "mn" ? F.mn : F.prSB; }
function pickFontM(lang)  { return lang === "mn" ? F.mn : F.prM; }
function pickFontR(lang)  { return lang === "mn" ? F.mn : F.prR; }

// -------------------- Content (mirrors fbContent.jsx) --------------------
const POSTS = [
  {
    id: "F1", role: "안녕하세요 게시물 / 페이지 첫 인사",
    label: { kr: "01 · 브랜드 인트로", mn: "01 · Брэнд танилцуулга" },
    title: { kr: "안녕하세요,\n강남스마일안과의원입니다",
             mn: "Сайн байна уу,\nКаннам Смайл нүдний эмнэлэг" },
    sub:   { kr: "18년간 시력교정 · 백내장 · 안성형\n한 분야에 집중해 온 전문 안과병원",
             mn: "18 жил харааны заслал · цахилдаг · нүдний гоо засал\nЗөвхөн нэг чиглэлд төвлөрсөн мэргэжлийн эмнэлэг" },
    eyebrow: "GANGNAM SMILE EYE CLINIC · EST. 2007",
    yearLine:{ kr: "한 분야 · 한 자리 · 18년",
               mn: "Нэг чиглэл · Нэг газар · 18 жил" },
    yearTag: { kr: "SINCE 2007 · YEAR 18", mn: "SINCE 2007 · YEAR 18" },
    cta:     { kr: ["페이지 팔로우","병원 소개 보기"],
               mn: ["Хуудас дагах","Эмнэлгийн танилцуулга"] }
  },
  {
    id: "F2", role: "병원 소개 — 핵심 3개 영역",
    label: { kr: "02 · 진료 영역", mn: "02 · Үйлчилгээний чиглэл" },
    title: { kr: "한 가지 약속,\n세 가지 전문성", mn: "Нэг амлалт,\nГурван мэргэшил" },
    sub:   { kr: "라식 · 라섹 · 스마일프로 / 백내장 / 안성형\n각 영역 전문의가 직접 진료합니다",
             mn: "LASIK · LASEK · SMILE Pro / Цахилдаг / Нүдний гоо засал\nТус бүр мэргэшсэн эмч өөрөө шалгана" },
    eyebrow: "SPECIALTY · 진료 영역"
  },
  {
    id: "F3", role: "대표원장 인사 / 의료진 소개",
    label: { kr: "03 · 의료진", mn: "03 · Эмч нар" },
    title: { kr: "환자의 일상을\n새로 시작하게 하는 일",
             mn: "Өвчтөний өдөр тутмыг\nдахин эхлүүлэх ажил" },
    sub:   { kr: "염동주 대표원장\n안과전문의 · 인제대 의대 박사 · 누적 25,000건",
             mn: "Ём Дун Жү ерөнхий эмч\nНүдний мэргэжлийн эмч · Инжэ их сургуулийн доктор · 25,000 хагалгаа" },
    eyebrow: "MEDICAL TEAM · 의료진 노트"
  },
  {
    id: "F4", role: "스마일프로 라식 핵심 자랑",
    label: { kr: "04 · 시그니처 기술", mn: "04 · Онцгой технологи" },
    title: { kr: "스마일프로 라식\n5가지 핵심", mn: "SMILE Pro LASIK\n5 гол давуу тал" },
    sub:   { kr: "2mm 절개 · 24시간 회복 · 99% 시력 유지\n5년 임상 추적 데이터로 검증",
             mn: "2мм зүсэлт · 24 цагт сэргэх · 99% хараа хадгалах\n5 жилийн судалгаагаар баталгаажсан" },
    eyebrow: "SIGNATURE TECHNOLOGY · 시그니처 기술"
  },
  {
    id: "F5", role: "찾아오는 길 · 운영시간",
    label: { kr: "05 · 위치 · 접근성", mn: "05 · Байршил" },
    title: { kr: "강남역 10번 출구\n도보 1분", mn: "Каннам метроны\n10-р гарц, 1 мин" },
    sub:   { kr: "서울 서초구 강남대로 405 통영빌딩 4·6층\n운영 09:30 – 19:00 (점심 13:00 – 14:00)",
             mn: "Сөүл, Сөчогү, Каннамдэро 405, Тонгён байр 4·6 давхар\nЦагийн хуваарь 09:30–19:00 (Завсарлага 13:00–14:00)" },
    eyebrow: "LOCATION · 찾아오시는 길"
  },
  {
    id: "F6", role: "예약 · 문의 채널",
    label: { kr: "06 · 상담 CTA", mn: "06 · Холбогдох" },
    title: { kr: "사전 무료 진단\n언제든 문의하세요",
             mn: "Үнэгүй урьдчилсан\nоношилгоо · Хэзээ ч холбогдоорой" },
    sub:   { kr: "카카오 · 전화 · 인스타그램 DM\n해외 환자는 WhatsApp으로 24시간 응답",
             mn: "Kakao · Утас · Instagram DM\nГадаадын өвчтөнд WhatsApp 24 цаг" },
    eyebrow: "CONTACT · 사전 무료 진단"
  }
];

const SPEC = [
  { num:"01", name:{kr:"시력교정",mn:"Харааны заслал"},
    items:{kr:"라식 · 라섹 · 스마일프로",mn:"LASIK · LASEK · SMILE Pro"},
    note:{kr:"각막 절편 X · 24시간 회복",mn:"Эвэрлэгийн тасалгаа X · 24 цагт"} },
  { num:"02", name:{kr:"백내장",mn:"Цахилдагны хагалгаа"},
    items:{kr:"프리미엄 IOL · 다초점",mn:"Премиум IOL · Олон фокус"},
    note:{kr:"국제표준 검사 시스템",mn:"Олон улсын стандарт оношилгоо"} },
  { num:"03", name:{kr:"안성형",mn:"Нүдний гоо засал"},
    items:{kr:"안검하수 · 눈매교정",mn:"Зовхины заслал · Нүдний хэлбэр"},
    note:{kr:"기능 + 자연스러움 동시",mn:"Үйл ажиллагаа + байгалийн төрх"} }
];
const STATS = [
  { v:"2mm", k:{kr:"초소형 절개",mn:"Бичил зүсэлт"} },
  { v:"24h", k:{kr:"회복 시간",mn:"Сэргэх хугацаа"} },
  { v:"99%", k:{kr:"5년 시력 유지",mn:"5 жил хараа хадгалах"} },
  { v:"5y",  k:{kr:"임상 추적 검증",mn:"Эмнэлзүйн судалгаа"} }
];
const CHANNELS = [
  { name:{kr:"카카오톡",mn:"KakaoTalk"}, id:"@강남스마일안과",
    note:{kr:"24시간 응답",mn:"24 цагийн хариу"}, dot:"#FEE500" },
  { name:{kr:"전화 상담",mn:"Утсаар"}, id:"02-538-5959",
    note:{kr:"평일 09:30 – 19:00",mn:"Ажлын өдөр 09:30–19:00"}, dot:"#E8B143" },
  { name:{kr:"Instagram",mn:"Instagram"}, id:"@smile_eyeclinic_eng",
    note:{kr:"DM 환영",mn:"DM-ээр холбогдоорой"}, dot:"#5879F2" },
  { name:{kr:"WhatsApp",mn:"WhatsApp"}, id:"+82 10-5772-0210",
    note:{kr:"해외 환자 전용",mn:"Гадаадын өвчтөнд"}, dot:"#25D366" }
];
const FOOTER = {
  brand:    { kr: "강남스마일안과의원", mn: "Каннам Смайл нүдний эмнэлэг" },
  location: { kr: "강남역 10번 출구 도보 1분", mn: "Каннам 10-р гарц, 1 мин" }
};

const T = (v, lang) => (typeof v === "string" ? v : (v && (v[lang] != null ? v[lang] : v.kr)) || "");

// -------------------- Shared header / footer / logo --------------------
function buildHeader(card, post) {
  rect(card, "header-band", 0, 0, 1200, 105, C.navyDeep);
  rect(card, "eyebrow-bar", 64, 92, 32, 4, C.gold);
  txt(card, post.eyebrow, 110, 73, {
    font: F.inB, size: 18, ls: 2.5, color: C.gold, upper: true
  });
  txt(card, post.id + " / 06", 64, 46, {
    font: F.inB, size: 16, ls: 2, color: C.white, opacity: 0.75, align: "RIGHT", width: 1072
  });
}
function buildLogo(parent, x, y) {
  const g = figma.group(
    [
      (function(){
        const e = figma.createEllipse();
        e.x = x; e.y = y + 6; e.resize(42, 30);
        e.fills = [];
        e.strokes = [solid(C.gold)];
        e.strokeWeight = 2.5;
        parent.appendChild(e);
        return e;
      })(),
      (function(){
        const c = figma.createEllipse();
        c.x = x + 12; c.y = y + 12; c.resize(18, 18);
        c.fills = [solid(C.gold)];
        parent.appendChild(c);
        return c;
      })(),
      (function(){
        const c = figma.createEllipse();
        c.x = x + 17; c.y = y + 13; c.resize(6, 6);
        c.fills = [solid(C.white)];
        parent.appendChild(c);
        return c;
      })()
    ],
    parent
  );
  g.name = "logo-eye";
  txt(parent, "SMILE", x + 50, y + 4, {
    font: F.inBL, size: 14, ls: 1, color: C.white
  });
  txt(parent, "EYE CLINIC", x + 50, y + 22, {
    font: F.inB, size: 9, ls: 2, color: C.gold
  });
}
function buildFooter(card, lang) {
  rect(card, "footer-band", 0, 1125, 1200, 75, C.navyDeep);
  txt(card, T(FOOTER.brand, lang), 64, 1149, {
    font: pickFontBL(lang), size: 20, ls: -0.3, color: C.white
  });
  buildLogo(card, 1000, 1148);
}

// -------------------- F1: Brand intro --------------------
function buildF1(parent, x, y, lang) {
  const post = POSTS[0];
  const card = frame(parent, "F1-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  // Main title
  const titleSize = lang === "mn" ? 88 : 100;
  txt(card, T(post.title, lang), 80, 170, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize * 1.1, ls: -2.5,
    color: C.white, width: 1040
  });

  // Year tag row (gold bar + tag)
  rect(card, "gold-bar-yearTag", 80, 480, 80, 4, C.gold);
  txt(card, T(post.yearTag, lang), 180, 466, {
    font: F.inB, size: 20, ls: 3, color: C.gold
  });

  // Sub
  txt(card, T(post.sub, lang), 80, 522, {
    font: pickFontM(lang), size: 32, lh: 48, color: C.white, opacity: 0.92,
    width: 1040
  });

  // Big "18"
  txt(card, "18", 80, 760, {
    font: F.inBL, size: 260, lh: 213, ls: -12, color: C.gold
  });
  txt(card, T(post.yearLine, lang), 80, 990, {
    font: pickFontSB(lang), size: 22, ls: -0.2, color: C.white
  });

  // CTA pills (right-aligned bottom)
  const cta = T(post.cta, lang);
  // primary (gold)
  const cta1 = frame(card, "cta-primary", 480, 950, 280, 64, C.gold);
  cta1.cornerRadius = 999;
  txt(cta1, cta[0], 0, 18, {
    font: pickFontB(lang), size: 20, color: C.navyDeep, align: "CENTER", width: 280
  });
  // secondary (outline)
  const cta2 = frame(card, "cta-secondary", 780, 950, 320, 64);
  cta2.cornerRadius = 999;
  cta2.strokes = [solid(C.white, 0.55)];
  cta2.strokeWeight = 1.5;
  txt(cta2, cta[1], 0, 18, {
    font: pickFontB(lang), size: 20, color: C.white, align: "CENTER", width: 320
  });

  buildFooter(card, lang);
  return card;
}

// -------------------- F2: 3 specialty cards --------------------
function buildF2(parent, x, y, lang) {
  const post = POSTS[1];
  const card = frame(parent, "F2-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  const titleSize = lang === "mn" ? 88 : 96;
  txt(card, T(post.title, lang), 64, 180, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize * 1.08, ls: -2,
    color: C.white, width: 1072
  });
  txt(card, T(post.sub, lang), 64, 430, {
    font: pickFontM(lang), size: 32, lh: 48, color: C.white, opacity: 0.88, width: 1072
  });

  const colW = (1072 - 32) / 3;
  for (let i = 0; i < SPEC.length; i++) {
    const s = SPEC[i];
    const isCenter = i === 1;
    const bg = isCenter ? C.gold : C.navyDeep;
    const accentFg = isCenter ? C.navyDeep : C.gold;
    const fg = isCenter ? C.navyDeep : C.white;
    const cx = 64 + i * (colW + 16);
    const cy = 620;
    const cell = frame(card, "spec-" + s.num, cx, cy, colW, 380, bg);
    cell.cornerRadius = 20;
    txt(cell, s.num, 32, 32, {
      font: F.inBL, size: 56, ls: -3, color: accentFg, lh: 56
    });
    rect(cell, "rule", 32, 116, 48, 3, accentFg);
    txt(cell, T(s.name, lang), 32, 134, {
      font: pickFontBL(lang), size: 34, ls: -0.5, color: fg
    });
    txt(cell, T(s.items, lang), 32, 184, {
      font: pickFontM(lang), size: 22, lh: 33, color: fg,
      opacity: isCenter ? 0.78 : 0.88, width: colW - 64
    });
    txt(cell, T(s.note, lang), 32, 326, {
      font: pickFontB(lang), size: 20, ls: -0.2, color: accentFg, width: colW - 64
    });
  }
  buildFooter(card, lang);
  return card;
}

// -------------------- F3: Doctor portrait + quote --------------------
function buildF3(parent, x, y, lang) {
  const post = POSTS[2];
  const card = frame(parent, "F3-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  // Portrait placeholder (left)
  const portrait = frame(card, "portrait-placeholder", 64, 180, 480, 820, C.navyDeep);
  portrait.cornerRadius = 24;
  // SVG-ish silhouette
  ellipse(portrait, "head-silhouette", 120, 180, 240, 240, C.bluePrimary).opacity = 0.3;
  rect(portrait, "shoulder-silhouette", 60, 420, 360, 400, C.bluePrimary, 24).opacity = 0.3;
  // Tag
  const tag = frame(portrait, "doctor-tag", 24, 24, 120, 32, C.gold);
  tag.cornerRadius = 6;
  txt(tag, lang === "mn" ? "Ерөнхий эмч" : "대표원장", 0, 8, {
    font: pickFontB(lang), size: 12, ls: 1.5, color: C.navyDeep, align: "CENTER", width: 120
  });
  txt(portrait, lang === "mn" ? "Ём Дун Жү" : "염동주", 32, 720, {
    font: pickFontBL(lang), size: 30, ls: -0.5, color: C.white
  });
  txt(portrait, "M.D., Ph.D. " + (lang === "mn" ? "· Нүдний эмч" : "· 안과전문의"), 32, 770, {
    font: pickFontM(lang), size: 14, color: C.white, opacity: 0.85
  });

  // Right: quote
  const titleSize = lang === "mn" ? 54 : 64;
  txt(card, "“", 600, 180, {
    font: F.prBL, size: 180, lh: 126, color: C.gold
  });
  txt(card, T(post.title, lang), 600, 320, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize * 1.25, ls: -1.2,
    color: C.white, width: 540
  });
  rect(card, "rule", 600, 540, 80, 4, C.gold);
  txt(card, T(post.sub, lang), 600, 580, {
    font: pickFontM(lang), size: 24, lh: 38, color: C.white, opacity: 0.9, width: 540
  });

  // Credential pills
  const credKR = ["인제대 의대 박사","대한안과학회 정회원","ASCRS · ESCRS","누적 25,000건"];
  const credMN = ["Инжэ их сургуулийн доктор","Солонгосын нүдний нийгэмлэг","ASCRS · ESCRS","25,000 хагалгаа"];
  const creds = lang === "mn" ? credMN : credKR;
  let cx = 600, cy = 760;
  for (let i = 0; i < creds.length; i++) {
    const w = (creds[i].length * (lang === "mn" ? 11 : 14)) + 36;
    if (cx + w > 1140) { cx = 600; cy += 56; }
    const pill = frame(card, "cred-" + i, cx, cy, w, 44, C.white, 0.12);
    pill.cornerRadius = 999;
    pill.strokes = [solid(C.white, 0.25)];
    pill.strokeWeight = 1;
    txt(pill, creds[i], 18, 12, {
      font: pickFontSB(lang), size: 17, color: C.white
    });
    cx += w + 10;
  }

  buildFooter(card, lang);
  return card;
}

// -------------------- F4: Smile Pro stats --------------------
function buildF4(parent, x, y, lang) {
  const post = POSTS[3];
  const card = frame(parent, "F4-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  const titleSize = lang === "mn" ? 92 : 104;
  txt(card, T(post.title, lang), 64, 180, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize * 1.05, ls: -2.5,
    color: C.white, width: 1072
  });
  rect(card, "rule", 64, 432, 120, 5, C.gold);
  txt(card, T(post.sub, lang), 64, 470, {
    font: pickFontM(lang), size: 30, lh: 45, color: C.white, opacity: 0.88, width: 1072
  });

  const colW = (1072 - 48) / 4;
  for (let i = 0; i < STATS.length; i++) {
    const s = STATS[i];
    const isAccent = i === 2;
    const bg = isAccent ? C.gold : C.navyDeep;
    const accentFg = isAccent ? C.navyDeep : C.gold;
    const fg = isAccent ? C.navyDeep : C.white;
    const cx = 64 + i * (colW + 16);
    const cy = 680;
    const cell = frame(card, "stat-" + i, cx, cy, colW, 300, bg);
    cell.cornerRadius = 20;
    // value (anchored bottom)
    txt(cell, s.v, 28, 130, {
      font: F.inBL, size: 88, lh: 79, ls: -3, color: fg
    });
    rect(cell, "rule", 28, 234, 40, 3, accentFg);
    txt(cell, T(s.k, lang), 28, 252, {
      font: pickFontB(lang), size: 24, ls: -0.3, color: fg, width: colW - 56
    });
  }
  buildFooter(card, lang);
  return card;
}

// -------------------- F5: Location + subway map --------------------
function buildF5(parent, x, y, lang) {
  const post = POSTS[4];
  const card = frame(parent, "F5-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  // Pill
  const pill = frame(card, "station-pill", 64, 180, 320, 56, C.white, 0.12);
  pill.cornerRadius = 999;
  pill.strokes = [solid(C.white, 0.22)];
  pill.strokeWeight = 1;
  ellipse(pill, "line-2-dot", 12, 11, 34, 34, "#22B14C");
  txt(pill, "2", 12, 17, {
    font: F.inBL, size: 17, color: C.white, align: "CENTER", width: 34
  });
  txt(pill, lang === "mn" ? "Каннам · GANGNAM" : "강남역 · GANGNAM", 60, 18, {
    font: pickFontB(lang), size: 20, ls: 0.3, color: C.white
  });

  const titleSize = lang === "mn" ? 92 : 108;
  txt(card, T(post.title, lang), 64, 264, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize, ls: -3.5,
    color: C.white, width: 600
  });
  rect(card, "rule", 64, 528, 120, 5, C.gold);
  txt(card, T(post.sub, lang), 64, 568, {
    font: pickFontM(lang), size: 28, lh: 43, color: C.white, opacity: 0.9, width: 600
  });

  // Subway schematic (right white panel)
  const map = frame(card, "subway-map", 720, 180, 416, 840, C.white);
  map.cornerRadius = 24;
  txt(map, "EXIT 10 · " + (lang === "mn" ? "1 мин алхана" : "도보 1분"), 32, 32, {
    font: F.inB, size: 12, ls: 2, color: C.bluePrimary
  });
  // road
  rect(map, "road", 142, 70, 132, 700, "#F2F4F7");
  // station circle
  ellipse(map, "station-2", 168, 180, 80, 80, "#22B14C");
  txt(map, "2", 168, 194, {
    font: F.inBL, size: 36, color: C.white, align: "CENTER", width: 80
  });
  txt(map, lang === "mn" ? "Каннам" : "강남역", 100, 270, {
    font: pickFontB(lang), size: 14, color: C.navyDeep, align: "CENTER", width: 216
  });
  // exit 10 box
  rect(map, "exit-10", 70, 320, 64, 44, C.bluePrimary, 6);
  txt(map, "10", 70, 327, {
    font: F.inBL, size: 18, color: C.white, align: "CENTER", width: 64
  });
  txt(map, lang === "mn" ? "Гарц" : "출구", 70, 370, {
    font: pickFontSB(lang), size: 12, color: "#263541", align: "CENTER", width: 64
  });
  // clinic
  rect(map, "clinic", 220, 520, 120, 120, C.navyDeep, 12);
  txt(map, lang === "mn" ? "Каннам Смайл" : "강남스마일\n안과", 220, 540, {
    font: pickFontB(lang), size: 13, color: C.gold, align: "CENTER", lh: 18, width: 120
  });
  txt(map, "4·6F", 220, 600, {
    font: F.inB, size: 11, color: C.white, opacity: 0.7, align: "CENTER", width: 120
  });
  txt(map, "강남대로 · GANGNAM-DAERO", 32, 770, {
    font: pickFontM(lang), size: 11, color: C.ink50, align: "CENTER", width: 352
  });

  buildFooter(card, lang);
  return card;
}

// -------------------- F6: Contact channels --------------------
function buildF6(parent, x, y, lang) {
  const post = POSTS[5];
  const card = frame(parent, "F6-" + lang, x, y, 1200, 1200, C.bluePrimary);
  buildHeader(card, post);

  const titleSize = lang === "mn" ? 92 : 104;
  txt(card, T(post.title, lang), 64, 180, {
    font: pickFontBL(lang), size: titleSize, lh: titleSize * 1.06, ls: -2.5,
    color: C.white, width: 1072
  });
  rect(card, "rule", 64, 432, 120, 5, C.gold);
  txt(card, T(post.sub, lang), 64, 470, {
    font: pickFontM(lang), size: 30, lh: 47, color: C.white, opacity: 0.88, width: 1072
  });

  const colW = (1072 - 48) / 4;
  for (let i = 0; i < CHANNELS.length; i++) {
    const c = CHANNELS[i];
    const cx = 64 + i * (colW + 16);
    const cy = 680;
    const cell = frame(card, "channel-" + i, cx, cy, colW, 300, C.white);
    cell.cornerRadius = 20;
    ellipse(cell, "dot", 28, 32, 18, 18, c.dot);
    txt(cell, T(c.name, lang), 56, 34, {
      font: pickFontB(lang), size: 18, ls: 0.5, color: C.bluePrimary
    });
    txt(cell, c.id, 28, 188, {
      font: pickFontBL(lang), size: 22, ls: -0.4, lh: 28, color: C.navyDeep, width: colW - 56
    });
    txt(cell, T(c.note, lang), 28, 252, {
      font: pickFontM(lang), size: 18, color: C.ink50, width: colW - 56
    });
  }
  buildFooter(card, lang);
  return card;
}

const BUILDERS = [buildF1, buildF2, buildF3, buildF4, buildF5, buildF6];

// -------------------- Page composition --------------------
function findOrCreatePage(name) {
  let p = figma.root.children.find(p => p.name === name);
  if (!p) {
    p = figma.createPage();
    p.name = name;
  }
  return p;
}

async function buildReviewPage() {
  const pageName = YYMM + "_카드뉴스_FB브랜드런칭";
  const page = findOrCreatePage(pageName);
  await figma.setCurrentPageAsync(page);
  page.backgrounds = [solid("#ECEEF3")];

  const GAP_X = 80;
  const GAP_Y_LANG = 60;     // KR row → MN row
  const GAP_Y_MEMO = 40;     // MN row → memo row
  const ROW_H = 1200;
  const MEMO_H = 220;
  const MEMO_W = 1200;

  // Section title
  txt(page, "FB 브랜드 런칭 피드 · 1200×1200 · KR/MN 페어 (리뷰용)", 0, -80, {
    font: F.prBL, size: 36, ls: -1, color: "#0F1A30"
  });
  txt(page,
    "각 카드의 KR(상단) · MN(하단) · 메모(맨 아래) 한 세트. 카피 수정은 KR 우선 → MN 동기화. 배포용은 우측 _MN 페이지 사용.",
    0, -32, {
    font: F.prM, size: 18, color: "#263541"
  });

  for (let i = 0; i < BUILDERS.length; i++) {
    const xCol = i * (1200 + GAP_X);
    const yKR = 0;
    const yMN = ROW_H + GAP_Y_LANG;
    const yMemo = yMN + ROW_H + GAP_Y_MEMO;

    // Column header (above KR)
    txt(page, POSTS[i].id + " · " + POSTS[i].label.kr, xCol, -16, {
      font: F.prBL, size: 22, ls: -0.5, color: "#0F1A30"
    });

    BUILDERS[i](page, xCol, yKR, "kr");
    BUILDERS[i](page, xCol, yMN, "mn");

    // Memo block
    const memo = frame(page, "memo-" + POSTS[i].id, xCol, yMemo, MEMO_W, MEMO_H, "#FFFFFF");
    memo.cornerRadius = 16;
    memo.strokes = [solid("#E5E9EF")];
    memo.strokeWeight = 1;
    txt(memo, "MEMO · 검수 노트", 32, 24, {
      font: F.inBL, size: 13, ls: 1.8, color: "#1C2CAE", upper: true
    });
    txt(memo, "역할 · " + POSTS[i].role, 32, 60, {
      font: F.prSB, size: 18, ls: -0.3, color: "#0F1A30"
    });
    txt(memo, "KR 카피 · " + (POSTS[i].title.kr || "").replace(/\n/g, " / "), 32, 96, {
      font: F.prM, size: 15, lh: 22, color: "#263541", width: MEMO_W - 64
    });
    txt(memo, "MN 카피 · " + (POSTS[i].title.mn || "").replace(/\n/g, " / "), 32, 138, {
      font: F.mn, size: 15, lh: 22, color: "#263541", width: MEMO_W - 64
    });
    txt(memo, "체크 · 줄바꿈 위치 / 키릴 폭(약 0.78×) / 띠지 텍스트 / 가독성 ≥ 12pt 환산", 32, 180, {
      font: F.prM, size: 13, color: "#798183", width: MEMO_W - 64
    });
  }

  // Fit view
  figma.viewport.scrollAndZoomIntoView(page.children);
}

async function buildDeployMNPage() {
  const pageName = YYMM + "_카드뉴스_FB브랜드런칭_MN";
  const page = findOrCreatePage(pageName);
  await figma.setCurrentPageAsync(page);
  page.backgrounds = [solid("#ECEEF3")];

  const GAP_X = 80;

  txt(page, "FB 브랜드 런칭 피드 · MN 배포용 (Монгол)", 0, -80, {
    font: F.prBL, size: 36, ls: -1, color: "#0F1A30"
  });
  txt(page, "Facebook · Instagram 게시용 · 1200×1200 PNG export → @smile_eyeclinic_eng", 0, -32, {
    font: F.prM, size: 18, color: "#263541"
  });

  for (let i = 0; i < BUILDERS.length; i++) {
    const xCol = i * (1200 + GAP_X);
    txt(page, POSTS[i].id + " · " + POSTS[i].label.mn, xCol, -16, {
      font: F.mn, size: 22, ls: -0.5, color: "#0F1A30"
    });
    BUILDERS[i](page, xCol, 0, "mn");
  }
  figma.viewport.scrollAndZoomIntoView(page.children);
}

// -------------------- Main --------------------
(async () => {
  try {
    await loadFonts();
    await buildReviewPage();
    await buildDeployMNPage();
    figma.notify("✅ 카드뉴스 2페이지 생성 완료 — " + YYMM + "_카드뉴스_FB브랜드런칭 (+ _MN)", { timeout: 4000 });
  } catch (e) {
    figma.notify("❌ 오류: " + (e && e.message ? e.message : e), { error: true, timeout: 6000 });
    console.error(e);
  } finally {
    figma.closePlugin();
  }
})();
