# IIS Deployment Guide - Al-amer Mall Website

## 🎯 Overview

This guide provides step-by-step instructions for deploying the Al-amer Mall website to Internet Information Services (IIS) with comprehensive security measures.

---

## 📋 Prerequisites

### System Requirements

- **Windows Server** 2016 or later (or Windows 10/11 Pro for testing)
- **IIS 10.0** or later
- **URL Rewrite Module** for IIS
- **ARR (Application Request Routing)** - Optional, for API proxy
- **Valid SSL Certificate** (required for production)
- **Node.js 18+** (for building the application)

### IIS Features Required

Enable the following IIS features:

```powershell
# Run in PowerShell as Administrator
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServer
Enable-WindowsOptionalFeature -Online -FeatureName IIS-CommonHttpFeatures
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpErrors
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpRedirect
Enable-WindowsOptionalFeature -Online -FeatureName IIS-ApplicationDevelopment
Enable-WindowsOptionalFeature -Online -FeatureName IIS-Security
Enable-WindowsOptionalFeature -Online -FeatureName IIS-RequestFiltering
Enable-WindowsOptionalFeature -Online -FeatureName IIS-StaticContent
Enable-WindowsOptionalFeature -Online -FeatureName IIS-DefaultDocument
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpCompressionStatic
Enable-WindowsOptionalFeature -Online -FeatureName IIS-HttpCompressionDynamic
```

### Install URL Rewrite Module

1. Download from: https://www.iis.net/downloads/microsoft/url-rewrite
2. Or use Web Platform Installer
3. Verify installation in IIS Manager > Server > Modules

---

## 🔨 Build Process

### 1. Clone Repository

```powershell
git clone <repository-url>
cd alamerMall-v1.0.0
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Configure Production Environment

Create/edit `.env.production` file:

```env
VITE_API_BASE_URL=https://api.alamermall.com/api
VITE_API_TIMEOUT=30000
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key
VITE_ENABLE_AUTH=false
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_ENV=production
NODE_ENV=production
```

### 4. Build for Production

```powershell
npm run build
```

This creates the `dist/` folder with optimized production files.

### 5. Build Admin Panel (Optional)

```powershell
cd admin
npm install
npm run build
```

---

## 🌐 IIS Configuration

### 1. Create Website in IIS

#### Using IIS Manager (GUI):

1. Open **IIS Manager**
2. Right-click **Sites** > **Add Website**
3. Configure:
   - **Site name**: `AlamerMall`
   - **Physical path**: `C:\inetpub\wwwroot\alamermall\dist`
   - **Binding**:
     - Type: `https`
     - Port: `443`
     - Host name: `alamermall.com`
     - SSL Certificate: Select your certificate
4. Click **OK**

#### Using PowerShell:

```powershell
# Import IIS module
Import-Module WebAdministration

# Create application pool
New-WebAppPool -Name "AlamerMallAppPool"
Set-ItemProperty IIS:\AppPools\AlamerMallAppPool -Name "managedRuntimeVersion" -Value ""

# Create website
New-Website -Name "AlamerMall" `
            -Port 443 `
            -Protocol https `
            -PhysicalPath "C:\inetpub\wwwroot\alamermall\dist" `
            -ApplicationPool "AlamerMallAppPool" `
            -Ssl

# Bind SSL certificate
$cert = Get-ChildItem -Path Cert:\LocalMachine\My | Where-Object {$_.Subject -like "*alamermall.com*"}
New-WebBinding -Name "AlamerMall" -Protocol https -Port 443 -SslFlags 0
(Get-WebBinding -Name "AlamerMall" -Protocol https).AddSslCertificate($cert.Thumbprint, "My")
```

### 2. Deploy Files

```powershell
# Copy built files to IIS directory
xcopy /E /I /Y dist C:\inetpub\wwwroot\alamermall\dist

# Ensure web.config is present
copy web.config C:\inetpub\wwwroot\alamermall\dist\web.config
```

### 3. Configure Admin Panel (if separate)

```powershell
# Create subdirectory
New-Item -Path "C:\inetpub\wwwroot\alamermall\dist\admin" -ItemType Directory

# Copy admin files
xcopy /E /I /Y admin\dist C:\inetpub\wwwroot\alamermall\dist\admin

# Copy admin web.config
copy admin\web.config C:\inetpub\wwwroot\alamermall\dist\admin\web.config
```

---

## 🔒 Security Configuration

### 1. SSL/TLS Certificate

#### Option A: Let's Encrypt (Free)

```powershell
# Install win-acme
choco install win-acme

# Run certificate wizard
wacs.exe
```

#### Option B: Commercial Certificate

1. Purchase SSL certificate from trusted CA
2. Install certificate in IIS
3. Bind to your website

### 2. Force HTTPS

The `web.config` already includes HTTPS redirect. Verify:

```xml
<rule name="Force HTTPS" stopProcessing="true">
  <match url="(.*)" />
  <conditions>
    <add input="{HTTPS}" pattern="off" />
  </conditions>
  <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
</rule>
```

### 3. Configure Application Pool

#### Security Settings:

```powershell
# Set identity to ApplicationPoolIdentity (least privilege)
Set-ItemProperty IIS:\AppPools\AlamerMallAppPool -Name processModel -Value @{
    identityType="ApplicationPoolIdentity"
}

# Disable 32-bit applications
Set-ItemProperty IIS:\AppPools\AlamerMallAppPool -Name enable32BitAppOnWin64 -Value $false

# Set managed pipeline mode
Set-ItemProperty IIS:\AppPools\AlamerMallAppPool -Name managedPipelineMode -Value "Integrated"
```

### 4. Request Filtering

The `web.config` includes request filtering. Additional IIS-level configuration:

```powershell
# Set request limits
Set-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.webServer/security/requestFiltering/requestLimits" `
    -Name "maxAllowedContentLength" -Value 52428800

# Block specific extensions
Add-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.webServer/security/requestFiltering/fileExtensions" `
    -Name "." -Value @{fileExtension='.env';allowed='False'}
```

### 5. IP Security (Admin Panel)

Restrict admin access to specific IPs:

```powershell
# Allow only specific IP addresses to access /admin
Add-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Location "admin" `
    -Filter "system.webServer/security/ipSecurity" `
    -Name "." -Value @{ipAddress='192.168.1.100';allowed='True'}

# Deny all others
Set-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Location "admin" `
    -Filter "system.webServer/security/ipSecurity" `
    -Name "allowUnlisted" -Value "False"
```

### 6. Failed Request Tracing (Security Monitoring)

```powershell
# Enable failed request tracing
Set-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.webServer/tracing/traceFailedRequests" `
    -Name "enabled" -Value $true
```

### 7. Remove Server Headers

Edit `C:\Windows\System32\inetsrv\config\applicationHost.config`:

```xml
<httpProtocol>
  <customHeaders>
    <remove name="X-Powered-By" />
  </customHeaders>
</httpProtocol>
```

Or use IIS Manager:

1. Select server node
2. Open "HTTP Response Headers"
3. Remove "X-Powered-By"

---

## 🔍 Testing Deployment

### 1. Local Testing

```powershell
# Test build locally
npx serve dist -l 3000

# Open browser
start http://localhost:3000
```

### 2. IIS Testing Checklist

✅ **Basic Functionality:**

- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Images display properly
- [ ] Routing works (browser back/forward)
- [ ] Forms submit correctly

✅ **Security Headers:**

```powershell
# Test security headers
curl -I https://alamermall.com

# Should see:
# Strict-Transport-Security: max-age=31536000
# X-Content-Type-Options: nosniff
# X-Frame-Options: SAMEORIGIN
# Content-Security-Policy: ...
```

✅ **HTTPS Enforcement:**

- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate valid
- [ ] No mixed content warnings

✅ **Performance:**

- [ ] Gzip/Brotli compression enabled
- [ ] Static files cached properly
- [ ] Page load time < 3 seconds

---

## 🛠️ Troubleshooting

### Issue: 404 Error on Routes

**Cause:** URL Rewrite not working
**Solution:**

1. Ensure URL Rewrite Module is installed
2. Verify `web.config` is in the root of your site
3. Check IIS Manager > URL Rewrite rules

### Issue: 500 Internal Server Error

**Cause:** web.config syntax error
**Solution:**

1. Check IIS logs: `C:\inetpub\logs\LogFiles`
2. Validate web.config XML syntax
3. Check Failed Request Tracing

### Issue: Static Files Not Loading

**Cause:** MIME types not configured
**Solution:**

```powershell
# Add MIME types
Add-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.webServer/staticContent" `
    -Name "." -Value @{fileExtension='.webp';mimeType='image/webp'}
```

### Issue: API Calls Failing

**Cause:** CORS or API URL not configured
**Solution:**

1. Check `.env.production` has correct API_BASE_URL
2. Verify backend CORS configuration
3. Check browser console for errors

### Issue: Forms Not Submitting

**Cause:** Request size limits
**Solution:**

```powershell
# Increase request size limit
Set-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.webServer/security/requestFiltering/requestLimits" `
    -Name "maxAllowedContentLength" -Value 52428800
```

---

## 📊 Monitoring & Maintenance

### 1. Enable IIS Logging

```powershell
# Configure logging
Set-WebConfigurationProperty -PSPath "IIS:\Sites\AlamerMall" `
    -Filter "system.applicationHost/sites/site/logFile" `
    -Name "logFormat" -Value "W3C"
```

### 2. Monitor Logs

- **IIS Logs:** `C:\inetpub\logs\LogFiles\W3SVC1\`
- **Event Viewer:** Windows Logs > Application
- **Failed Request Tracing:** `C:\inetpub\logs\FailedReqLogFiles\`

### 3. Performance Monitoring

```powershell
# Add performance counters
Get-Counter "\Web Service(*)\*"
Get-Counter "\Process(w3wp)\*"
```

### 4. Security Auditing

- [ ] Run SSL Labs test: https://www.ssllabs.com/ssltest/
- [ ] Check security headers: https://securityheaders.com/
- [ ] Scan for vulnerabilities: OWASP ZAP
- [ ] Review IIS logs weekly
- [ ] Update SSL certificates before expiry

### 5. Backup Strategy

```powershell
# Backup IIS configuration
%windir%\system32\inetsrv\appcmd.exe add backup "AlamerMall_Backup_$(Get-Date -Format 'yyyyMMdd')"

# Backup website files
Compress-Archive -Path C:\inetpub\wwwroot\alamermall\dist `
                 -DestinationPath C:\Backups\alamermall_$(Get-Date -Format 'yyyyMMdd').zip
```

---

## 🔄 Updates & Redeployment

### Update Process:

```powershell
# 1. Build new version
npm run build

# 2. Stop IIS site
Stop-Website -Name "AlamerMall"

# 3. Backup current deployment
Compress-Archive -Path C:\inetpub\wwwroot\alamermall\dist `
                 -DestinationPath C:\Backups\alamermall_backup.zip -Force

# 4. Deploy new files
Remove-Item C:\inetpub\wwwroot\alamermall\dist\* -Recurse -Force
xcopy /E /I /Y dist C:\inetpub\wwwroot\alamermall\dist

# 5. Ensure web.config is present
copy web.config C:\inetpub\wwwroot\alamermall\dist\web.config

# 6. Restart site
Start-Website -Name "AlamerMall"

# 7. Clear browser cache or use cache busting
# Vite automatically adds hashes to filenames
```

---

## ✅ Final Security Checklist

Before going live, verify:

### Infrastructure Security:

- [ ] SSL certificate installed and valid
- [ ] HTTPS enforced (HTTP redirects)
- [ ] HSTS header enabled
- [ ] Strong TLS configuration (TLS 1.2+)
- [ ] Server headers removed
- [ ] Directory browsing disabled

### Application Security:

- [ ] All authentication code removed
- [ ] No console.log in production build
- [ ] Source maps disabled
- [ ] API endpoints secured with backend authentication
- [ ] CORS configured correctly
- [ ] Input validation on all forms
- [ ] Rate limiting configured

### IIS Security:

- [ ] Request filtering enabled
- [ ] File extension blocking active
- [ ] Request size limits set
- [ ] Failed request tracing enabled
- [ ] IP restrictions on admin panel (if applicable)
- [ ] Application pool using least privilege identity

### File Security:

- [ ] .env files not deployed
- [ ] .git directory not deployed
- [ ] node_modules not deployed
- [ ] Only dist/ folder deployed
- [ ] web.config properly configured

### API Security:

- [ ] Google Maps API key restricted to domain
- [ ] API endpoints use HTTPS
- [ ] Backend has authentication/authorization
- [ ] CSRF protection enabled
- [ ] SQL injection prevention

### Monitoring:

- [ ] IIS logging enabled
- [ ] Error tracking configured (Sentry/similar)
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] SSL certificate expiry alerts

---

## 📞 Support & Resources

- **IIS Documentation:** https://docs.microsoft.com/en-us/iis/
- **URL Rewrite:** https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/
- **Security Best Practices:** https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10/security-best-practices
- **SSL Labs:** https://www.ssllabs.com/
- **Security Headers:** https://securityheaders.com/

---

## 🎉 Deployment Complete!

Your Al-amer Mall website is now securely deployed on IIS with:
✅ HTTPS enforcement
✅ Security headers
✅ Request filtering
✅ SPA routing
✅ Optimized performance
✅ Production-ready configuration

**Next Steps:**

1. Monitor logs for 24-48 hours
2. Run security scans
3. Test all functionality
4. Set up automated backups
5. Configure uptime monitoring
