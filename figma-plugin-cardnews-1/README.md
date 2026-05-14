# 강남스마일 · FB 브랜드 런칭 카드뉴스 플러그인 (1200×1200)

[ui_kits/cardnews-1](../cardnews-1/index.html) HTML 프로토타입을 Figma 작업 가능한 6장 시리즈로 자동 생성하는 로컬 플러그인.

## 무엇이 생성되나

플러그인 1회 실행 → 현재 Figma 파일에 **2페이지** 자동 추가:

| 페이지 | 용도 | 레이아웃 |
|--------|------|----------|
| `{YYMM}_카드뉴스_FB브랜드런칭` | 내부 검수 (KR + MN + 메모 페어) | 6개 컬럼 × 3행(KR / MN / Memo) |
| `{YYMM}_카드뉴스_FB브랜드런칭_MN` | 몽골 인스타·페이스북 배포용 | 6개 MN 카드 한 줄 |

`{YYMM}`은 실행 시점 자동 (예: 2026-05 → `2605`).

### 6장 시리즈 (각 1200×1200)
- **F1 · 브랜드 인트로** — "안녕하세요, 강남스마일안과" + 18년 마크 + CTA 2개
- **F2 · 진료 영역** — 시력교정 / 백내장 / 안성형 3컬럼 (가운데 골드 강조)
- **F3 · 의료진** — 염동주 대표원장 포트레이트 + 인용구 + 자격 칩
- **F4 · 시그니처 기술** — 스마일프로 5가지 핵심 4컬럼 통계 (3번째 골드 강조)
- **F5 · 위치** — 강남역 10번 출구 + 지하철 약도 (우측 화이트 패널)
- **F6 · 상담 CTA** — 카카오 / 전화 / 인스타그램 / WhatsApp 4채널

## 설치 (1분)

1. Figma **데스크톱 앱** 실행 (웹 버전 미지원)
2. 강남스마일 마스터 Figma 파일 열기
3. 메뉴 → **Plugins → Development → Import plugin from manifest…**
4. 이 폴더의 `manifest.json` 선택

## 실행

Figma 메뉴 → **Plugins → Development → Gangnam Smile · FB Brand Launch Cardnews (1200×1200)**

5–10초 후 좌측 페이지 패널에 `{YYMM}_카드뉴스_FB브랜드런칭` (검수) + `_MN` (배포) 두 페이지 생성.

## 폰트 요구사항

시스템에 설치 필요:
- **Pretendard** (Regular / Medium / SemiBold / Bold / Black)
- **Inter** (Regular / Medium / SemiBold / Bold / Black)
- **Noto Sans Mongolian** Regular

## 작업 흐름

1. 본 플러그인으로 KR+MN+메모 페어 생성 (검수용 페이지)
2. KR 카피 우선 수정 → 동일 카드의 MN으로 동기화 (수동 또는 Claude in Figma)
3. 검수 OK → `_MN` 페이지의 카드 6장을 1200×1200 PNG 일괄 export
4. 페이스북·인스타 (@smile_eyeclinic_eng) 게시

## 디자인 토큰 (cardnews-1과 1:1)

```
Brand primary  #1C2CAE  ← 카드 배경
Navy deep      #0F1A30  ← 헤더/푸터 띠지
Gold           #E8B143  ← 포인트, CTA primary
White          #FFFFFF
```

## 변경 / 재실행

- 같은 이름 페이지가 있어도 **새로 만들지 않고 기존 페이지 재사용** (덮어쓰지 않음 — 노드는 추가됨)
- 깨끗한 재생성을 원하면 페이지를 먼저 수동 삭제 후 재실행
- 카피 수정은 `code.js` 내 `POSTS` / `SPEC` / `STATS` / `CHANNELS` 상수 편집

## 알려진 한계

- F3 의료진 포트레이트는 **플레이스홀더** (네이비 박스 + 실루엣) — `assets/dr-yeom.jpg` 등으로 수동 교체 필요
- F5 지하철 약도는 단순 도식 — 실제 배포본은 photoshop·일러스트 약도로 교체 권장
- 메모 블록의 자동 줄바꿈은 영문 기준 — 긴 한국어/몽골어는 수동 수정
