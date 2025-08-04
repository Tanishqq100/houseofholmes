# Microsoft App Registration Setup Guide

## 🚀 Step-by-Step Setup for House of Holmes

### **Step 1: Access Azure Portal**

1. **Go to:** https://portal.azure.com/
2. **Sign in** with your Microsoft account (it@houseofholmes.com)
3. **You'll see the Azure dashboard**

### **Step 2: Create App Registration**

1. **In the search bar** at the top, type "App registrations"
2. **Click "App registrations"** in the results
3. **Click "New registration"** button

### **Step 3: Configure App Details**

**Fill in the registration form:**

```
Name: House of Holmes Outlook Integration
Supported account types: Single tenant
Redirect URI: 
  - Type: Web
  - URI: http://localhost:3000/auth
```

**Click "Register"**

### **Step 4: Get Your Credentials**

**After registration, you'll see your app overview:**

1. **Copy the Application (client) ID** - This is your `REACT_APP_MICROSOFT_CLIENT_ID`
2. **Copy the Directory (tenant) ID** - This is your `REACT_APP_MICROSOFT_TENANT_ID`

### **Step 5: Create Client Secret**

1. **In your app, go to "Certificates & secrets"**
2. **Click "New client secret"**
3. **Add description:** "House of Holmes Integration"
4. **Select expiration:** 24 months (recommended)
5. **Click "Add"**
6. **Copy the secret value** (you won't see it again!)

### **Step 6: Configure API Permissions**

1. **Go to "API permissions"**
2. **Click "Add a permission"**
3. **Select "Microsoft Graph"**
4. **Choose "Delegated permissions"**
5. **Add these permissions:**
   - `Mail.ReadWrite` - For email sync
   - `Contacts.ReadWrite` - For contact sync
   - `Calendars.ReadWrite` - For calendar sync
   - `User.Read` - For basic access
6. **Click "Add permissions"**
7. **Click "Grant admin consent"** (if you're an admin)

### **Step 7: Update Your Environment**

**Edit your `.env` file:**

```env
# Microsoft Outlook Integration
REACT_APP_MICROSOFT_CLIENT_ID=your_client_id_from_step_4
REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id_from_step_4
REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth
```

### **Step 8: Test Your Setup**

1. **Restart your website:** `npm start`
2. **Go to:** `http://10.0.0.118:3000`
3. **Scroll to Outlook Integration section**
4. **Click "Test Outlook Connection"**
5. **You should see:** "✅ Connected" with data counts

## 📋 Credentials Summary

**You'll need these values:**

```
Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Directory (tenant) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Client Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 Troubleshooting

### **Common Issues:**

#### **"Connection Failed" Error:**
- **Check credentials** in .env file
- **Verify API permissions** are granted
- **Ensure admin consent** is given
- **Check redirect URI** matches exactly

#### **"Permission Denied" Error:**
- **Grant admin consent** for all permissions
- **Check if you're an admin** of the tenant
- **Verify app registration** is complete

#### **"Invalid Client" Error:**
- **Check client ID** is copied correctly
- **Verify tenant ID** is correct
- **Ensure app is registered** in correct tenant

## 🎯 Next Steps After Setup

### **Test Sync Operations:**

1. **📧 Sync Emails** - Test email sync
2. **👥 Sync Contacts** - Test contact sync
3. **📅 Sync Events** - Test calendar sync
4. **🚀 Full Sync** - Test complete sync

### **Verify Data in Odoo:**

1. **Check CRM** for new leads from emails
2. **Check Contacts** for synced customers
3. **Check Calendar** for synced events
4. **Review sync results** on your website

## 📞 Support

**If you need help:**
- **Check Azure portal** for app status
- **Review API permissions** are correct
- **Test with Microsoft Graph Explorer**
- **Contact Microsoft support** if needed

Your Microsoft app registration will enable seamless Outlook to Odoo sync! 🚀 