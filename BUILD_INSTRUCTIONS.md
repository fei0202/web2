# 建置和部署指令 / Build and Deploy Instructions

## 快速部署 / Quick Deploy

### 1. 使用 Replit 一鍵部署（最簡單）
1. 點擊右上角的「Deploy」按鈕
2. 選擇 "Replit Deployments"
3. 設定環境變數：
   - `ADMIN_PASSWORD`: 您的管理員密碼（建議更改預設值）
4. 點擊「Deploy」
5. 等待部署完成，您會獲得一個 `.replit.app` 網址

### 2. 手動建置部署
```bash
# 1. 建置專案
npm run build

# 2. 推送資料庫架構
npm run db:push

# 3. 啟動生產環境
npm start
```

## 環境變數設定 / Environment Variables

### 必須設定的變數：
```env
DATABASE_URL=postgresql://username:password@host:port/database
ADMIN_PASSWORD=your_secure_password_here
```

### 可選設定的變數：
```env
NODE_ENV=production
PORT=3000
```

## 自訂網域設定 / Custom Domain Setup

### 步驟 1: 購買網域
- 推薦：Namecheap, GoDaddy, Cloudflare

### 步驟 2: 設定 DNS
```
Type: CNAME
Name: www (或您想要的子網域)
Value: your-project.replit.app
```

### 步驟 3: 在 Replit 中設定自訂網域
1. 進入專案的 Deployments 設定
2. 點擊 "Custom Domain"
3. 輸入您的網域名稱
4. 等待 DNS 驗證完成

## 安全檢查清單 / Security Checklist

- [ ] 已更改預設管理員密碼
- [ ] 資料庫使用 HTTPS 連接
- [ ] 網站強制使用 HTTPS
- [ ] 管理後台需要密碼認證
- [ ] 所有表單輸入都經過驗證

## 功能測試清單 / Feature Testing Checklist

- [ ] 首頁載入正常
- [ ] 語言切換功能正常
- [ ] 所有「了解更多」按鈕可以開啟內容
- [ ] 聯絡表單可以正常提交
- [ ] 管理後台可以正常登入
- [ ] 管理後台可以查看聯絡訊息
- [ ] 響應式設計在手機上正常顯示

## 部署後檢查 / Post-Deployment Checks

### 1. 功能檢查
- 訪問您的網站主頁
- 測試語言切換
- 提交一個測試聯絡表單
- 登入管理後台查看訊息

### 2. 效能檢查
- 使用 Google PageSpeed Insights 檢查載入速度
- 檢查網站在手機上的顯示效果

### 3. 安全檢查
- 確認網站使用 HTTPS
- 嘗試不輸入密碼直接訪問 `/admin`（應該被阻擋）
- 確認聯絡表單不能提交無效資料

## 常見問題解決 / Troubleshooting

### 問題：網站無法載入
- 檢查環境變數是否設定正確
- 檢查資料庫連接是否正常
- 查看部署日誌尋找錯誤訊息

### 問題：管理後台無法登入
- 確認 `ADMIN_PASSWORD` 環境變數已設定
- 檢查瀏覽器控制台是否有錯誤訊息

### 問題：聯絡表單無法提交
- 檢查資料庫連接
- 確認資料庫表格已正確創建（運行 `npm run db:push`）

## 維護建議 / Maintenance Recommendations

### 定期任務
- 每月檢查一次管理後台的聯絡訊息
- 每季更新一次管理員密碼
- 定期備份資料庫

### 監控建議
- 設定網站可用性監控
- 監控資料庫使用量
- 定期檢查網站載入速度

---

您的網站現在已經準備好部署！選擇上述任一方法即可讓全世界的人訪問您的 FRC 團隊網站。