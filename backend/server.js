const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Your React app URLs
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.raw({ type: 'application/json' }));

// Store connected clients
const connectedClients = new Set();
let postHistory = [];

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  connectedClients.add(socket);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    connectedClients.delete(socket);
  });
  
  // Send initial connection confirmation
  socket.emit('connected', { 
    message: 'Connected to social media alerts',
    timestamp: new Date().toISOString()
  });

  // Send recent post history to new clients
  if (postHistory.length > 0) {
    socket.emit('post-history', postHistory.slice(-5)); // Last 5 posts
  }
});

// Broadcast new post to all clients
function broadcastNewPost(postData) {
  const alert = {
    id: `alert_${Date.now()}`,
    platform: postData.platform,
    type: 'new_post',
    data: postData.data || {},
    timestamp: new Date().toISOString(),
    message: postData.message
  };

  // Add to history
  postHistory.push(alert);
  if (postHistory.length > 50) {
    postHistory = postHistory.slice(-50); // Keep last 50 posts
  }

  // Broadcast to all connected clients
  io.emit('new-post', alert);
  console.log(`Broadcasted new ${postData.platform} post to ${connectedClients.size} clients`);

  return alert;
}

// Instagram Webhook Endpoint
app.get('/webhooks/instagram', (req, res) => {
  // Webhook verification
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {
    // Verify the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_TOKEN || 'your_verify_token') {
      console.log('Instagram webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/webhooks/instagram', (req, res) => {
  const body = req.body;
  console.log('Instagram webhook received:', JSON.stringify(body, null, 2));
  
  // Handle Instagram post updates
  if (body.object === 'instagram') {
    body.entry?.forEach(entry => {
      entry.changes?.forEach(change => {
        if (change.field === 'media') {
          console.log('New Instagram post detected:', change);
          
          broadcastNewPost({
            platform: 'instagram',
            message: '🔔 New Instagram post published!',
            data: {
              mediaId: change.value?.media_id,
              mediaType: change.value?.media_type,
              timestamp: change.time
            }
          });
        }
      });
    });
  }
  
  res.status(200).send('OK');
});

// LinkedIn Webhook Endpoint  
app.post('/webhooks/linkedin', (req, res) => {
  const body = req.body;
  console.log('LinkedIn webhook received:', JSON.stringify(body, null, 2));
  
  // Handle LinkedIn post updates
  if (body.eventType === 'SHARE_LIFECYCLE_EVENT' || body.object === 'share' || body.object === 'ugcPost') {
    console.log('New LinkedIn post detected:', body);
    
    broadcastNewPost({
      platform: 'linkedin',
      message: '🔔 New LinkedIn post published!',
      data: {
        shareId: body.shareId || body.id,
        eventType: body.eventType,
        timestamp: body.timestamp || new Date().toISOString()
      }
    });
  }
  
  res.status(200).send('OK');
});

// Facebook Webhook Endpoint
app.get('/webhooks/facebook', (req, res) => {
  // Webhook verification
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.FACEBOOK_WEBHOOK_TOKEN || 'your_verify_token') {
      console.log('Facebook webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post('/webhooks/facebook', (req, res) => {
  const body = req.body;
  console.log('Facebook webhook received:', JSON.stringify(body, null, 2));
  
  if (body.object === 'page') {
    body.entry?.forEach(entry => {
      entry.changes?.forEach(change => {
        if (change.field === 'feed') {
          console.log('New Facebook post detected:', change);
          
          broadcastNewPost({
            platform: 'facebook',
            message: '🔔 New Facebook post published!',
            data: {
              postId: change.value?.post_id,
              message: change.value?.message,
              timestamp: change.time
            }
          });
        }
      });
    });
  }
  
  res.status(200).send('OK');
});

// Manual trigger endpoint for testing
app.post('/api/trigger-alert', (req, res) => {
  const { platform, message, data } = req.body;
  
  const alert = broadcastNewPost({
    platform: platform || 'test',
    message: message || 'Test alert triggered!',
    data: data || { test: true }
  });
  
  res.json({ 
    success: true, 
    message: 'Alert sent to all connected clients',
    connectedClients: connectedClients.size,
    alert
  });
});

// Get recent alerts
app.get('/api/recent-alerts', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recentAlerts = postHistory.slice(-limit);
  
  res.json({
    alerts: recentAlerts,
    total: postHistory.length
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connectedClients: connectedClients.size,
    totalAlerts: postHistory.length,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'House of Holmes - Social Media Pub-Sub Server',
    status: 'running',
    endpoints: {
      health: '/health',
      triggerAlert: 'POST /api/trigger-alert',
      recentAlerts: '/api/recent-alerts',
      webhooks: {
        instagram: '/webhooks/instagram',
        linkedin: '/webhooks/linkedin',
        facebook: '/webhooks/facebook'
      }
    },
    connectedClients: connectedClients.size
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('🚀======================================🚀');
  console.log(`🔥 House of Holmes Pub-Sub Server Running`);
  console.log('🚀======================================🚀');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`📱 WebSocket: ws://localhost:${PORT}`);
  console.log(`🔗 Webhooks available at:`);
  console.log(`   📸 Instagram: http://localhost:${PORT}/webhooks/instagram`);
  console.log(`   💼 LinkedIn:  http://localhost:${PORT}/webhooks/linkedin`);
  console.log(`   📘 Facebook:  http://localhost:${PORT}/webhooks/facebook`);
  console.log(`🧪 Test endpoint: POST http://localhost:${PORT}/api/trigger-alert`);
  console.log(`💚 Connected clients: ${connectedClients.size}`);
  console.log('🚀======================================🚀');
}); 