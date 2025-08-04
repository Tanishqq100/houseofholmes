# Outlook to Odoo Sync Guide

## 🚀 Quick Start - Sync Your Data

### **Step 1: Set Up Microsoft Credentials**

#### **Create Microsoft App:**
1. **Go to:** https://portal.azure.com/
2. **Azure Active Directory → App registrations**
3. **Click "New registration"**
4. **Enter details:**
   - **Name:** "House of Holmes Outlook Sync"
   - **Supported account types:** Single tenant
   - **Redirect URI:** `http://localhost:3000/auth`

#### **Configure Permissions:**
1. **In your app → API permissions**
2. **Add Microsoft Graph permissions:**
   - `Mail.ReadWrite` - For email sync
   - `Contacts.ReadWrite` - For contact sync
   - `Calendars.ReadWrite` - For calendar sync
   - `User.Read` - For basic access

#### **Get Credentials:**
1. **Copy Application (client) ID**
2. **Create a client secret**
3. **Note down Tenant ID**

### **Step 2: Update Your Environment**

#### **Edit your .env file:**
```env
# Microsoft Outlook Integration
REACT_APP_MICROSOFT_CLIENT_ID=your_actual_client_id_here
REACT_APP_MICROSOFT_TENANT_ID=your_actual_tenant_id_here
REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth
```

### **Step 3: Test and Sync**

#### **Using Your Website:**
1. **Go to:** `http://10.0.0.118:3000`
2. **Scroll to "Outlook Integration" section**
3. **Click "Test Outlook Connection"**
4. **If successful, try sync operations**

## 📧 Email Sync Process

### **What Gets Synced:**

#### **Incoming Emails → Odoo Leads:**
- **Email subject** → Lead name
- **Email sender** → Lead email
- **Email body** → Lead description
- **Received date** → Lead creation date
- **Attachments** → Saved to Odoo documents

#### **Example Sync:**
```
Outlook Email:
Subject: "New Fashion Line Inquiry"
From: john@fashionbrand.com
Body: "Hi, we're interested in your manufacturing services..."

↓ Syncs to Odoo as:

Lead:
Name: "New Fashion Line Inquiry"
Email: john@fashionbrand.com
Description: "Hi, we're interested in your manufacturing services..."
Source: Email
```

### **How to Trigger Email Sync:**

#### **Manual Sync:**
1. **Click "📧 Sync Emails"** on your website
2. **System fetches** last 50 emails from Outlook
3. **Creates leads** in Odoo CRM
4. **Shows sync results** with count

#### **Automatic Sync:**
- **Set up webhooks** for real-time sync
- **Configure email rules** for automatic processing
- **Set sync frequency** (every 15 minutes, hourly, etc.)

## 👥 Contact Sync Process

### **What Gets Synced:**

#### **Outlook Contacts → Odoo Customers:**
- **Display name** → Customer name
- **Email addresses** → Customer email
- **Phone numbers** → Customer phone
- **Company name** → Customer company
- **Job title** → Customer job position
- **Notes** → Customer notes

#### **Example Sync:**
```
Outlook Contact:
Name: "Sarah Johnson"
Email: sarah@designstudio.com
Company: "Design Studio Inc."
Phone: "+1-555-0123"
Job Title: "Creative Director"

↓ Syncs to Odoo as:

Customer:
Name: "Sarah Johnson"
Email: sarah@designstudio.com
Company: "Design Studio Inc."
Phone: "+1-555-0123"
Job Position: "Creative Director"
```

### **How to Trigger Contact Sync:**

#### **Manual Sync:**
1. **Click "👥 Sync Contacts"** on your website
2. **System fetches** all contacts from Outlook
3. **Creates customers** in Odoo
4. **Shows sync results** with count

#### **Bidirectional Sync:**
- **Outlook → Odoo:** Contact updates sync to Odoo
- **Odoo → Outlook:** Customer updates sync to Outlook
- **Conflict resolution:** Latest changes win

## 📅 Calendar Sync Process

### **What Gets Synced:**

#### **Outlook Events → Odoo Calendar:**
- **Event subject** → Calendar event name
- **Start/end time** → Event duration
- **Location** → Event location
- **Attendees** → Event participants
- **Description** → Event notes

#### **Example Sync:**
```
Outlook Meeting:
Subject: "Client Consultation - Fashion Brand"
Start: 2024-01-15 10:00 AM
End: 2024-01-15 11:00 AM
Location: "Conference Room A"
Attendees: ["client@fashionbrand.com", "sarah@houseofholmes.com"]

↓ Syncs to Odoo as:

Calendar Event:
Name: "Client Consultation - Fashion Brand"
Start: 2024-01-15 10:00 AM
End: 2024-01-15 11:00 AM
Location: "Conference Room A"
Attendees: ["client@fashionbrand.com", "sarah@houseofholmes.com"]
```

### **How to Trigger Calendar Sync:**

#### **Manual Sync:**
1. **Click "📅 Sync Events"** on your website
2. **System fetches** next 30 days of events
3. **Creates calendar events** in Odoo
4. **Shows sync results** with count

#### **Automatic Sync:**
- **Real-time sync** when events are created/modified
- **Recurring events** handled properly
- **Meeting reminders** sync to Odoo

## 🔄 Full Sync Process

### **Complete Data Synchronization:**

#### **What Full Sync Does:**
1. **📧 Syncs all emails** from last 30 days
2. **👥 Syncs all contacts** from Outlook
3. **📅 Syncs all calendar events** for next 30 days
4. **🔄 Creates relationships** between data
5. **📊 Generates sync report** with counts

#### **How to Run Full Sync:**
1. **Click "🚀 Full Sync"** on your website
2. **System processes** all data types
3. **Shows progress** for each sync type
4. **Displays final results** with totals

### **Example Full Sync Results:**
```
📊 Sync Results:
Emails: 45 (created 45 leads)
Contacts: 23 (created 23 customers)
Events: 12 (created 12 calendar events)
Total: 80 items synced
```

## ⚙️ Advanced Sync Configuration

### **Sync Frequency Options:**

#### **Real-time Sync:**
- **Webhook-based** for instant updates
- **Requires server setup** for production
- **Best for active businesses**

#### **Scheduled Sync:**
- **Every 15 minutes** for high activity
- **Every hour** for moderate activity
- **Daily** for low activity

#### **Manual Sync:**
- **On-demand** when needed
- **Good for testing** and verification
- **Control over sync timing**

### **Data Filtering:**

#### **Email Filters:**
- **Date range:** Last 7, 30, 90 days
- **Sender domain:** Specific companies
- **Email type:** Inbox, sent, specific folders
- **Importance:** High, normal, low priority

#### **Contact Filters:**
- **Company size:** Small, medium, large
- **Industry:** Fashion, retail, manufacturing
- **Location:** Geographic filtering
- **Contact type:** Customers, prospects, partners

#### **Calendar Filters:**
- **Event type:** Meetings, calls, appointments
- **Attendee count:** Individual, small group, large group
- **Duration:** Short, medium, long events
- **Location:** On-site, virtual, external

## 🚨 Troubleshooting Sync Issues

### **Common Problems:**

#### **Connection Issues:**
- **Check Microsoft credentials** in .env file
- **Verify API permissions** in Azure portal
- **Test network connectivity** to Microsoft Graph API

#### **Data Sync Issues:**
- **Check Odoo credentials** and permissions
- **Verify data format** compatibility
- **Review error logs** for specific issues

#### **Performance Issues:**
- **Reduce sync frequency** for large datasets
- **Implement data filtering** to sync only relevant data
- **Use batch processing** for large contact lists

### **Sync Monitoring:**

#### **Track Sync Performance:**
- **Sync success rate** percentage
- **Data processing time** for each sync
- **Error count** and types
- **Data quality** metrics

#### **Set Up Alerts:**
- **Failed sync notifications** via email
- **Data conflict alerts** for manual review
- **Performance degradation** warnings

## 🎯 Best Practices for House of Holmes

### **Recommended Sync Strategy:**

#### **For Sales Team:**
- **Real-time email sync** for immediate lead capture
- **Daily contact sync** for customer updates
- **Weekly calendar sync** for meeting management

#### **For Operations:**
- **Hourly email sync** for order inquiries
- **Daily contact sync** for supplier updates
- **Real-time calendar sync** for production scheduling

#### **For Management:**
- **Daily full sync** for comprehensive reporting
- **Weekly data cleanup** for data quality
- **Monthly sync review** for optimization

### **Data Quality Maintenance:**

#### **Regular Cleanup:**
- **Remove duplicate contacts** monthly
- **Update outdated information** weekly
- **Archive old emails** quarterly
- **Clean calendar events** monthly

#### **Data Validation:**
- **Verify email addresses** are valid
- **Check phone numbers** format
- **Validate company names** consistency
- **Review contact completeness**

Your Outlook to Odoo sync will streamline House of Holmes operations! 🚀 