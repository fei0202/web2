# FRC 10390 團隊官方網站

## 概覽

這是一個為 FRC（FIRST 機器人競賽）10390「GO0GIRL」隊伍所打造的全端網頁應用程式。「GO0GIRL」是一支全女性組成的機器人團隊。  
本網站作為隊伍的官方平台，展示機器人作品、獲獎紀錄、隊伍資訊，並提供聯絡功能。網站前端採用現代化的 React 技術，後端使用 Express.js，整體設計為中英文雙語介面，方便本地與國際觀眾使用。

## 使用者偏好

- 偏好使用簡單、日常語言進行溝通。

## 系統架構

本應用程式採用 monorepo 架構，前後端程式碼明確分離：

### 前端架構

- **框架**：React（使用 TypeScript）
- **樣式系統**：Tailwind CSS（含自定義設計系統）
- **UI 元件庫**：Radix UI 搭配 shadcn/ui
- **狀態管理**：
  - React Context：語言切換
  - TanStack Query：伺服器資料管理
- **路由**：Wouter（用於客戶端路由）
- **建構工具**：Vite（開發與正式版打包）

### 後端架構

- **執行環境**：Node.js 搭配 Express.js
- **語言**：TypeScript（使用 ES modules）
- **資料庫**：PostgreSQL（搭配 Drizzle ORM）
- **Session 管理**：使用 connect-pg-simple 進行會話儲存
- **開發體驗**：整合 Vite 熱重載

## 核心元件

### 前端元件

1. **語言系統**：完整中英文雙語支援，透過 Context 控制
2. **UI 元件**：包括彈出視窗、表單、導覽列、響應式版面等
3. **頁面架構**：單頁應用（SPA），包含首頁、關於我們、機器人介紹、得獎紀錄、贊助單位與聯絡頁面
4. **響應式設計**：以行動裝置優先為設計原則

### 後端元件

1. **API 路由**：RESTful 結構，統一以 `/api` 開頭
2. **資料層**：使用 Drizzle ORM 與 PostgreSQL 儲存資料
3. **儲存介面**：支援記憶體與資料庫兩種實作
4. **靜態檔案服務**：整合靜態資源發佈，用於部署版本

### 共用元件

1. **資料結構定義**：集中管理資料庫 Schema，使用 Drizzle 搭配 Zod 驗證
2. **型別定義**：前後端共享 TypeScript 型別

## 資料流程

1. **使用者互動**：透過瀏覽器操作 React 元件
2. **API 請求**：前端使用 TanStack Query 發送請求至後端 Express API
3. **資料處理**：後端處理請求，並透過 Drizzle 操作 PostgreSQL 資料庫
4. **回應處理**：資料回傳至前端並更新介面狀態
5. **語言切換**：所有內容根據使用者語言偏好進行切換

## 外部相依套件

### 前端相依

- **UI 框架**：React（含 react, react-dom, wouter 等）
- **樣式處理**：Tailwind CSS，PostCSS
- **元件庫**：Radix UI + shadcn/ui
- **狀態管理**：TanStack Query + React Context
- **表單處理**：React Hook Form + Zod
- **實用工具**：clsx、date-fns、lucide-react（圖示）

### 後端相依

- **伺服器框架**：Express.js（含 JSON 解析與日誌中介軟體）
- **資料庫驅動**：PostgreSQL + Neon serverless driver
- **ORM 工具**：Drizzle ORM + Drizzle Kit（資料庫遷移）
- **Session 管理**：express-session + connect-pg-simple
- **開發工具**：tsx（執行 TypeScript）、esbuild（正式版打包）

### 開發環境相依

- **建構工具**：前端 Vite，後端 esbuild
- **TypeScript**：全堆疊皆使用 TypeScript
- **開發體驗**：熱重載、錯誤提示、Replit 整合

## 部署策略

### 開發環境

- **前端**：Vite dev server，支援熱重載（HMR）
- **後端**：使用 tsx 搭配自動重啟（類似 nodemon）
- **資料庫**：透過環境變數設定 PostgreSQL 連線
- **整合**：Vite proxy 設定支援 API 對接

### 正式部署

- **前端**：Vite 將靜態資源建置至 `dist/public`
- **後端**：使用 esbuild 打包為 `dist/index.js`
- **資料庫**：透過 `db:push` 執行 Drizzle 資料遷移
- **部署方式**：單一 Node.js 程序處理靜態資源與 API 請求

### 環境變數設定

- `DATABASE_URL`：PostgreSQL 連線字串（必填）
- `NODE_ENV`：環境辨識（開發或正式）
- `ADMIN_PASSWORD`：後台登入密碼（預設為 `FRC10390admin`）
- Session 設定：透過資料庫管理使用者會話資訊

## 最新更新紀錄

### 2025-07-18 - 資料庫整合與安全性強化

- **資料庫整合**：新增 PostgreSQL 與 Drizzle ORM
- **資料保存**：聯絡表單提交資料永久儲存在資料庫中
- **後台安全性**：後台 `/admin` 增加密碼保護
- **使用者驗證**：新增簡易 token 驗證系統
- **預設密碼**：`FRC10390admin`（可透過 `ADMIN_PASSWORD` 環境變數變更）

### 視覺與使用體驗改進

- **語言切換按鈕**：更清楚的顯示樣式（深色背景 + 邊框）
- **首頁背景**：從漸層改為照片，並加入 50% 透明遮罩
- **聯絡表單**：新增即時送出效果與提示通知（toast）