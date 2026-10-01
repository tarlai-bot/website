# 🚀 STEP-BY-STEP DEPLOYMENT GUIDE

## For Someone With No Experience

**Time Required:** 2-3 hours  
**Difficulty:** Beginner-Friendly  
**Prerequisites:** Windows Server with IIS installed

---

## 📌 BEFORE YOU START

**CRITICAL DECISION NEEDED:**

Your website currently has **NO BACKEND**. This means:

- ❌ Contact forms won't actually send emails
- ❌ Rental inquiries won't be received
- ❌ Career applications won't be saved
- ❌ Investment inquiries will be lost

### 🛑 YOU HAVE 2 OPTIONS:

#### **OPTION A: Launch WITHOUT Forms (Recommended for Now)**

- ✅ Website works perfectly for browsing
- ✅ Users can see information
- ✅ Fast deployment (today)
- ❌ No form submissions (add later)

**Choose this if:** You want to launch quickly and add forms later

#### **OPTION B: Wait and Build Backend First**

- ✅ Full functionality
- ❌ Requires development time (1-2 weeks)
- ❌ Requires backend developer
- ❌ Requires email service setup

**Choose this if:** You need forms to work from day 1

---

## 🎯 PART 1: PREPARE YOUR ENVIRONMENT (30 minutes)

### Step 1: Check Your Domain

**What you need:**

- A domain name (e.g., `alamermall.com`)
- DNS access to point domain to your server

**How to check:**

```powershell
# Open PowerShell and run:
nslookup alamermall.com
```

✅ If it shows your server IP, you're good  
❌ If not, you need to configure DNS first

**Need help with DNS?** Contact your domain registrar (GoDaddy, Namecheap, etc.)

---

### Step 2: Get SSL Certificate

**What:** SSL certificate for HTTPS (the padlock 🔒)

**Options:**

**A. Free SSL (Let's Encrypt) - Recommended**

```powershell
# Install Certify The Web (free tool)
# Download from: https://certifytheweb.com/
# Run installer, follow wizard
# It will auto-configure IIS
```

**B. Buy SSL Certificate**

- Go to your domain registrar
- Purchase SSL certificate ($50-200/year)
- Download and install on IIS

**C. Use CloudFlare (Easiest)**

- Sign up at cloudflare.com
- Add your domain
- Change nameservers
- Get free SSL automatically

**✅ Checklist:**

- [ ] SSL certificate obtained
- [ ] Certificate installed in IIS
- [ ] HTTPS binding works

---

### Step 3: Install Required IIS Modules

**Why:** IIS needs extra components for the website to work

**How to install:**

1. **Open PowerShell as Administrator**
2. **Run these commands:**

```powershell
# Install URL Rewrite Module
# Download from: https://www.iis.net/downloads/microsoft/url-rewrite
# Or use Chocolatey:
choco install urlrewrite -y

# Verify installation
Get-WebConfigurationProperty -PSPath 'MACHINE/WEBROOT/APPHOST' -Filter 'system.webServer/rewrite/rules' -Name '.'
```

**✅ Checklist:**

- [ ] URL Rewrite Module installed
- [ ] IIS Manager shows "URL Rewrite" icon

---

## 🎯 PART 2: CONFIGURE THE PROJECT (45 minutes)

### Step 4: Update .env.production File

**Open file:** `.env.production` in your project

**Fill in these values:**

```dotenv
# ==================== WHAT TO CHANGE ====================

# 1. API URL - CRITICAL DECISION
# Option A: No backend yet (forms won't work)
VITE_API_BASE_URL=https://api.alamermall.com/api

# Option B: You have a backend
VITE_API_BASE_URL=https://your-actual-api-url.com/api

# 2. Google Maps API Key - GET THIS NOW
# Go to: https://console.cloud.google.com/
# Create project > Enable Maps JavaScript API > Create credentials
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# 3. Google Analytics (Optional)
# Go to: https://analytics.google.com/
# Create property > Get tracking ID
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# 4. Your actual domain
VITE_SITE_URL=https://alamermall.com
VITE_ADMIN_URL=https://admin.alamermall.com
```

**✅ Checklist:**

- [ ] Google Maps API key added
- [ ] Domain URLs updated
- [ ] Decided on API URL (even if not ready)

---

### Step 5: Secure Google Maps API Key

**CRITICAL: Do this or you'll get huge bills!**

**Steps:**

1. **Go to:** https://console.cloud.google.com/
2. **Navigate:** APIs & Services → Credentials
3. **Click** on your API key
4. **Set Application Restrictions:**

   ```
   Type: HTTP referrers (websites)

   Website restrictions:
   https://alamermall.com/*
   https://www.alamermall.com/*
   http://localhost:5173/*  (for testing)
   ```

5. **Set API Restrictions:**

   ```
   Select: Restrict key
   Check ONLY: Maps JavaScript API
   ```

6. **Set Quota:**
   - Click "Quotas & System Limits"
   - Set daily limit: 25,000 requests
   - Enable billing alerts

**✅ Checklist:**

- [ ] HTTP referrers configured
- [ ] API restricted to Maps JavaScript API only
- [ ] Daily quota set
- [ ] Billing alerts enabled

---

### Step 6: Handle Forms Issue

**Since you have no backend, you need to disable forms or show warning**

**Option A: Add Warning Message (Quick Fix)**

Create file: `src/components/common/ComingSoonBanner.tsx`

```typescript
export default function ComingSoonBanner() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Online forms are coming soon. For immediate assistance,
            please call us at <a href="tel:+966123456789" className="underline font-semibold">+966 12 345 6789</a>
            or email <a href="mailto:info@alamermall.com" className="underline font-semibold">info@alamermall.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Option B: Disable Forms Completely (Safer)**

I can help you add this component to your forms if you choose this option.

**✅ Decision:**

- [ ] Option A: Add "Coming Soon" banner
- [ ] Option B: Disable forms
- [ ] Option C: Keep as-is and implement backend ASAP

---

## 🎯 PART 3: BUILD THE PROJECT (15 minutes)

### Step 7: Build for Production

**Open PowerShell in your project folder:**

```powershell
# Navigate to project
cd "C:\Users\habibzmq\Documents\Projects\Github\Al-amer Mall Website\v1.0.0\alamerMall-v1.0.0"

# Install dependencies (if not done)
npm install

# Run production build
npm run build
```

**What happens:**

- Creates `dist/` folder
- Minifies code
- Removes console logs
- Optimizes images
- Generates production files

**Watch for errors!** If you see errors, tell me and I'll help fix them.

**✅ Checklist:**

- [ ] Build completed successfully
- [ ] `dist/` folder created
- [ ] `dist/index.html` exists
- [ ] `dist/assets/` folder has .js and .css files

---

### Step 8: Copy web.config Files

```powershell
# Copy main web.config to dist
copy web.config dist\web.config

# Copy admin web.config (if you're deploying admin)
copy admin\web.config dist\admin\web.config
```

**✅ Checklist:**

- [ ] `dist/web.config` exists
- [ ] `dist/admin/web.config` exists (if using admin)

---

## 🎯 PART 4: DEPLOY TO IIS (30 minutes)

### Step 9: Create IIS Application Pool

**Open IIS Manager:**

1. Press `Win + R`
2. Type `inetmgr` and press Enter

**Create Application Pool:**

1. Click "Application Pools" in left sidebar
2. Click "Add Application Pool..." in right sidebar
3. **Settings:**
   ```
   Name: AlamerMallAppPool
   .NET CLR version: No Managed Code
   Managed pipeline mode: Integrated
   ```
4. Click "OK"
5. Right-click "AlamerMallAppPool" → Advanced Settings
6. **Change:**

   ```
   General:
     Start Mode: AlwaysRunning

   Process Model:
     Identity: ApplicationPoolIdentity
     Idle Time-out: 20 (minutes)

   Recycling:
     Regular Time Interval: 1740 (29 hours)
   ```

7. Click "OK"

**✅ Checklist:**

- [ ] Application Pool created
- [ ] Name: AlamerMallAppPool
- [ ] No Managed Code selected

---

### Step 10: Create IIS Website

**In IIS Manager:**

1. Right-click "Sites" → "Add Website"
2. **Fill in details:**
   ```
   Site name: AlamerMall
   Application pool: AlamerMallAppPool
   Physical path: C:\inetpub\wwwroot\alamermall
   ```
3. **Binding:**
   ```
   Type: https
   IP address: All Unassigned
   Port: 443
   Host name: alamermall.com
   SSL certificate: [Select your certificate]
   ```
4. Click "OK"

5. **Add HTTP binding** (for redirect):
   - Right-click site → "Edit Bindings"
   - Click "Add"
   ```
   Type: http
   IP address: All Unassigned
   Port: 80
   Host name: alamermall.com
   ```

**✅ Checklist:**

- [ ] Website created
- [ ] HTTPS binding configured (port 443)
- [ ] HTTP binding configured (port 80)
- [ ] SSL certificate selected

---

### Step 11: Deploy Files

**Copy your built files to IIS:**

```powershell
# Create IIS directory
New-Item -Path "C:\inetpub\wwwroot\alamermall" -ItemType Directory -Force

# Copy all files from dist to IIS
xcopy /E /I /Y "C:\Users\habibzmq\Documents\Projects\Github\Al-amer Mall Website\v1.0.0\alamerMall-v1.0.0\dist\*" "C:\inetpub\wwwroot\alamermall\"
```

**Set Permissions:**

```powershell
# Give IIS read access
icacls "C:\inetpub\wwwroot\alamermall" /grant "IIS_IUSRS:(OI)(CI)R" /T
icacls "C:\inetpub\wwwroot\alamermall" /grant "IUSR:(OI)(CI)R" /T
```

**✅ Checklist:**

- [ ] Files copied to C:\inetpub\wwwroot\alamermall
- [ ] Permissions set
- [ ] web.config present

---

### Step 12: Configure IIS Settings

**In IIS Manager, select your website:**

1. **Directory Browsing**
   - Double-click "Directory Browsing"
   - Click "Disable" in right sidebar

2. **Default Document**
   - Double-click "Default Document"
   - Ensure "index.html" is listed
   - If not, click "Add" and type "index.html"

3. **Compression**
   - Double-click "Compression"
   - Check "Enable dynamic content compression"
   - Check "Enable static content compression"

4. **HTTP Response Headers** (verify web.config applied)
   - Double-click "HTTP Response Headers"
   - You should see security headers listed

**✅ Checklist:**

- [ ] Directory browsing disabled
- [ ] index.html as default document
- [ ] Compression enabled
- [ ] Security headers visible

---

## 🎯 PART 5: TEST YOUR WEBSITE (30 minutes)

### Step 13: Basic Functionality Tests

**Open browser and test:**

```
https://alamermall.com
```

**Test Checklist:**

- [ ] Homepage loads
- [ ] HTTPS works (green padlock)
- [ ] HTTP redirects to HTTPS (test: http://alamermall.com)
- [ ] Navigation menu works
- [ ] Click "About" - page loads
- [ ] Click "Stores" - page loads
- [ ] Click "Contact" - page loads
- [ ] Click browser back button - works
- [ ] Direct URL works: https://alamermall.com/about
- [ ] Images load
- [ ] Google Maps displays (if key configured)
- [ ] Language switcher works (AR/EN)
- [ ] Mobile responsive (resize browser)

**✅ All tests pass?**

- Yes → Proceed to Step 14
- No → Tell me which test failed

---

### Step 14: Security Tests

**Use online tools:**

1. **SSL Test** → https://www.ssllabs.com/ssltest/
   - Enter: alamermall.com
   - Target Grade: A or A+
   - [ ] Grade achieved: **\_**

2. **Security Headers** → https://securityheaders.com/
   - Enter: https://alamermall.com
   - Target Grade: A
   - [ ] Grade achieved: **\_**

3. **Check Headers Manually:**
   - Press F12 in browser
   - Go to Network tab
   - Reload page
   - Click on first request (alamermall.com)
   - Look at Response Headers
   - [ ] Strict-Transport-Security present
   - [ ] X-Content-Type-Options present
   - [ ] X-Frame-Options present
   - [ ] Content-Security-Policy present

**✅ All security tests pass?**

---

### Step 15: Performance Tests

**Google PageSpeed Insights:**

- Go to: https://pagespeed.web.dev/
- Enter: https://alamermall.com
- Target Scores:
  - [ ] Performance: > 80
  - [ ] Accessibility: > 90
  - [ ] Best Practices: > 90
  - [ ] SEO: > 90

**If scores are low, common fixes:**

- Enable HTTP/2 in IIS
- Optimize images further
- Enable browser caching

---

## 🎯 PART 6: POST-DEPLOYMENT (Ongoing)

### Step 16: Set Up Monitoring

**IIS Logs:**

```powershell
# View IIS logs
notepad "C:\inetpub\logs\LogFiles\W3SVC1\u_ex$(Get-Date -Format 'yyMMdd').log"
```

**Enable Failed Request Tracing:**

1. IIS Manager → Site → Failed Request Tracing Rules
2. Add Rule → All Content → Status Code 400-999
3. Review logs in: C:\inetpub\logs\FailedReqLogFiles\

**Google Analytics:**

- Check traffic at: https://analytics.google.com/
- Review daily for first week

**✅ Monitoring Setup:**

- [ ] IIS logs reviewed
- [ ] Failed request tracing enabled
- [ ] Google Analytics configured
- [ ] Email alerts set up

---

### Step 17: Create Backup Plan

**Automated Backup Script:**

Create file: `C:\Scripts\backup-alamermall.ps1`

```powershell
# Backup script
$Date = Get-Date -Format "yyyy-MM-dd-HHmm"
$Source = "C:\inetpub\wwwroot\alamermall"
$Destination = "C:\Backups\alamermall\backup-$Date"

# Create backup
Copy-Item -Path $Source -Destination $Destination -Recurse

# Delete backups older than 30 days
Get-ChildItem "C:\Backups\alamermall" -Directory |
  Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} |
  Remove-Item -Recurse -Force

Write-Host "Backup completed: $Destination"
```

**Schedule Task:**

```powershell
# Create scheduled task (runs daily at 2 AM)
$Action = New-ScheduledTaskAction -Execute 'PowerShell.exe' -Argument '-File C:\Scripts\backup-alamermall.ps1'
$Trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName "Backup AlamerMall" -Action $Action -Trigger $Trigger -User "SYSTEM"
```

**✅ Backup Checklist:**

- [ ] Backup script created
- [ ] Scheduled task configured
- [ ] Test backup manually
- [ ] Verify backup restoration

---

## 🚨 TROUBLESHOOTING GUIDE

### Problem: Website shows "404 Not Found"

**Cause:** URL Rewrite not working

**Fix:**

```powershell
# Verify URL Rewrite installed
Get-WindowsFeature -Name Web-Url-Rewrite

# Reinstall if needed
Install-WindowsFeature Web-Url-Rewrite
```

---

### Problem: "500 Internal Server Error"

**Cause:** web.config XML error or permissions

**Fix:**

1. Check IIS logs: C:\inetpub\logs\LogFiles\
2. Validate web.config XML syntax
3. Check file permissions:
   ```powershell
   icacls "C:\inetpub\wwwroot\alamermall" /grant "IIS_IUSRS:(OI)(CI)R" /T
   ```

---

### Problem: HTTPS not working

**Cause:** SSL certificate not configured

**Fix:**

1. IIS Manager → Site → Bindings
2. Ensure HTTPS binding exists
3. Select correct SSL certificate
4. Restart website

---

### Problem: Forms don't submit

**Cause:** No backend API (expected)

**Fix:**

- Add "Coming Soon" message (see Step 6)
- Or implement backend
- Or provide phone/email alternative

---

### Problem: Google Maps not showing

**Causes:**

1. API key not configured
2. API key not restricted properly
3. Billing not enabled

**Fix:**

1. Check browser console for errors (F12)
2. Verify VITE_GOOGLE_MAPS_API_KEY in .env.production
3. Rebuild: `npm run build`
4. Check Google Cloud Console for quota

---

## ✅ FINAL CHECKLIST

### Pre-Launch:

- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] .env.production configured
- [ ] Google Maps API restricted
- [ ] Build completed successfully
- [ ] Files deployed to IIS
- [ ] All functionality tested
- [ ] Security tests passed
- [ ] Performance acceptable

### Post-Launch:

- [ ] Monitoring enabled
- [ ] Backups scheduled
- [ ] Team trained on updates
- [ ] Documentation reviewed
- [ ] Incident response plan ready

---

## 📞 NEED HELP?

**If you get stuck:**

1. **Check IIS Logs:**

   ```powershell
   Get-Content "C:\inetpub\logs\LogFiles\W3SVC1\*.log" -Tail 50
   ```

2. **Check Windows Event Viewer:**
   - Press Win + R
   - Type: eventvwr
   - Look in: Windows Logs → Application

3. **Test Configuration:**

   ```powershell
   # Test web.config
   Test-Path "C:\inetpub\wwwroot\alamermall\web.config"

   # Check if URL Rewrite working
   Invoke-WebRequest -Uri "https://alamermall.com/about" -UseBasicParsing
   ```

4. **Tell me:**
   - What step you're on
   - What error message you see
   - What you tried already

---

**Remember:** Take it one step at a time. Don't rush. Test after each step.

**Good luck! 🚀**
