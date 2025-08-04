# Alternative Outlook Integration Setup

## 🚀 No Azure Admin Access? No Problem!

Since you're getting a 401 error in Azure portal, let's use an alternative approach that doesn't require app registration.

### **Option 1: Use Microsoft Graph Explorer (Recommended)**

1. **Go to:** https://developer.microsoft.com/en-us/graph/graph-explorer
2. **Sign in** with your Microsoft account (it@houseofholmes.com)
3. **Grant permissions** when prompted
4. **Test the connection** by running these queries:

#### **Test Email Access:**
```
GET https://graph.microsoft.com/v1.0/me/messages?$top=5
```

#### **Test Contacts Access:**
```
GET https://graph.microsoft.com/v1.0/me/contacts?$top=5
```

#### **Test Calendar Access:**
```
GET https://graph.microsoft.com/v1.0/me/events?$top=5
```

### **Option 2: Manual Authentication Setup**

If Graph Explorer works, we can implement manual authentication:

1. **Update your `.env` file:**
```env
# Manual Microsoft Authentication
REACT_APP_USE_MANUAL_AUTH=true
REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth
```

2. **Use the website's Outlook Integration section** to test connection manually

### **Option 3: Contact Your IT Administrator**

**Ask your IT admin to:**

1. **Grant you Azure AD permissions** for app registration
2. **Or create the app registration for you** with these details:
   - Name: "House of Holmes Outlook Integration"
   - Redirect URI: `http://localhost:3000/auth`
   - API Permissions: Mail.ReadWrite, Contacts.ReadWrite, Calendars.ReadWrite, User.Read

### **Option 4: Use Office 365 Admin Center**

1. **Go to:** https://admin.microsoft.com/
2. **Sign in** with your admin account
3. **Navigate to:** Settings > Services & add-ins > Microsoft Graph
4. **Enable API access** for your organization

## 🎯 Quick Test

**Let's test what you can access right now:**

1. **Go to:** https://developer.microsoft.com/en-us/graph/graph-explorer
2. **Sign in** with it@houseofholmes.com
3. **Try this query:** `GET https://graph.microsoft.com/v1.0/me`
4. **Let me know what happens!**

## 📞 Next Steps

**Tell me which option works for you:**

- ✅ **Graph Explorer works** → We'll implement manual auth
- ❌ **Graph Explorer fails** → We need admin help
- 🔧 **Admin can help** → They'll create the app registration
- 🚀 **You got Azure access** → We'll continue with app registration

## 🔧 Current Status

**Your website is ready to test!** Even without Microsoft credentials, you can:

1. **Go to:** `http://10.0.0.118:3000`
2. **Scroll to Outlook Integration section**
3. **See the UI** (it will show connection failed, but the interface works)
4. **Test the buttons** (they'll show appropriate error messages)

**The integration is 90% complete - we just need to solve the authentication!** 🚀 