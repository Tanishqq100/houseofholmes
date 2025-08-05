#!/usr/bin/env node

/**
 * 🧪 Real-Time Alert Testing Script
 * ================================
 * 
 * This script lets you test your social media alert system by sending
 * fake webhook data to simulate Instagram and LinkedIn posts.
 * 
 * Usage:
 *   node test-alerts.js                    # Interactive mode
 *   node test-alerts.js instagram          # Send fake Instagram post
 *   node test-alerts.js linkedin           # Send fake LinkedIn post
 *   node test-alerts.js flood              # Send multiple posts rapidly
 */

const https = require('https');
const http = require('http');
const readline = require('readline');

const BACKEND_URL = 'http://localhost:5000';
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Fake post data
const fakeInstagramPosts = [
  {
    username: 'houseofholmes_official',
    content: '🧵 Just completed a new custom clothing line for our amazing client! The attention to detail in every stitch reflects our commitment to quality. #CustomClothing #HouseOfHolmes #QualityCraftsmanship',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600'
  },
  {
    username: 'houseofholmes_official', 
    content: '✨ Behind the scenes at our design studio! Our talented team is working on pattern development for next season\'s collection. Each design tells a story of innovation and craftsmanship. #BehindTheScenes #PatternMaking #DesignStudio',
    image: 'https://images.unsplash.com/photo-1558618047-1c1c4d7d3917?w=600'
  },
  {
    username: 'houseofholmes_official',
    content: '🏆 Quality control check completed! ✅ Our rigorous standards ensure every garment meets the highest quality standards. Every piece that leaves our facility represents excellence. #QualityControl #Manufacturing #Excellence',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
  }
];

const fakeLinkedInPosts = [
  {
    username: 'House of Holmes Manufacturing',
    content: '🏭 Excited to share our latest manufacturing innovation! We\'ve just implemented new quality control standards that ensure 99.9% accuracy in our production process. This milestone represents our dedication to excellence in fashion manufacturing.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
  },
  {
    username: 'House of Holmes Manufacturing',
    content: '📊 Industry Report: The future of fashion manufacturing lies in the perfect blend of traditional craftsmanship and modern technology. Our recent investments in automation have increased productivity by 40% while maintaining our signature quality standards.',
    image: null
  },
  {
    username: 'House of Holmes Manufacturing',
    content: '🤝 Partnership Announcement: We\'re thrilled to collaborate with sustainable fabric suppliers to bring eco-friendly manufacturing to the forefront of our industry. Together, we\'re building a more sustainable future for fashion.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600'
  }
];

// Utility functions
function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function getRandomPost(platform) {
  const posts = platform === 'instagram' ? fakeInstagramPosts : fakeLinkedInPosts;
  return posts[Math.floor(Math.random() * posts.length)];
}

function makeRequest(endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BACKEND_URL}${endpoint}`);
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function checkBackendHealth() {
  try {
    const response = await makeRequest('/health', {});
    if (response.status === 200) {
      log(`✅ Backend is running! Connected clients: ${response.data.connectedClients}`, 'green');
      return true;
    } else {
      log(`❌ Backend health check failed: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Cannot connect to backend at ${BACKEND_URL}`, 'red');
    log(`   Make sure to run: cd backend && npm run dev`, 'yellow');
    return false;
  }
}

async function sendFakePost(platform) {
  const post = getRandomPost(platform);
  const alertData = {
    platform,
    message: `🔔 New ${platform} post published!`,
    data: {
      id: `test_${platform}_${Date.now()}`,
      username: post.username,
      content: post.content,
      image: post.image,
      timestamp: new Date().toISOString(),
      likes: Math.floor(Math.random() * 500) + 10,
      comments: Math.floor(Math.random() * 50) + 2,
      testPost: true
    }
  };

  try {
    log(`📤 Sending fake ${platform} post...`, 'blue');
    log(`   Content: ${post.content.substring(0, 80)}...`, 'cyan');
    
    const response = await makeRequest('/api/trigger-alert', alertData);
    
    if (response.status === 200) {
      log(`✅ Alert sent successfully! Clients notified: ${response.data.connectedClients}`, 'green');
      return true;
    } else {
      log(`❌ Failed to send alert: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error sending alert: ${error.message}`, 'red');
    return false;
  }
}

async function sendWebhook(platform) {
  let webhookData;
  let endpoint;
  
  switch (platform) {
    case 'instagram':
      webhookData = {
        object: 'instagram',
        entry: [{
          id: '12345678901234567',
          time: Math.floor(Date.now() / 1000),
          changes: [{
            field: 'media',
            value: {
              media_id: `test_media_${Date.now()}`,
              media_type: Math.random() > 0.5 ? 'IMAGE' : 'VIDEO'
            }
          }]
        }]
      };
      endpoint = '/webhooks/instagram';
      break;
      
    case 'linkedin':
      webhookData = {
        eventType: 'SHARE_LIFECYCLE_EVENT',
        shareId: `urn:li:share:test${Date.now()}`,
        timestamp: Date.now(),
        object: 'share',
        data: {
          author: 'urn:li:organization:house-of-holmes',
          content: 'Real webhook test from LinkedIn',
          visibility: 'PUBLIC'
        }
      };
      endpoint = '/webhooks/linkedin';
      break;
      
    default:
      log(`❌ Unsupported platform: ${platform}`, 'red');
      return false;
  }

  try {
    log(`🔗 Sending real ${platform} webhook...`, 'blue');
    
    const response = await makeRequest(endpoint, webhookData);
    
    if (response.status === 200) {
      log(`✅ Webhook sent successfully!`, 'green');
      return true;
    } else {
      log(`❌ Webhook failed: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Webhook error: ${error.message}`, 'red');
    return false;
  }
}

async function floodTest() {
  log(`🌊 Starting flood test with multiple alerts...`, 'magenta');
  
  const tests = [
    { platform: 'instagram', delay: 0 },
    { platform: 'linkedin', delay: 2000 },
    { platform: 'instagram', delay: 4000 },
    { platform: 'linkedin', delay: 6000 }
  ];
  
  for (const test of tests) {
    setTimeout(async () => {
      await sendFakePost(test.platform);
    }, test.delay);
  }
  
  log(`🎯 Flood test started! Watch your frontend for multiple alerts.`, 'magenta');
}

async function interactiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  log('\n🧪 Interactive Alert Testing Mode', 'cyan');
  log('================================\n', 'cyan');
  
  while (true) {
    log('\nOptions:', 'yellow');
    log('1. Send fake Instagram post');
    log('2. Send fake LinkedIn post');
    log('3. Send real Instagram webhook');
    log('4. Send real LinkedIn webhook');
    log('5. Flood test (multiple alerts)');
    log('6. Check backend health');
    log('0. Exit');
    
    const choice = await new Promise(resolve => {
      rl.question('\nSelect option (0-6): ', resolve);
    });
    
    switch (choice) {
      case '1':
        await sendFakePost('instagram');
        break;
      case '2':
        await sendFakePost('linkedin');
        break;
      case '3':
        await sendWebhook('instagram');
        break;
      case '4':
        await sendWebhook('linkedin');
        break;
      case '5':
        await floodTest();
        break;
      case '6':
        await checkBackendHealth();
        break;
      case '0':
        log('\n👋 Goodbye!', 'cyan');
        rl.close();
        return;
      default:
        log('❌ Invalid option', 'red');
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  log('🧪 House of Holmes - Alert Testing Script', 'cyan');
  log('========================================\n', 'cyan');
  
  // Check backend health first
  const backendOk = await checkBackendHealth();
  if (!backendOk) {
    log('\n💡 To start the backend:', 'yellow');
    log('   cd backend && npm run dev', 'yellow');
    process.exit(1);
  }
  
  switch (command) {
    case 'instagram':
      await sendFakePost('instagram');
      break;
    case 'linkedin':
      await sendFakePost('linkedin');
      break;
    case 'webhook-instagram':
      await sendWebhook('instagram');
      break;
    case 'webhook-linkedin':
      await sendWebhook('linkedin');
      break;
    case 'flood':
      await floodTest();
      break;
    case 'health':
      // Already checked above
      break;
    default:
      await interactiveMode();
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  log('\n\n👋 Testing session ended. Thank you!', 'cyan');
  process.exit(0);
});

main().catch(error => {
  log(`❌ Script error: ${error.message}`, 'red');
  process.exit(1);
}); 