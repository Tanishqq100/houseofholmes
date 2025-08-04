# House of Holmes Calendar Setup Guide

## Current Calendar Features

Your website now has a beautiful calendar section that displays:

### ✅ **What's Working Now:**
- **Interactive monthly calendar** with navigation
- **Sample events** showing consultations, meetings, planning sessions
- **Event categorization** by type (consultation, meeting, planning, QC)
- **Upcoming events list** with details
- **Responsive design** matching your brand

### 📅 **Sample Events Displayed:**
1. **Consultation - Fashion Brand** (Jan 15, 10:00 AM)
2. **Sample Review Meeting** (Jan 18, 2:00 PM)
3. **Production Planning** (Jan 22, 9:00 AM)
4. **Quality Control Check** (Jan 25, 11:00 AM)

## Connect Real Calendar Events

### **Option 1: Google Calendar Integration** (Recommended)

#### Step 1: Get Google Calendar API Key
1. **Go to:** [Google Cloud Console](https://console.cloud.google.com/)
2. **Create a new project** or select existing
3. **Enable Google Calendar API**
4. **Create credentials** → API Key
5. **Copy the API key**

#### Step 2: Add to Your .env File
```env
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key_here
REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id
```

#### Step 3: Get Your Calendar ID
- **For your main calendar:** Use `primary`
- **For a specific calendar:** Go to Google Calendar → Settings → Integrate calendar → Calendar ID

### **Option 2: Odoo Calendar Integration**

If you have the Calendar module in Odoo:

1. **Enable Calendar module** in Odoo
2. **Create events** in Odoo Calendar
3. **The calendar will automatically** sync with your website

### **Option 3: Manual Event Management**

You can manually add events by editing the sample events in `src/components/Calendar.js`:

```javascript
const sampleEvents = [
  {
    id: 1,
    title: 'Your Real Event Title',
    date: new Date(2024, 0, 15, 10, 0), // Year, Month-1, Day, Hour, Minute
    duration: 60,
    type: 'consultation', // consultation, meeting, planning, qc
    description: 'Your event description'
  },
  // Add more events...
];
```

## Event Types & Colors

| Type | Color | Description |
|------|-------|-------------|
| **Consultation** | Black | Client meetings, consultations |
| **Meeting** | Dark Grey | Sample reviews, client meetings |
| **Planning** | Medium Grey | Production planning sessions |
| **QC** | Light Grey | Quality control checks |

## Calendar Features

### **Monthly View:**
- **Navigate months** with arrow buttons
- **Event dots** show on days with events
- **Hover effects** for interactive experience

### **Upcoming Events:**
- **Shows next 5 events** automatically
- **Event details** with time and description
- **Color-coded** by event type

### **Responsive Design:**
- **Works on all devices** (desktop, tablet, mobile)
- **Consistent with your brand** (black, white, grey theme)
- **Professional appearance** perfect for business

## Adding Events

### **Via Google Calendar:**
1. **Add events** to your Google Calendar
2. **Include keywords** in titles for automatic categorization:
   - "Consultation" → consultation type
   - "Sample Review" → meeting type
   - "Production Planning" → planning type
   - "Quality Control" → qc type

### **Via Odoo:**
1. **Go to Calendar** in your Odoo instance
2. **Create new events** with proper titles
3. **Events will sync** to your website

### **Manual Addition:**
1. **Edit the sample events** in the Calendar component
2. **Add your real events** with proper dates and details
3. **Save and refresh** your website

## Troubleshooting

### **Calendar Not Loading:**
- Check if the development server is running
- Verify the Calendar component is imported in App.js
- Check browser console for errors

### **Events Not Showing:**
- Verify event dates are in the future
- Check event format in the code
- Ensure proper date formatting

### **Google Calendar Not Working:**
- Verify API key is correct
- Check if Calendar API is enabled
- Ensure calendar ID is correct

## Next Steps

1. **Set up Google Calendar API** for real events
2. **Add your actual events** to Google Calendar
3. **Test the calendar** on your website
4. **Customize event types** if needed
5. **Add more features** like event booking

## Support

- **Google Calendar API:** [Documentation](https://developers.google.com/calendar)
- **Odoo Calendar:** Check your Odoo instance settings
- **Website Issues:** Check browser console for errors

Your calendar is now live and ready for real events! 🗓️ 