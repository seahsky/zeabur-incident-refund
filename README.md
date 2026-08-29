# Zeabur 資安事件求償協助工具 / Zeabur Incident Compensation-Claim Helper

一個輕量、純前端的靜態網站，協助在 2026-08-27 Zeabur 環境變數外洩事件中受影響的用戶，快速產生可直接提交的支援工單或 Email 求償內文。支援繁體中文（預設）與英文。

A lightweight, pure front-end static site that helps Zeabur.com users affected by the 2026-08-27 environment-variable leak incident quickly generate ready-to-submit support-ticket or email compensation-claim text. Available in Traditional Chinese (default) and English.

**這是社群自製工具，與 Zeabur 官方無關，內容亦非法律意見。** / **This is an unofficial, community-made tool — not affiliated with Zeabur, and not legal advice.**

## 求償管道 / Claim channel

網站內建說明：本工具建議以 **Zeabur 官方支援工單**（https://zeabur.com/support）為主要求償管道 —— 這是 Zeabur 官方在事件通知信中明確指示的管道，也是處理帳務爭議的結構性路徑；Email 僅能作為個人備份存底，並非官方指定的正式申訴信箱。詳細依據與 Zeabur 服務條款摘要，請見網站上的「求償方法」區塊。

The site explains that the **official Zeabur support ticket portal** (https://zeabur.com/support) is the recommended primary claim channel — this is what Zeabur's own incident notification explicitly pointed affected users to, and it's the structural path for billing disputes. Email is offered only as an optional personal backup, not an officially designated claims channel. See the "Claim Channel" section on the site for the reasoning and a summary of the relevant Terms of Service caveats.

## 開發 / Development

```bash
npm install
npm run dev       # http://localhost:4321/ (zh-TW) and /en/ (English)
npm run build     # runs `astro check` then `astro build` -> dist/
npm run preview   # serve the static dist/ build locally
```

無任何後端、資料庫或第三方 API 呼叫 —— 所有表單資料只存在使用者瀏覽器記憶體中，重新整理頁面即清空，不會被上傳或儲存到任何地方。

No backend, database, or third-party API calls — all form data lives only in the browser's memory for the current page session and is cleared on reload; nothing is ever uploaded or persisted anywhere.

## 技術架構 / Architecture

- [Astro](https://astro.build) with `output: 'static'`, no server adapter.
- Built-in Astro i18n routing: `zh-TW` (default, served at `/`) and `en` (served at `/en/`).
- No UI framework (no React/Vue/Svelte) — plain `.astro` components and a small amount of vanilla TypeScript (`src/scripts/`) wired via `<script src>`, no framework hydration needed.
- No Tailwind — plain CSS with custom properties (`src/styles/global.css`).
- `npm run build` wires `astro check` before `astro build`, so a missing/mismatched i18n dictionary key (see `src/i18n/dictionary.ts`) fails the build instead of shipping untranslated text.

```
src/
├── i18n/            # Dictionary/TemplateDictionary types + zh-TW & en content
├── scripts/         # form-state, renderer (pure functions), repeatable-rows, clipboard, main (DOM wiring)
├── layouts/          BaseLayout.astro
├── components/        Header, LanguageSwitcher, Disclaimer, ChannelGuidance, ClaimForm
└── pages/            index.astro ("/"), en/index.astro ("/en/")
```

## 部署 / Deployment

輸出為純靜態檔案（`dist/`），可部署到任何靜態主機（GitHub Pages、Vercel、Netlify、Zeabur 靜態服務等）。若部署到子路徑，需在 `astro.config.mjs` 補上 `base` 設定。

Build output is fully static (`dist/`) and deployable to any static host (GitHub Pages, Vercel, Netlify, Zeabur's own static hosting, etc.). If deployed under a sub-path, set `base` in `astro.config.mjs`.
