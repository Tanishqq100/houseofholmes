# House of Holmes - Integration Setup Guide

## 🏠 Overview

This guide helps you configure all integrations for the House of Holmes website. The website includes multiple integrations that need to be set up for full functionality.

## 📊 Current Status

### ✅ Ready to Use
- **Odoo Integration** - CRM/ERP connection
- **Formspree** - Contact form email notifications

### ⏳ Needs Configuration
- **Google Calendar** - Event display
- **Social Media APIs** - Instagram, Facebook, LinkedIn feeds
- **Microsoft Outlook** - Email/contact/calendar sync with Odoo

## 🚀 Quick Start

### 1. Test Current Integrations
```bash
# Start the development server
npm start

# Test integrations
node test-integrations.js
```

### 2. Configure Missing Integrations
```bash
# Google Calendar setup
node setup-google-calendar.js

# Social Media APIs setup
node setup-social-media.js

# Microsoft Outlook setup
node setup-microsoft-outlook.js
```

## 🔧 Detailed Setup Instructions

### 1. Odoo Integration ✅
**Status**: Already configured and working

**Configuration**:
- URL: `https://house-of-holmes.odoo.com`
- Database: `house-of-holmes`
- Username: `it@houseofholmes.com`
- Password: Configured in `.env`

**Features**:
- Lead creation from contact form
- Customer data synchronization
- Product/service management

### 2. Formspree (Contact Form) ✅
**Status**: Already configured and working

**Configuration**:
- Form ID: `xrgjabqr`
- Email notifications to: `it@houseofholmes.com`

**Features**:
- Contact form submission
- Email notifications
- Spam protection

### 3. Google Calendar ⏳
**Status**: Needs API key configuration

**Setup Steps**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "House of Holmes Calendar"
3. Enable Google Calendar API
4. Create API credentials
5. Get your Calendar ID
6. Update `.env` file with credentials

**Features**:
- Display upcoming events
- Interactive calendar view
- Event details and registration

### 4. Social Media APIs ⏳
**Status**: Needs API tokens

#### Instagram Basic Display API
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app: "House of Holmes Instagram"
3. Add Instagram Basic Display product
4. Generate access token
5. Update `.env`: `REACT_APP_INSTAGRAM_TOKEN=your_token`

#### Facebook Graph API
1. Use the same Facebook app
2. Add Facebook Login product
3. Generate page access token
4. Update `.env`: `REACT_APP_FACEBOOK_TOKEN=your_token`

#### LinkedIn Marketing API
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app: "House of Holmes"
3. Request Marketing Developer Platform access
4. Generate access token
5. Update `.env`: `REACT_APP_LINKEDIN_TOKEN=your_token`

**Features**:
- Social media feed display
- Latest posts and updates
- Cross-platform content aggregation

### 5. Microsoft Outlook ⏳
**Status**: Needs Azure credentials

**Setup Steps**:
1. Go to [Azure Portal](https://portal.azure.com/)
2. Register a new application
3. Configure API permissions for Microsoft Graph
4. Generate client secret
5. Update `.env` with credentials

**Features**:
- Email synchronization with Odoo
- Contact synchronization with Odoo CRM
- Calendar event synchronization
- Full sync option

## 📁 Configuration Files

### `.env` File Structure
```bash
# Odoo Integration
REACT_APP_ODOO_URL=https://house-of-holmes.odoo.com
REACT_APP_ODOO_DB=house-of-holmes
REACT_APP_ODOO_USERNAME=it@houseofholmes.com
REACT_APP_ODOO_PASSWORD=your_password

# Formspree
REACT_APP_FORMSPREE_ID=xrgjabqr

# Google Calendar
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key
REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id

# Social Media APIs
REACT_APP_INSTAGRAM_TOKEN=your_instagram_token
REACT_APP_FACEBOOK_TOKEN=your_facebook_token
REACT_APP_LINKEDIN_TOKEN=your_linkedin_token

# Microsoft Outlook
REACT_APP_MICROSOFT_CLIENT_ID=your_client_id
REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id
REACT_APP_MICROSOFT_CLIENT_SECRET=your_client_secret
REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/callback
```

## 🧪 Testing

### Test All Integrations
```bash
node test-integrations.js
```

### Test Individual Components
1. **Contact Form**: Submit a test message
2. **Odoo Integration**: Check lead creation
3. **Calendar**: Verify event display
4. **Social Media**: Check feed loading
5. **Outlook**: Test connection and sync

## 🚀 Deployment

### Pre-Deployment Checklist
- [ ] All integrations configured
- [ ] API keys and tokens set
- [ ] Environment variables updated
- [ ] All tests passing
- [ ] Contact form working
- [ ] Social media feed displaying
- [ ] Calendar events loading
- [ ] Outlook integration functional

### Deployment Options
1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Automatic deployments
   - Environment variables setup

2. **Netlify**
   - Drag and drop deployment
   - Form handling included
   - Environment variables setup

3. **GitHub Pages**
   - Free hosting
   - Built-in with GitHub
   - Manual deployment process

## 🔗 Useful Links

### Documentation
- [Google Calendar API](https://developers.google.com/calendar)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Instagram Basic Display](https://developers.facebook.com/docs/instagram-basic-display-api)
- [LinkedIn Marketing API](https://developer.linkedin.com/docs/marketing-api)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/)

### Development Tools
- [Google Cloud Console](https://console.cloud.google.com/)
- [Facebook Developers](https://developers.facebook.com/)
- [LinkedIn Developers](https://www.linkedin.com/developers/)
- [Azure Portal](https://portal.azure.com/)
- [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)

## 🆘 Troubleshooting

### Common Issues

1. **Odoo Connection Failed**
   - Verify credentials in `.env`
   - Check Odoo instance accessibility
   - Ensure API access is enabled

2. **Contact Form Not Working**
   - Verify Formspree ID
   - Check email notifications
   - Test spam filters

3. **Calendar Not Loading**
   - Verify Google Calendar API key
   - Check calendar ID
   - Ensure calendar is public or shared

4. **Social Media Feed Empty**
   - Verify API tokens
   - Check rate limits
   - Ensure accounts are public

5. **Outlook Integration Issues**
   - Verify Azure credentials
   - Check API permissions
   - Ensure admin consent granted

### Support
For technical support or questions about integrations, contact:
- Email: `it@houseofholmes.com`
- Project: House of Holmes Website

## 📈 Next Steps

1. **Complete Integration Setup**
   - Configure Google Calendar
   - Set up social media APIs
   - Configure Microsoft Outlook

2. **Testing & Validation**
   - Test all integrations
   - Verify functionality
   - Check error handling

3. **Deployment**
   - Choose hosting platform
   - Set up environment variables
   - Deploy to production

4. **Monitoring & Maintenance**
   - Monitor API usage
   - Update tokens as needed
   - Maintain integrations

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Ready for Production 