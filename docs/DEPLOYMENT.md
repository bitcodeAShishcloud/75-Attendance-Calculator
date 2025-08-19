# Deployment Guide

This guide covers various ways to deploy the 75% Attendance Calculator.

## Prerequisites

- No build process required
- Static files only (HTML, CSS, JS)
- Works with any web server

## Deployment Options

### 1. GitHub Pages (Free)

**Steps:**
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at `https://username.github.io/repository-name`

**Custom Domain (Optional):**
1. Add a `CNAME` file with your domain name
2. Configure DNS settings with your domain provider

### 2. Netlify (Free)

**Option A: Git Integration**
1. Connect your GitHub repository to Netlify
2. Build settings: Leave empty (no build required)
3. Publish directory: `/` (root)
4. Deploy automatically on every push

**Option B: Drag and Drop**
1. Create a zip file of your project
2. Drag and drop to Netlify dashboard
3. Get instant deployment

### 3. Vercel (Free)

1. Import your GitHub repository
2. No build configuration needed
3. Automatic deployments on push
4. Custom domain support

### 4. Firebase Hosting (Free tier available)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

### 5. Surge.sh (Free)

```bash
# Install Surge
npm install -g surge

# Deploy from project directory
surge
```

### 6. Traditional Web Hosting

Upload files via FTP/SFTP to any web hosting provider:
- Upload all files to public_html or www directory
- Ensure index.html is in the root
- Set proper file permissions if needed

## Environment Configuration

### Custom Domain Setup

1. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: your-deployment-url
   
   Type: A
   Name: @
   Value: your-provider-ip
   ```

2. **HTTPS Setup:**
   - Most modern hosting providers offer free SSL
   - Enable HTTPS redirect in hosting settings

### Performance Optimization

1. **Enable Gzip Compression:**
   ```apache
   # .htaccess for Apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/plain
       AddOutputFilterByType DEFLATE text/html
       AddOutputFilterByType DEFLATE text/css
       AddOutputFilterByType DEFLATE application/javascript
   </IfModule>
   ```

2. **Set Cache Headers:**
   ```apache
   # Cache static assets
   <IfModule mod_expires.c>
       ExpiresActive on
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType text/html "access plus 1 hour"
   </IfModule>
   ```

## Security Considerations

1. **Content Security Policy:**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; style-src 'self' 'unsafe-inline';">
   ```

2. **Security Headers:**
   ```
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   X-XSS-Protection: 1; mode=block
   ```

## Monitoring and Analytics

### Google Analytics Setup
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Simple Analytics Alternatives
- Plausible Analytics
- Fathom Analytics
- Simple Analytics

## Troubleshooting

### Common Issues

1. **404 Errors:**
   - Ensure index.html is in the root directory
   - Check file permissions (755 for directories, 644 for files)

2. **CSS/JS Not Loading:**
   - Verify file paths are correct
   - Check for case sensitivity on Linux servers

3. **Mobile Issues:**
   - Test on actual devices
   - Use browser developer tools mobile simulation

### Testing Deployment

1. **Local Testing:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```

2. **Cross-Browser Testing:**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

3. **Performance Testing:**
   - Google PageSpeed Insights
   - GTmetrix
   - WebPageTest

## Backup and Versioning

1. **Git Tags for Releases:**
   ```bash
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

2. **Automated Backups:**
   - Use hosting provider backup features
   - Set up automated Git backups

## Support

For deployment issues:
1. Check hosting provider documentation
2. Review browser console for errors
3. Test with a simple HTML file first
4. Open an issue in the project repository
