# House of Holmes Website Deployment Guide

## 🚀 Quick Deployment Options

### **Option 1: Netlify (Recommended - Free)**

#### Step 1: Build Your Website
```bash
npm run build
```

#### Step 2: Deploy to Netlify
1. **Go to:** https://netlify.com/
2. **Sign up** with GitHub/GitLab
3. **Click "New site from Git"**
4. **Connect your repository**
5. **Deploy automatically**

#### Step 3: Get Public URL
- **Your site will be live** at: `https://your-site-name.netlify.app`
- **Share this URL** with your manager

### **Option 2: Vercel (Alternative - Free)**

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
vercel
```

#### Step 3: Get Public URL
- **Your site will be live** at: `https://your-project.vercel.app`
- **Share this URL** with your manager

### **Option 3: GitHub Pages (Free)**

#### Step 1: Build Website
```bash
npm run build
```

#### Step 2: Deploy to GitHub Pages
1. **Go to your GitHub repository**
2. **Settings → Pages**
3. **Select source:** Deploy from a branch
4. **Select branch:** main
5. **Select folder:** /docs

#### Step 3: Get Public URL
- **Your site will be live** at: `https://your-username.github.io/your-repo`
- **Share this URL** with your manager

## 📱 What Your Manager Will See

### **Website Features:**
- ✅ **Professional design** with black, white, grey theme
- ✅ **Social media feed** with Instagram, Facebook, LinkedIn posts
- ✅ **Odoo integration** for products and leads
- ✅ **Calendar events** display
- ✅ **Consultation form** with email integration
- ✅ **Multi-language support** (English, Spanish, French, etc.)
- ✅ **Responsive design** for all devices

### **Social Media Feed:**
- 📱 **Platform filters** (All, Instagram, Facebook, LinkedIn)
- 🎨 **Platform-specific styling** and colors
- 📊 **Engagement metrics** (likes, comments)
- 🔗 **Direct links** to original posts
- ⏰ **Real-time updates** when you post on social media

## 🔧 Environment Variables for Production

### **For Social Media APIs:**
```env
REACT_APP_INSTAGRAM_TOKEN=your_instagram_token
REACT_APP_FACEBOOK_TOKEN=your_facebook_token
REACT_APP_LINKEDIN_TOKEN=your_linkedin_token
```

### **For Odoo Integration:**
```env
REACT_APP_ODOO_URL=https://house-of-holmes.odoo.com
REACT_APP_ODOO_DB=house-of-holmes
REACT_APP_ODOO_USERNAME=it@houseofholmes.com
REACT_APP_ODOO_PASSWORD=your_password
```

### **For Email Integration:**
```env
REACT_APP_FORMSPREE_ID=your_formspree_id
```

## 🎯 Manager Access Instructions

### **Send This to Your Manager:**

```
Hi [Manager Name],

I've deployed our House of Holmes website with the new social media feed feature. You can access it at:

[YOUR_DEPLOYED_URL]

Key Features to Test:
1. Social Media Feed - Shows our latest Instagram, Facebook, and LinkedIn posts
2. Platform Filters - Click "Instagram", "Facebook", or "LinkedIn" to filter posts
3. Consultation Form - Test the booking form (it will send to our email)
4. Odoo Integration - Products and lead management
5. Calendar Events - Company events and schedules
6. Multi-language - Try different languages using the dropdown

The website automatically updates when we post on social media, so it's always fresh!

Let me know what you think and if you'd like any changes.

Best regards,
[Your Name]
```

## 🚨 Troubleshooting

### **If Website Doesn't Load:**
- Check if deployment was successful
- Verify the URL is correct
- Check browser console for errors

### **If Social Media Feed Doesn't Show:**
- Check if API tokens are configured
- Verify social media accounts are public
- Check browser console for API errors

### **If Forms Don't Work:**
- Check if environment variables are set
- Verify email integration is configured
- Test in different browsers

## 📊 Analytics and Monitoring

### **Track Website Performance:**
- **Google Analytics** - Track visitor behavior
- **Netlify Analytics** - Built-in analytics (if using Netlify)
- **Vercel Analytics** - Built-in analytics (if using Vercel)

### **Monitor Social Media Integration:**
- **Console logs** - Check for API errors
- **Network tab** - Monitor API requests
- **Real-time updates** - Verify posts appear on website

## 🎉 Success Checklist

- ✅ Website deployed and accessible
- ✅ Social media feed displaying posts
- ✅ Consultation form sending emails
- ✅ Odoo integration working
- ✅ Calendar events showing
- ✅ Multi-language support working
- ✅ Manager can access from anywhere
- ✅ Professional appearance maintained

Your manager will be impressed with the professional, automated social media integration! 🚀 