# 管理後台存取說明 / Admin Panel Access Guide

## 中文說明

### 管理後台登入
- 網址：`/admin`
- 預設密碼：`FRC10390admin`
- 功能：查看和管理聯絡表單訊息

### 安全性
- 管理後台受密碼保護
- 登入後的會話會儲存在瀏覽器中
- 可以隨時點擊「登出」按鈕退出

### 更改密碼
要更改管理員密碼，請設定環境變數：
```bash
export ADMIN_PASSWORD=您的新密碼
```

---

## English Guide

### Admin Panel Login
- URL: `/admin`
- Default Password: `FRC10390admin`
- Features: View and manage contact form messages

### Security
- Admin panel is password protected
- Session is stored in browser after login
- Can logout anytime by clicking "Logout" button

### Changing Password
To change the admin password, set environment variable:
```bash
export ADMIN_PASSWORD=YourNewPassword
```

---

## 重要提醒 / Important Notes

**請務必更改預設密碼！**
**Please change the default password!**

在正式環境中，建議：
1. 設定強密碼作為環境變數
2. 使用 HTTPS 連接
3. 定期更換密碼

For production use, recommend:
1. Set a strong password as environment variable
2. Use HTTPS connection
3. Change password regularly