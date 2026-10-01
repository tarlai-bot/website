# Quick Deployment Reference - Al-amer Mall

## 🚀 Fast Deployment Steps

### 1. Pre-Build Configuration

```powershell
# Edit .env.production file
notepad .env.production

# Required values:
# VITE_API_BASE_URL=https://api.alamermall.com/api
# VITE_GOOGLE_MAPS_API_KEY=your_actual_key
```

### 2. Build Application

```powershell
npm install
npm run build
```

### 3. Deploy to IIS

```powershell
# Copy files to IIS directory
xcopy /E /I /Y dist C:\inetpub\wwwroot\alamermall\dist

# Ensure web.config is present
copy web.config C:\inetpub\wwwroot\alamermall\dist\web.config
```

### 4. Create IIS Website

```powershell
# Using IIS Manager:
# 1. Sites > Add Website
# 2. Name: AlamerMall
# 3. Path: C:\inetpub\wwwroot\alamermall\dist
# 4. Binding: https, port 443, select SSL cert
```

### 5. Verify Security

```powershell
# Test HTTPS redirect
curl http://alamermall.com  # Should redirect to HTTPS

# Check security headers
curl -I https://alamermall.com

# Should see:
# - Strict-Transport-Security
# - X-Content-Type-Options
# - X-Frame-Options
# - Content-Security-Policy
```

---

## ✅ Security Checklist

- [ ] SSL certificate installed
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS
- [ ] Security headers present
- [ ] Directory browsing disabled
- [ ] .env not accessible (try https://site/.env - should 404)
- [ ] Forms submit correctly
- [ ] No console errors

---

## 🛠️ Quick Troubleshooting

| Issue             | Solution                                   |
| ----------------- | ------------------------------------------ |
| 404 on routes     | Install URL Rewrite Module                 |
| 500 error         | Check IIS logs, validate web.config XML    |
| No HTTPS redirect | Ensure URL Rewrite Module installed        |
| API calls fail    | Check VITE_API_BASE_URL in .env.production |
| Forms don't work  | Configure backend API endpoints            |

---

## 📁 Key Files

| File                                 | Location            | Purpose            |
| ------------------------------------ | ------------------- | ------------------ |
| `web.config`                         | Root of dist/       | IIS configuration  |
| `.env.production`                    | Root (not deployed) | Build-time config  |
| `IIS_DEPLOYMENT_GUIDE.md`            | Root                | Full documentation |
| `SECURITY_IMPLEMENTATION_SUMMARY.md` | Root                | Security report    |

---

## 🔒 Security Status

✅ All authentication removed  
✅ No localStorage token storage  
✅ HTTPS enforced  
✅ Security headers configured  
✅ Source maps disabled  
✅ Console logging removed in production  
✅ Request filtering enabled  
✅ Directory browsing disabled

**Status:** PRODUCTION READY

---

## 📞 Need Help?

1. Check `IIS_DEPLOYMENT_GUIDE.md` for detailed steps
2. Review IIS logs: `C:\inetpub\logs\LogFiles\`
3. Enable Failed Request Tracing
4. Check Windows Event Viewer
