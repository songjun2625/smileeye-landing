// Facebook brand-launch templates · 1200×1200 · KR/MN bilingual
// Background palette: SIGNATURE BLUE (#1C2CAE = --gsc-blue-primary)
// Tighter, more compact layouts than the navy variant.

const T = (v, lang) => (typeof v === "string" ? v : v?.[lang] ?? v?.kr ?? "");

// ===========================================================
// F1 — Brand intro · COMPACT
// ===========================================================
function FB_F1({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      {/* eyebrow strip — 0.75x height (140→105) */}
      <div style={{position:"absolute", left:0, right:0, top:0, height:105, background:"var(--gsc-blue-navy-deep)", display:"flex", alignItems:"center", padding:"0 64px", justifyContent:"space-between", boxSizing:"border-box"}}>
        <div style={{display:"flex", alignItems:"center", gap:14}}>
          <span style={{width:32, height:4, background:"var(--gsc-gold)"}} />
          <span style={{fontFamily:"var(--font-en)", fontSize:18, fontWeight:800, letterSpacing:2.5, color:"var(--gsc-gold)"}}>{d.eyebrow}</span>
        </div>
        <span style={{fontFamily:"var(--font-en)", fontSize:16, fontWeight:700, letterSpacing:2, color:"rgba(255,255,255,0.75)"}}>F1 / 06</span>
      </div>

      {/* main content area */}
      <div style={{position:"absolute", left:80, right:80, top:170, display:"flex", flexDirection:"column", gap:32}}>
        <div style={{fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 88 : 100, fontWeight:900, lineHeight:1.1, letterSpacing:-2.5, color:"#fff", whiteSpace:"pre-line", textWrap:"pretty"}}>
          {T(d.title, lang)}
        </div>
        <div style={{display:"flex", alignItems:"center", gap:20}}>
          <div style={{width:80, height:4, background:"var(--gsc-gold)"}} />
          <div style={{fontFamily:"var(--font-en)", fontSize:20, fontWeight:700, letterSpacing:3, color:"var(--gsc-gold)"}}>{T(d.yearTag, lang)}</div>
        </div>
        <div style={{fontFamily:"var(--font-kr)", fontSize:32, fontWeight:500, lineHeight:1.5, color:"rgba(255,255,255,0.92)", whiteSpace:"pre-line", textWrap:"pretty", maxWidth:1000}}>
          {T(d.sub, lang)}
        </div>
      </div>

      {/* 18 mark + CTAs */}
      <div style={{position:"absolute", left:80, bottom:170, display:"flex", alignItems:"flex-end", gap:48}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
          <div style={{fontFamily:"var(--font-en)", fontSize:260, fontWeight:900, lineHeight:0.82, letterSpacing:-12, color:"var(--gsc-gold)"}}>18</div>
          <div style={{fontFamily:"var(--font-kr)", fontSize:22, fontWeight:600, color:"#fff", letterSpacing:-0.2, marginTop:10}}>{T(d.yearLine, lang)}</div>
        </div>
        <div style={{display:"flex", gap:12, marginBottom:24}}>
          <div style={{padding:"18px 28px", background:"var(--gsc-gold)", color:"var(--gsc-blue-navy-deep)", borderRadius:999, fontFamily:"var(--font-kr)", fontWeight:700, fontSize:20}}>{T(d.cta, lang)[0]}</div>
          <div style={{padding:"18px 28px", border:"1.5px solid rgba(255,255,255,0.55)", color:"#fff", borderRadius:999, fontFamily:"var(--font-kr)", fontWeight:700, fontSize:20}}>{T(d.cta, lang)[1]}</div>
        </div>
      </div>

      <FBFooter d={d} lang={lang} />
    </div>
  );
}

// ===========================================================
// F2 — Three specialty areas
// ===========================================================
function FB_F2({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      <FBHeader d={d} lang={lang} variant="dark" />

      <div style={{position:"absolute", left:64, top:180, width:1072, fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 88 : 96, fontWeight:900, lineHeight:1.08, letterSpacing:-2, color:"#fff", whiteSpace:"pre-line"}}>{T(d.title, lang)}</div>
      <div style={{position:"absolute", left:64, top:430, width:1072, fontSize:32, fontWeight:500, lineHeight:1.5, color:"rgba(255,255,255,0.88)", whiteSpace:"pre-line"}}>{T(d.sub, lang)}</div>

      <div style={{position:"absolute", left:64, top:620, width:1072, display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16}}>
        {FB_SPEC.map((s, i) => (
          <div key={i} style={{height:380, borderRadius:20, background: i===1 ? "var(--gsc-gold)" : "var(--gsc-blue-navy-deep)", color: i===1 ? "var(--gsc-blue-navy-deep)" : "#fff", padding:32, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"var(--font-en)", fontSize:56, fontWeight:900, letterSpacing:-3, color: i===1 ? "var(--gsc-blue-navy-deep)" : "var(--gsc-gold)", lineHeight:1}}>{s.num}</div>
              <div style={{width:48, height:3, background: i===1 ? "var(--gsc-blue-navy-deep)" : "var(--gsc-gold)", margin:"16px 0"}} />
              <div style={{fontFamily:"var(--font-kr)", fontSize:34, fontWeight:800, letterSpacing:-0.5}}>{T(s.name, lang)}</div>
              <div style={{fontFamily:"var(--font-kr)", fontSize:22, fontWeight:500, color: i===1 ? "rgba(15,26,48,0.78)" : "rgba(255,255,255,0.88)", marginTop:10, lineHeight:1.5}}>{T(s.items, lang)}</div>
            </div>
            <div style={{fontFamily:"var(--font-kr)", fontSize:20, fontWeight:700, color: i===1 ? "var(--gsc-blue-navy-deep)" : "var(--gsc-gold)", letterSpacing:-0.2}}>{T(s.note, lang)}</div>
          </div>
        ))}
      </div>

      <FBFooter d={d} lang={lang} variant="dark" />
    </div>
  );
}

// ===========================================================
// F3 — Doctor intro · quote
// ===========================================================
function FB_F3({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      <FBHeader d={d} lang={lang} variant="dark" />

      {/* portrait */}
      <div style={{position:"absolute", left:64, top:180, width:480, height:820, borderRadius:24, overflow:"hidden", background:"linear-gradient(180deg, rgba(15,26,48,.05) 0%, rgba(15,26,48,.7) 100%), #0F1A30", backgroundSize:"cover", backgroundPosition:"center"}}>
        {/* placeholder portrait silhouette */}
        <svg viewBox="0 0 480 780" style={{position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.3}}>
          <circle cx="240" cy="280" r="120" fill="#1C2CAE" />
          <path d="M 80 780 Q 80 480 240 480 Q 400 480 400 780 Z" fill="#1C2CAE" />
        </svg>
        <div style={{position:"absolute", top:24, left:24, padding:"6px 14px", background:"var(--gsc-gold)", color:"var(--gsc-blue-navy-deep)", fontFamily:"var(--font-kr)", fontSize:12, fontWeight:700, letterSpacing:1.5, borderRadius:6}}>
          {lang==="mn" ? "Ерөнхий эмч" : "대표원장"}
        </div>
        <div style={{position:"absolute", left:32, bottom:32, color:"#fff"}}>
          <div style={{fontFamily:"var(--font-kr)", fontSize:30, fontWeight:800, letterSpacing:-0.5}}>{lang==="mn" ? "Ём Дун Жү" : "염동주"}</div>
          <div style={{fontFamily:"var(--font-kr)", fontSize:14, fontWeight:500, color:"rgba(255,255,255,0.85)", marginTop:4}}>M.D., Ph.D. {lang==="mn" ? "· Нүдний эмч" : "· 안과전문의"}</div>
        </div>
      </div>

      {/* right: quote */}
      <div style={{position:"absolute", left:600, top:180, width:540}}>
        <div style={{fontFamily:"var(--font-display)", fontSize:180, fontWeight:900, lineHeight:0.7, color:"var(--gsc-gold)", height:80}}>"</div>
        <div style={{fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 54 : 64, fontWeight:800, lineHeight:1.25, letterSpacing:-1.2, color:"#fff", marginTop:40, whiteSpace:"pre-line"}}>{T(d.title, lang)}</div>
        <div style={{width:80, height:4, background:"var(--gsc-gold)", margin:"32px 0"}} />
        <div style={{fontFamily:"var(--font-kr)", fontSize:24, fontWeight:500, lineHeight:1.6, color:"rgba(255,255,255,0.9)", whiteSpace:"pre-line"}}>{T(d.sub, lang)}</div>

        <div style={{marginTop:40, display:"flex", flexWrap:"wrap", gap:10}}>
          {(lang==="mn"
            ? ["Инжэ их сургуулийн доктор","Солонгосын нүдний нийгэмлэг","ASCRS · ESCRS","25,000 хагалгаа"]
            : ["인제대 의대 박사","대한안과학회 정회원","ASCRS · ESCRS","누적 25,000건"]
          ).map((c,i) => (
            <span key={i} style={{padding:"10px 18px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:999, fontFamily:"var(--font-kr)", fontSize:17, fontWeight:600, color:"#fff"}}>{c}</span>
          ))}
        </div>
      </div>

      <FBFooter d={d} lang={lang} variant="dark" />
    </div>
  );
}

// ===========================================================
// F4 — Smile Pro stats
// ===========================================================
function FB_F4({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      <FBHeader d={d} lang={lang} variant="dark" />

      <div style={{position:"absolute", left:64, top:180, width:1072}}>
        <div style={{fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 92 : 104, fontWeight:900, lineHeight:1.05, letterSpacing:-2.5, color:"#fff", whiteSpace:"pre-line"}}>{T(d.title, lang)}</div>
        <div style={{width:120, height:5, background:"var(--gsc-gold)", margin:"28px 0"}} />
        <div style={{fontFamily:"var(--font-kr)", fontSize:30, fontWeight:500, lineHeight:1.5, color:"rgba(255,255,255,0.88)", whiteSpace:"pre-line"}}>{T(d.sub, lang)}</div>
      </div>

      <div style={{position:"absolute", left:64, top:680, width:1072, display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16}}>
        {FB_STATS.map((s, i) => (
          <div key={i} style={{height:300, borderRadius:20, background: i===2 ? "var(--gsc-gold)" : "var(--gsc-blue-navy-deep)", color: i===2 ? "var(--gsc-blue-navy-deep)" : "#fff", padding:28, display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
            <div style={{fontFamily:"var(--font-en)", fontWeight:900, fontSize:88, letterSpacing:-3, lineHeight:0.9}}>{s.v}</div>
            <div style={{width:40, height:3, background: i===2 ? "var(--gsc-blue-navy-deep)" : "var(--gsc-gold)", margin:"14px 0"}} />
            <div style={{fontFamily:"var(--font-kr)", fontSize:24, fontWeight:700, letterSpacing:-0.3}}>{T(s.k, lang)}</div>
          </div>
        ))}
      </div>

      <FBFooter d={d} lang={lang} variant="dark" />
    </div>
  );
}

// ===========================================================
// F5 — Location · subway map
// ===========================================================
function FB_F5({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      <FBHeader d={d} lang={lang} variant="dark" />

      <div style={{position:"absolute", left:64, top:180, width:600}}>
        <div style={{display:"inline-flex", alignItems:"center", gap:12, padding:"10px 20px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:999, marginBottom:28}}>
          <span style={{display:"inline-flex", alignItems:"center", justifyContent:"center", width:34, height:34, borderRadius:"50%", background:"#22B14C", color:"#fff", fontFamily:"var(--font-en)", fontWeight:800, fontSize:17}}>2</span>
          <span style={{fontFamily:"var(--font-kr)", fontSize:20, fontWeight:700, letterSpacing:0.3, color:"#fff"}}>{lang==="mn" ? "Каннам · GANGNAM" : "강남역 · GANGNAM"}</span>
        </div>
        <div style={{fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 92 : 108, fontWeight:900, lineHeight:1.0, letterSpacing:-3.5, color:"#fff", whiteSpace:"pre-line"}}>{T(d.title, lang)}</div>
        <div style={{width:120, height:5, background:"var(--gsc-gold)", margin:"32px 0"}} />
        <div style={{fontFamily:"var(--font-kr)", fontSize:28, fontWeight:500, lineHeight:1.55, color:"rgba(255,255,255,0.9)", whiteSpace:"pre-line"}}>{T(d.sub, lang)}</div>
      </div>

      {/* schematic */}
      <div style={{position:"absolute", left:720, top:180, width:416, height:840, borderRadius:24, background:"#fff", padding:32, boxSizing:"border-box"}}>
        <div style={{fontFamily:"var(--font-en)", fontSize:12, fontWeight:700, letterSpacing:2, color:"var(--gsc-blue-primary)"}}>EXIT 10 · {lang==="mn" ? "1 мин алхана" : "도보 1분"}</div>
        <svg viewBox="0 0 350 600" width="100%" height="640" style={{marginTop:16}}>
          <rect x="120" y="0" width="120" height="600" fill="#F2F4F7" />
          <line x1="180" y1="0" x2="180" y2="600" stroke="#E5E9EF" strokeWidth="1" strokeDasharray="6 6"/>
          <circle cx="180" cy="120" r="36" fill="#22B14C" />
          <text x="180" y="130" textAnchor="middle" fontFamily="Inter" fontSize="28" fontWeight="900" fill="#fff">2</text>
          <text x="180" y="180" textAnchor="middle" fontFamily="Pretendard" fontSize="14" fontWeight="700" fill="#0F1A30">{lang==="mn" ? "Каннам" : "강남역"}</text>
          <rect x="60" y="220" width="56" height="36" rx="6" fill="#1C2CAE" />
          <text x="88" y="244" textAnchor="middle" fontFamily="Inter" fontSize="16" fontWeight="800" fill="#fff">10</text>
          <text x="88" y="278" textAnchor="middle" fontFamily="Pretendard" fontSize="11" fontWeight="600" fill="#263541">{lang==="mn" ? "Гарц" : "출구"}</text>
          <path d="M 88 256 L 88 360 L 220 360 L 220 420" stroke="#E8B143" strokeWidth="3" strokeDasharray="6 6" fill="none"/>
          <rect x="200" y="420" width="100" height="100" rx="12" fill="#0F1A30" />
          <text x="250" y="455" textAnchor="middle" fontFamily="Pretendard" fontSize="11" fontWeight="700" fill="#E8B143">{lang==="mn" ? "Каннам" : "강남스마일"}</text>
          <text x="250" y="475" textAnchor="middle" fontFamily="Pretendard" fontSize="11" fontWeight="700" fill="#E8B143">{lang==="mn" ? "Смайл" : "안과"}</text>
          <text x="250" y="500" textAnchor="middle" fontFamily="Pretendard" fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.7)">4·6F</text>
          <text x="175" y="570" textAnchor="middle" fontFamily="Pretendard" fontSize="11" fontWeight="600" fill="#798183">강남대로 · GANGNAM-DAERO</text>
        </svg>
      </div>

      <FBFooter d={d} lang={lang} variant="dark" />
    </div>
  );
}

// ===========================================================
// F6 — Contact channels
// ===========================================================
function FB_F6({ d, lang }) {
  return (
    <div className="fb-card" style={{background:"var(--gsc-blue-primary)", color:"#fff"}}>
      <FBHeader d={d} lang={lang} variant="dark" />

      <div style={{position:"absolute", left:64, top:180, width:1072}}>
        <div style={{fontFamily:"var(--font-kr)", fontSize: lang==="mn" ? 92 : 104, fontWeight:900, lineHeight:1.06, letterSpacing:-2.5, color:"#fff", whiteSpace:"pre-line"}}>{T(d.title, lang)}</div>
        <div style={{width:120, height:5, background:"var(--gsc-gold)", margin:"28px 0"}} />
        <div style={{fontFamily:"var(--font-kr)", fontSize:30, fontWeight:500, lineHeight:1.55, color:"rgba(255,255,255,0.88)", whiteSpace:"pre-line"}}>{T(d.sub, lang)}</div>
      </div>

      <div style={{position:"absolute", left:64, top:680, width:1072, display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16}}>
        {FB_CHANNELS.map((c, i) => (
          <div key={i} style={{height:300, borderRadius:20, background:"#fff", color:"var(--gsc-blue-navy-deep)", padding:28, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <div style={{display:"flex", alignItems:"center", gap:12}}>
              <span style={{width:18, height:18, borderRadius:"50%", background:c.dot}} />
              <span style={{fontFamily:"var(--font-kr)", fontSize:18, fontWeight:700, letterSpacing:0.5, color:"var(--gsc-blue-primary)"}}>{T(c.name, lang)}</span>
            </div>
            <div>
              <div style={{fontFamily:"var(--font-kr)", fontSize:22, fontWeight:900, color:"var(--gsc-blue-navy-deep)", letterSpacing:-0.4, lineHeight:1.25, wordBreak:"keep-all", overflowWrap:"anywhere"}}>{c.id}</div>
              <div style={{fontFamily:"var(--font-kr)", fontSize:18, fontWeight:500, color:"var(--gsc-ink-50)", marginTop:10}}>{T(c.note, lang)}</div>
            </div>
          </div>
        ))}
      </div>

      <FBFooter d={d} lang={lang} variant="dark" />
    </div>
  );
}

// ===========================================================
// Shared header / footer
// ===========================================================
function FBHeader({ d, lang, variant }) {
  return (
    <>
      {/* Header strip — 0.75x (140→105) */}
      <div style={{position:"absolute", left:0, right:0, top:0, height:105, background:"var(--gsc-blue-navy-deep)"}} />
      <div style={{position:"absolute", left:64, top:42, display:"flex", alignItems:"center", gap:14}}>
        <span style={{width:32, height:4, background:"var(--gsc-gold)"}} />
        <span style={{fontFamily:"var(--font-en)", fontSize:18, fontWeight:800, letterSpacing:2.5, color:"var(--gsc-gold)", textTransform:"uppercase"}}>{d.eyebrow}</span>
      </div>
      <div style={{position:"absolute", right:64, top:46, fontFamily:"var(--font-en)", fontSize:16, fontWeight:700, letterSpacing:2, color:"rgba(255,255,255,0.75)", whiteSpace:"nowrap"}}>{d.id} / 06</div>
    </>
  );
}

// Brand logo — eye-motif mark + compact wordmark (0.75x)
function BrandLogo() {
  return (
    <div style={{display:"inline-flex", alignItems:"center", gap:11, flexShrink:0}}>
      {/* Eye motif */}
      <svg width="42" height="30" viewBox="0 0 56 40" style={{flexShrink:0}}>
        <ellipse cx="28" cy="20" rx="26" ry="14" fill="none" stroke="var(--gsc-gold)" strokeWidth="2.5" />
        <circle cx="28" cy="20" r="9" fill="var(--gsc-gold)" />
        <circle cx="31" cy="17" r="3" fill="#fff" />
      </svg>
      <div style={{display:"flex", flexDirection:"column", lineHeight:1, whiteSpace:"nowrap"}}>
        <span style={{fontFamily:"var(--font-en)", fontSize:14, fontWeight:900, letterSpacing:1, color:"#fff"}}>SMILE</span>
        <span style={{fontFamily:"var(--font-en)", fontSize:9, fontWeight:700, letterSpacing:2, color:"var(--gsc-gold)", marginTop:3}}>EYE CLINIC</span>
      </div>
    </div>
  );
}

function FBFooter({ d, lang, variant }) {
  return (
    <>
      <div style={{position:"absolute", left:0, right:0, top:1125, height:75, background:"var(--gsc-blue-navy-deep)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 64px", boxSizing:"border-box"}}>
        <div style={{fontFamily:"var(--font-kr)", fontSize:20, fontWeight:800, color:"#fff", letterSpacing:-0.3, whiteSpace:"nowrap"}}>{T(FB_FOOTER.brand, lang)}</div>
        <BrandLogo />
      </div>
    </>
  );
}

window.BrandLogo = BrandLogo;

window.FB_F1 = FB_F1;
window.FB_F2 = FB_F2;
window.FB_F3 = FB_F3;
window.FB_F4 = FB_F4;
window.FB_F5 = FB_F5;
window.FB_F6 = FB_F6;
window.FBHeader = FBHeader;
window.FBFooter = FBFooter;
