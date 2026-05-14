# 강남스마일 · Figma Design System Generator

Figma 파일에 한 번 실행하면, **강남스마일안과의원 디자인 시스템 v1** 전체를 자동으로 만들어주는 로컬 플러그인.

## 무엇이 생성되나

- ✅ **컬러 스타일** 20종 (Brand / Surface / Ink / Semantic / Line)
  → Figma 우측 패널 "Local styles → Paints" 에 등록
- ✅ **텍스트 스타일** 9종 (Display / H1–H3 / Body L / Body / Caption / Eyebrow / Italic Accent)
  → Figma 우측 패널 "Local styles → Text" 에 등록
- ✅ **04 Cover** 페이지 — 디자인 시스템 표지 (1920×1080)
- ✅ **01 Foundation** 페이지 — 컬러 토큰 + 타이포 스케일 쇼케이스
- ✅ **02 Components** 페이지 — Button / Tag / Stat / Number Badge / Why Card / Treatment Card / Doctor Card / Generation Timeline / Footer Band
- ✅ **03 Card News 1080** 페이지 — 1080×1080 Safe Zone Master + 7-Page 템플릿 (P1 표지 → P7 CTA)

생성 후 컬러/텍스트 스타일은 그 파일의 **모든 페이지**에서 재사용 가능 — Claude in Figma도 이 스타일들을 인식해서 새 카드뉴스를 만들 때 자동으로 적용합니다.

## 설치 (1분, 1회만)

1. Figma 데스크톱 앱 실행 (웹 버전은 로컬 플러그인 미지원 — **반드시 데스크톱**)
2. 강남스마일 마스터 Figma 파일 열기 (없으면 신규 파일 생성)
3. 메뉴바 → **Plugins → Development → Import plugin from manifest…**
4. 이 폴더의 `manifest.json` 선택

## 실행

1. Figma 메뉴 → **Plugins → Development → Gangnam Smile · Design System Generator**
2. 약 5–10초 대기 (폰트 로딩 + 페이지 4개 생성)
3. 완료 알림이 뜨면 좌측 페이지 패널에서 **04 Cover / 01 Foundation / 02 Components / 03 Card News 1080** 확인

## 폰트 요구사항

플러그인은 다음 폰트가 시스템에 설치되어 있어야 정상 작동합니다:

- **Pretendard** (Regular / Medium / SemiBold / Bold / Black) — [공식 사이트](https://github.com/orioncactus/pretendard)
- **Inter** (Regular / Medium / SemiBold) — Google Fonts
- **Cormorant Garamond** (Italic / SemiBold / Medium Italic) — Google Fonts
- **Noto Sans Mongolian** — Google Fonts
- **Noto Sans** (Regular / SemiBold) — Google Fonts

설치 안 된 폰트가 있으면 실행 중 에러 알림이 뜹니다 — 해당 폰트 설치 후 재실행.

## 재실행해도 안전

- 같은 이름의 컬러/텍스트 스타일은 **덮어쓰지 않고 스킵** — 이미 만든 스타일을 보존.
- 페이지는 매번 새로 생성되므로, 이전 결과가 필요 없으면 수동 삭제.

## 활용 시나리오 (Claude in Figma)

생성된 스타일과 컴포넌트가 있는 상태에서 Claude in Figma에 다음과 같이 요청 가능:

```
"02 Components 페이지의 Treatment Card를 복제해서
 백내장 수술용 카드를 만들어. gen-label은 '60대 이상 권장'."

"03 Card News의 P4 Big Number 템플릿을 복제해서
 숫자만 '12,000건 누적'으로 바꾸고 캡션도 수정해."

"Brand/navy 컬러와 H2 텍스트 스타일을 적용해서
 신년 프로모션 카드뉴스 표지를 만들어."
```

Claude가 이미 등록된 스타일을 인식하므로 일관성이 자동 유지됩니다.

## 트러블슈팅

| 증상 | 원인 / 해결 |
|------|-------------|
| "Cannot find font Pretendard Black" | 해당 폰트 굵기 미설치 → Pretendard 풀세트 재설치 |
| 플러그인이 메뉴에 안 보임 | 데스크톱 앱이 아니거나, manifest.json 경로 잘못 선택 — 다시 import |
| 컬러 스타일이 안 만들어짐 | 같은 이름이 이미 있을 가능성 → "Brand/navy" 등 검색해서 확인 |
| 텍스트가 깨져 보임 | 폰트 미설치 → 시스템 폰트북에서 설치 후 Figma 재시작 |
| "페이지가 비어 보임" | 좌측 패널에서 04 Cover 클릭 → Z 키로 fit-to-screen |

## 버전

- v1.0 (2026-05) — 초기 버전. 컬러/타이포/컴포넌트/카드뉴스 7-page 포함
- 추후 추가 예정: 인스타 스토리 9:16, 인쇄물 (명함·리플렛), 컴포넌트의 Figma Component 자동 변환
