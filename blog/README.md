# 강남스마일 블로그 — 개발자 통합 가이드

> **목표**: smile-i.com/blog/ 및 smile-i.com/mn/blog/ 경로에 자동 발행된 블로그 글을 통합

이 폴더는 자동 발행 파이프라인이 생성한 **사이트 통합 준비 완료** 파일들입니다.

## 폴더 구조

```
handoff/
├── README.md          ← 이 파일
├── blog.css           ← 공용 스타일시트 (한 번만 업로드)
├── ko/blog/
│   ├── index.html     ← 한국어 블로그 목록
│   ├── {slug}/
│   │   ├── index.html ← 개별 글 페이지
│   │   └── og.jpg     ← OG 이미지 (1200×630)
│   └── …
└── mn/blog/
    ├── index.html     ← 몽골어 블로그 목록
    └── …
```

## 통합 절차

### 1. CSS 한 번만 업로드
```
서버 경로: smile-i.com/blog/blog.css
파일: blog.css
```

각 글 HTML이 `<link rel="stylesheet" href="../blog.css">`로 참조 — 한 번 업로드하면 모든 글에 자동 적용.

### 2. 각 글 폴더 통째로 업로드
```
서버 경로: smile-i.com/mn/blog/{slug}/
파일: mn/blog/{slug}/index.html, mn/blog/{slug}/og.jpg
```

각 글 폴더 = 1 URL 슬러그. 폴더명이 곧 URL의 마지막 segment.

예: `mn/blog/lasik-review-mongolian-office-worker-korea/` 폴더 →
    `https://smile-i.com/mn/blog/lasik-review-mongolian-office-worker-korea/`

### 3. 블로그 목록 페이지
```
mn/blog/index.html → smile-i.com/mn/blog/
ko/blog/index.html → smile-i.com/blog/
```

자동으로 글 카드 그리드 노출. 새 글 추가 시 자동 갱신 (다음 발행 시 index.html 새로 받음).

## 새 글 발행 흐름

1. 송준이 시트에 토픽 1줄 입력
2. 클로드가 자동 생성·번역·이미지 매칭
3. 몽골어 검수자 시트에서 검수
4. 이 폴더에 새 글 폴더가 자동 추가됨
5. 이정희가 새 폴더만 서버에 업로드

## CMS 통합 옵션 (WordPress 등 사용 시)

각 글 HTML의 `<article class="blog-post">` 안의 본문만 잘라서 CMS 본문에 붙여넣어도 됨.
이 경우 메타데이터(제목·날짜·태그)는 CMS 자체 필드 사용.

## SEO 자산

각 글에 자동 포함:
- `canonical` URL · hreflang(ko/mn/x-default)
- OG / Twitter Card 메타
- Schema.org JSON-LD (Article + FAQ + Breadcrumb)
- 1200×630 og.jpg

추가 작업 불필요. 그대로 업로드만.

## 문의

- 자동화 시스템: 송준 (PortZone)
- 통합 작업: 이정희 (개발)
- 콘텐츠: 클로드 자동 생성 + 몽골어 검수자

---
생성일: 2026-05-14
총 글 수: 39편 (한) · 39편 (몽)
