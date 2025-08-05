# 🧪 Real-Time Social Media Alerts Testing Guide

This guide will show you how to test your real-time social media alert system using fake posts, webhook simulation, and real-world scenarios.

## 🚀 Quick Start Testing

### 1. Start Your Servers

```bash
# Terminal 1 - Backend Server
cd backend
npm run dev

# Terminal 2 - Frontend
cd house-of-holmes  
npm start
```

### 2. Open Testing Panel

1. Go to http://localhost:3000
2. Look for the **bouncing red "🧪 Test Alerts" button** in the bottom-right corner
3. Click it to open the comprehensive testing panel

## 📱 Testing Methods Available

### Method 1: Simple Testing Panel (Built-in)

**What it does:** Creates fake social media posts and triggers alerts
**Best for:** Quick validation that alerts are working

**How to use:**
1. Click "🧪 Test Alerts" button
2. Try these options:
   - **🏥 Check Backend** - Verify backend connection
   - **🧪 Simple Alert** - Basic alert test
   - **🎬 Multi-Post Scenario** - Multiple alerts in sequence
   - **🚀 Send Alert** - Individual predefined posts
   - **🎯 Create Custom Post** - Your own content

### Method 2: Real Webhook Simulation

**What it does:** Sends actual webhook payloads like Instagram/LinkedIn would
**Best for:** Testing production-ready scenarios

**Available webhooks:**
- Instagram media creation
- LinkedIn share events  
- Facebook page posts

### Method 3: External Webhook Testing

**What it does:** Use external tools to test webhooks
**Best for:** Testing production deployment

## 🔧 Detailed Testing Scenarios

### Scenario 1: Instagram Post Alert

```javascript
// This is what gets sent when you click "Instagram Post" in testing panel
const fakeInstagramPost = {
  platform: 'instagram',
  username: 'houseofholmes_official',
  content: '🧵 Just completed a new custom clothing line...',
  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
  likes: 234,
  comments: 45
}
```

**Expected behavior:**
1. 🔔 Browser notification appears
2. 📱 Floating alert in top-right corner
3. 🔊 Audio notification sound
4. 📚 Alert added to history
5. 🔄 Social feed refreshes

### Scenario 2: LinkedIn Professional Post

```javascript
const fakeLinkedInPost = {
  platform: 'linkedin', 
  username: 'House of Holmes Manufacturing',
  content: '🏭 Excited to share our latest manufacturing innovation...',
  image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'
}
```

### Scenario 3: Multi-Platform Flood Test

Click **"🎬 Multi-Post Scenario"** to simulate:
- Instagram post at T+0s
- LinkedIn post at T+3s  
- Another Instagram at T+6s
- Facebook post at T+9s

This tests how your system handles rapid alerts.

## 🌐 Testing with Real Webhook URLs (Advanced)

### Using ngrok for Production Testing

1. **Install ngrok:**
   ```bash
   # Install ngrok
   npm install -g ngrok
   # or download from https://ngrok.com/
   ```

2. **Expose your backend:**
   ```bash
   ngrok http 5000
   ```
   
3. **Get your webhook URLs:**
   ```
   https://abc123.ngrok.io/webhooks/instagram
   https://abc123.ngrok.io/webhooks/linkedin  
   https://abc123.ngrok.io/webhooks/facebook
   ```

4. **Configure these in your social platforms:**
   - Instagram: Developer Console → Webhooks
   - LinkedIn: App Settings → Webhooks
   - Facebook: App Dashboard → Webhooks

### Testing with Postman/cURL

Send real webhook requests:

```bash
# Instagram webhook test
curl -X POST http://localhost:5000/webhooks/instagram \
  -H "Content-Type: application/json" \
  -d '{
    "object": "instagram",
    "entry": [{
      "id": "12345",
      "time": 1640995200,
      "changes": [{
        "field": "media",
        "value": {
          "media_id": "test_123",
          "media_type": "IMAGE"
        }
      }]
    }]
  }'

# LinkedIn webhook test  
curl -X POST http://localhost:5000/webhooks/linkedin \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "SHARE_LIFECYCLE_EVENT",
    "shareId": "urn:li:share:test123",
    "timestamp": 1640995200000
  }'
```

## 🎭 Creating Fake Social Media Accounts (Testing Only)

### For Development Testing:

1. **Create test Instagram account:**
   - Username: `hofh_test_dev`
   - Bio: "Test account for development"
   - Post sample content using your testing panel

2. **Create test LinkedIn company page:**
   - Name: "HofH Testing LLC"
   - Industry: "Software Development"
   - Use for webhook testing

**⚠️ Important:** Only use test accounts, never real production accounts for development.

## 📊 Monitoring Your Tests

### What to Watch For:

1. **Browser Console:**
   ```javascript
   // Successful alerts show:
   ✅ Connected to real-time service
   📱 New post alert received: {data}
   🔊 Notification sound played
   ```

2. **Backend Logs:**
   ```
   🚀 Client connected: socket_id
   📤 Broadcasted new instagram post to 1 clients  
   ✅ Alert sent successfully
   ```

3. **UI Indicators:**
   - Connection status: ⚡ Real-time vs 🔄 Polling
   - Alert history showing recent tests
   - Toast notifications for connection status

## 🐛 Troubleshooting

### Common Issues:

**1. No alerts appearing:**
```bash
# Check backend is running
curl http://localhost:5000/health

# Check frontend connection
# Look for "Connected to real-time service" in console
```

**2. Backend not receiving webhooks:**
```bash
# Test the endpoint directly
curl -X POST http://localhost:5000/api/trigger-alert \
  -H "Content-Type: application/json" \
  -d '{"platform":"test","message":"Direct test"}'
```

**3. Browser notifications not showing:**
- Check if notifications are allowed in browser
- Look for notification permission prompt
- Test with: `realtimeService.requestNotificationPermission()`

## 🎯 Production Testing Checklist

Before going live:

- [ ] Test all three platforms (Instagram, LinkedIn, Facebook)
- [ ] Verify webhooks work with ngrok
- [ ] Test browser notifications in different browsers
- [ ] Test mobile responsiveness
- [ ] Verify fallback to polling works
- [ ] Test with multiple browser tabs open
- [ ] Load test with rapid webhook calls
- [ ] Test notification permission handling
- [ ] Verify error handling for failed webhooks

## 📞 Manual Testing Commands

```javascript
// Run these in browser console for manual testing

// Test real-time connection
realtimeService.triggerTestAlert('instagram', 'Manual console test');

// Check connection status  
console.log(realtimeService.getConnectionStatus());

// Test notification permission
realtimeService.requestNotificationPermission();

// Test polling service
pollingService.manualCheck();
```

## 🎉 Success Criteria

Your system is working correctly when:

1. ✅ Alerts appear within 2 seconds of trigger
2. ✅ Browser notifications display properly  
3. ✅ Audio notifications play
4. ✅ Connection automatically falls back to polling if WebSocket fails
5. ✅ Alert history tracks all tests
6. ✅ Mobile layout works correctly
7. ✅ Multiple browser tabs all receive alerts
8. ✅ Webhook endpoints return proper HTTP status codes

---

**🎊 Congratulations!** You now have a fully testable real-time social media alert system. Use this guide to validate everything works before connecting to real social media accounts. 