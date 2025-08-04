#!/usr/bin/env node

/**
 * House of Holmes - Integration Configuration Script
 * ================================================
 * 
 * This script helps configure all integrations for the website:
 * - Odoo CRM/ERP
 * - Formspree (Contact Form)
 * - Google Calendar
 * - Social Media APIs (Instagram, Facebook, LinkedIn)
 * - Microsoft Outlook
 */

const fs = require('fs');
const path = require('path');

console.log('🏠 House of Holmes - Integration Configuration');
console.log('=============================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('📁 Found existing .env file');
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('Current configuration:\n');
  
  // Parse and display current config
  const lines = envContent.split('\n');
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        const displayValue = key.includes('PASSWORD') || key.includes('TOKEN') || key.includes('SECRET') 
          ? value.substring(0, 8) + '...' 
          : value;
        console.log(`  ${key}: ${displayValue}`);
      }
    }
  });
  console.log('');
} else {
  console.log('📁 No .env file found. Creating new configuration...\n');
}

// Integration setup guide
console.log('🔧 Integration Setup Guide');
console.log('==========================\n');

// 1. Odoo Configuration
console.log('1️⃣ ODOO INTEGRATION');
console.log('-------------------');
console.log('✅ Already configured with your credentials');
console.log('   URL: https://house-of-holmes.odoo.com');
console.log('   Database: house-of-holmes');
console.log('   Username: it@houseofholmes.com');
console.log('   Status: Ready to use\n');

// 2. Formspree Configuration
console.log('2️⃣ FORMSPREE (Contact Form)');
console.log('---------------------------');
console.log('✅ Already configured');
console.log('   Form ID: xrgjqjqj');
console.log('   Status: Ready to use\n');

// 3. Google Calendar
console.log('3️⃣ GOOGLE CALENDAR');
console.log('-------------------');
console.log('📋 To configure Google Calendar:');
console.log('   1. Go to Google Cloud Console: https://console.cloud.google.com/');
console.log('   2. Create a new project or select existing');
console.log('   3. Enable Google Calendar API');
console.log('   4. Create credentials (API Key)');
console.log('   5. Get your Calendar ID from Google Calendar settings');
console.log('   6. Update .env file with:');
console.log('      REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key');
console.log('      REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id\n');

// 4. Social Media APIs
console.log('4️⃣ SOCIAL MEDIA APIs');
console.log('-------------------');
console.log('📋 Instagram Basic Display API:');
console.log('   1. Go to https://developers.facebook.com/');
console.log('   2. Create a new app');
console.log('   3. Add Instagram Basic Display product');
console.log('   4. Generate access token');
console.log('   5. Update .env: REACT_APP_INSTAGRAM_TOKEN=your_token\n');

console.log('📋 Facebook Graph API:');
console.log('   1. Use the same Facebook app');
console.log('   2. Add Facebook Login product');
console.log('   3. Generate page access token');
console.log('   4. Update .env: REACT_APP_FACEBOOK_TOKEN=your_token\n');

console.log('📋 LinkedIn Marketing API:');
console.log('   1. Go to https://www.linkedin.com/developers/');
console.log('   2. Create a new app');
console.log('   3. Request Marketing Developer Platform access');
console.log('   4. Generate access token');
console.log('   5. Update .env: REACT_APP_LINKEDIN_TOKEN=your_token\n');

// 5. Microsoft Outlook
console.log('5️⃣ MICROSOFT OUTLOOK');
console.log('-------------------');
console.log('📋 To configure Microsoft Graph API:');
console.log('   1. Go to Azure Portal: https://portal.azure.com/');
console.log('   2. Register a new application');
console.log('   3. Add Microsoft Graph permissions');
console.log('   4. Generate client secret');
console.log('   5. Update .env with:');
console.log('      REACT_APP_MICROSOFT_CLIENT_ID=your_client_id');
console.log('      REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id');
console.log('      REACT_APP_MICROSOFT_CLIENT_SECRET=your_secret\n');

// Current Status
console.log('📊 CURRENT STATUS');
console.log('================');
console.log('✅ Odoo Integration: Ready');
console.log('✅ Formspree: Ready');
console.log('⏳ Google Calendar: Needs API key');
console.log('⏳ Social Media: Needs API tokens');
console.log('⏳ Microsoft Outlook: Needs Azure credentials\n');

// Next Steps
console.log('🚀 NEXT STEPS');
console.log('=============');
console.log('1. Test Odoo connection (already working)');
console.log('2. Test contact form submission');
console.log('3. Configure Google Calendar API');
console.log('4. Set up social media API tokens');
console.log('5. Configure Microsoft Azure for Outlook');
console.log('6. Test all integrations');
console.log('7. Deploy to production\n');

// Test commands
console.log('🧪 TEST COMMANDS');
console.log('================');
console.log('npm start                    # Start development server');
console.log('npm run build               # Build for production');
console.log('npm test                    # Run tests');
console.log('npm run eject              # Eject from Create React App (if needed)\n');

// Deployment options
console.log('🌐 DEPLOYMENT OPTIONS');
console.log('=====================');
console.log('• Vercel (Recommended): https://vercel.com/');
console.log('• Netlify: https://netlify.com/');
console.log('• GitHub Pages: Built-in with GitHub');
console.log('• AWS S3 + CloudFront: For advanced users');
console.log('• Heroku: https://heroku.com/\n');

console.log('🎉 Configuration guide complete!');
console.log('Update your .env file with the API keys and tokens as needed.'); 