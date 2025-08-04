# API Setup Guide for House of Holmes Social Media Feed

## 🚀 Quick Start

Follow these steps to connect your real social media posts to your website:

---

## 📱 Instagram API Setup

### Step 1: Create Instagram App
1. **Go to:** https://developers.facebook.com/
2. **Click "Create App"**
3. **Select "Consumer"** as app type
4. **Enter app name:** "House of Holmes Social Feed"
5. **Click "Create App"**

### Step 2: Add Instagram Basic Display
1. **In your app dashboard, click "Add Product"**
2. **Find "Instagram Basic Display" and click "Set Up"**
3. **Follow the setup wizard**

### Step 3: Configure Instagram Basic Display
1. **Go to "Instagram Basic Display" → "Basic Display"**
2. **Add your Instagram account as a test user:**
   - Click "Add Instagram Test Users"
   - Enter your Instagram username: `hofh.houseofholmes`
   - Click "Add"

### Step 4: Generate Access Token
1. **Go to "Instagram Basic Display" → "Basic Display"**
2. **Click "Generate Token"**
3. **Authorize your Instagram account**
4. **Copy the generated token**

### Step 5: Add to Environment
Add this to your `.env` file:
```env
REACT_APP_INSTAGRAM_TOKEN=IGQWR...your_token_here
```

---

## 📘 Facebook API Setup

### Step 1: Create Facebook App
1. **Go to:** https://developers.facebook.com/
2. **Click "Create App"**
3. **Select "Business"** as app type
4. **Enter app name:** "House of Holmes Business"
5. **Click "Create App"**

### Step 2: Add Facebook Login
1. **In your app dashboard, click "Add Product"**
2. **Find "Facebook Login" and click "Set Up"**
3. **Select "Web" platform**

### Step 3: Configure Facebook Login
1. **Go to "Facebook Login" → "Settings"**
2. **Add your website URL:** `http://localhost:3000`
3. **Save changes**

### Step 4: Get Page Access Token
1. **Go to "Tools" → "Graph API Explorer"**
2. **Select your app from dropdown**
3. **Click "Generate Access Token"**
4. **Select permissions:** `pages_read_engagement`, `pages_show_list`
5. **Copy the generated token**

### Step 5: Add to Environment
Add this to your `.env` file:
```env
REACT_APP_FACEBOOK_TOKEN=EAA...your_token_here
```

---

## 💼 LinkedIn API Setup

### Step 1: Create LinkedIn App
1. **Go to:** https://www.linkedin.com/developers/
2. **Click "Create App"**
3. **Enter app name:** "House of Holmes Social"
4. **Enter LinkedIn Page URL:** Your company LinkedIn page
5. **Click "Create App"**

### Step 2: Request API Access
1. **In your app dashboard, go to "Products"**
2. **Find "Marketing Developer Platform"**
3. **Click "Request Access"**
4. **Fill out the form with your business details**
5. **Submit for approval** (may take 1-2 days)

### Step 3: Configure OAuth Settings
1. **Go to "Auth" tab**
2. **Add redirect URLs:** `http://localhost:3000`
3. **Save changes**

### Step 4: Generate Access Token
1. **Go to "Auth" tab**
2. **Click "Generate Access Token"**
3. **Select scopes:** `r_organization_social`, `w_organization_social`
4. **Copy the generated token**

### Step 5: Add to Environment
Add this to your `.env` file:
```env
REACT_APP_LINKEDIN_TOKEN=AQX...your_token_here
```

---

## 🔧 Environment Setup

### Step 1: Update .env File
Add all three tokens to your `.env` file:

```env
# House of Holmes Odoo Configuration
REACT_APP_ODOO_URL=https://house-of-holmes.odoo.com
REACT_APP_ODOO_DB=house-of-holmes
REACT_APP_ODOO_USERNAME=it@houseofholmes.com
REACT_APP_ODOO_PASSWORD=a4fCNrx!6CiuKjH7

# Formspree Backup
REACT_APP_FORMSPREE_ID=xrgjabqr
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key_here
REACT_APP_GOOGLE_CALENDAR_ID=primary

# Social Media API Tokens
REACT_APP_INSTAGRAM_TOKEN=IGQWR...your_instagram_token_here
REACT_APP_FACEBOOK_TOKEN=EAA...your_facebook_token_here
REACT_APP_LINKEDIN_TOKEN=AQX...your_linkedin_token_here
```

### Step 2: Restart Your App
```bash
npm start
```

---

## 🧪 Testing Your Setup

### Step 1: Check Console
1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Look for messages like:**
   - ✅ "Instagram posts loaded: 5 posts"
   - ✅ "Facebook posts loaded: 3 posts"
   - ✅ "LinkedIn posts loaded: 2 posts"

### Step 2: Test Each Platform
1. **Post on Instagram** → Check if it appears on website
2. **Post on Facebook** → Check if it appears on website
3. **Post on LinkedIn** → Check if it appears on website

### Step 3: Filter Test
1. **Click "Instagram" filter** → Should show only Instagram posts
2. **Click "Facebook" filter** → Should show only Facebook posts
3. **Click "LinkedIn" filter** → Should show only LinkedIn posts
4. **Click "All Platforms"** → Should show all posts

---

## 🚨 Troubleshooting

### Instagram Issues:
- **"Token not configured"** → Check if token is in .env file
- **"API error: 400"** → Token might be expired, regenerate
- **"No posts found"** → Check if Instagram account is public

### Facebook Issues:
- **"Token not configured"** → Check if token is in .env file
- **"API error: 403"** → Check app permissions
- **"No posts found"** → Check if Facebook page is public

### LinkedIn Issues:
- **"Token not configured"** → Check if token is in .env file
- **"API error: 401"** → Token might be expired, regenerate
- **"No posts found"** → Check if LinkedIn company page is public

### General Issues:
- **Posts not loading** → Check browser console for errors
- **API rate limits** → Wait and try again later
- **CORS errors** → Check if tokens are valid

---

## 📊 Expected Results

### After Setup:
- **Real posts** from your social accounts appear on website
- **Automatic updates** when you post on social media
- **Professional appearance** matching your brand
- **Engagement metrics** (likes, comments)
- **Direct links** to original posts

### Timeline:
- **Instagram posts:** Update within 5-15 minutes
- **Facebook posts:** Update within 10-20 minutes
- **LinkedIn posts:** Update within 15-30 minutes

---

## 🎯 Next Steps

1. **Set up all three APIs** following the steps above
2. **Test with real posts** on each platform
3. **Customize the feed design** if needed
4. **Add more platforms** (Twitter, TikTok, etc.)
5. **Monitor performance** and engagement

Your social media feed will be live and automatically syncing your posts! 🚀 