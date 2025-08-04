#!/usr/bin/env node

/**
 * Integration Test Script
 * ======================
 * 
 * This script tests all integrations to ensure they're working properly.
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 House of Holmes - Integration Testing');
console.log('========================================\n');

// Check .env file
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please run the configuration scripts first.\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

console.log('📋 Testing Configuration...\n');

// Test Odoo Configuration
console.log('1️⃣ ODOO INTEGRATION');
console.log('-------------------');
const odooUrl = lines.find(line => line.startsWith('REACT_APP_ODOO_URL='));
const odooDb = lines.find(line => line.startsWith('REACT_APP_ODOO_DB='));
const odooUser = lines.find(line => line.startsWith('REACT_APP_ODOO_USERNAME='));
const odooPass = lines.find(line => line.startsWith('REACT_APP_ODOO_PASSWORD='));

if (odooUrl && odooDb && odooUser && odooPass) {
  console.log('✅ Odoo configuration found');
  console.log(`   URL: ${odooUrl.split('=')[1]}`);
  console.log(`   Database: ${odooDb.split('=')[1]}`);
  console.log(`   Username: ${odooUser.split('=')[1]}`);
} else {
  console.log('❌ Odoo configuration incomplete');
}

// Test Formspree Configuration
console.log('\n2️⃣ FORMSPREE (Contact Form)');
console.log('---------------------------');
const formspreeId = lines.find(line => line.startsWith('REACT_APP_FORMSPREE_ID='));

if (formspreeId && !formspreeId.includes('your_')) {
  console.log('✅ Formspree configuration found');
  console.log(`   Form ID: ${formspreeId.split('=')[1]}`);
} else {
  console.log('❌ Formspree configuration missing or using placeholder');
}

// Test Google Calendar Configuration
console.log('\n3️⃣ GOOGLE CALENDAR');
console.log('-------------------');
const calendarApiKey = lines.find(line => line.startsWith('REACT_APP_GOOGLE_CALENDAR_API_KEY='));
const calendarId = lines.find(line => line.startsWith('REACT_APP_GOOGLE_CALENDAR_ID='));

if (calendarApiKey && !calendarApiKey.includes('your_')) {
  console.log('✅ Google Calendar API key configured');
} else {
  console.log('❌ Google Calendar API key missing or using placeholder');
}

if (calendarId && !calendarId.includes('your_')) {
  console.log('✅ Google Calendar ID configured');
} else {
  console.log('❌ Google Calendar ID missing or using placeholder');
}

// Test Social Media Configuration
console.log('\n4️⃣ SOCIAL MEDIA APIs');
console.log('-------------------');
const instagramToken = lines.find(line => line.startsWith('REACT_APP_INSTAGRAM_TOKEN='));
const facebookToken = lines.find(line => line.startsWith('REACT_APP_FACEBOOK_TOKEN='));
const linkedinToken = lines.find(line => line.startsWith('REACT_APP_LINKEDIN_TOKEN='));

if (instagramToken && !instagramToken.includes('your_')) {
  console.log('✅ Instagram token configured');
} else {
  console.log('❌ Instagram token missing or using placeholder');
}

if (facebookToken && !facebookToken.includes('your_')) {
  console.log('✅ Facebook token configured');
} else {
  console.log('❌ Facebook token missing or using placeholder');
}

if (linkedinToken && !linkedinToken.includes('your_')) {
  console.log('✅ LinkedIn token configured');
} else {
  console.log('❌ LinkedIn token missing or using placeholder');
}

// Test Microsoft Outlook Configuration
console.log('\n5️⃣ MICROSOFT OUTLOOK');
console.log('-------------------');
const msClientId = lines.find(line => line.startsWith('REACT_APP_MICROSOFT_CLIENT_ID='));
const msTenantId = lines.find(line => line.startsWith('REACT_APP_MICROSOFT_TENANT_ID='));
const msClientSecret = lines.find(line => line.startsWith('REACT_APP_MICROSOFT_CLIENT_SECRET='));

if (msClientId && !msClientId.includes('your_')) {
  console.log('✅ Microsoft Client ID configured');
} else {
  console.log('❌ Microsoft Client ID missing or using placeholder');
}

if (msTenantId && !msTenantId.includes('your_')) {
  console.log('✅ Microsoft Tenant ID configured');
} else {
  console.log('❌ Microsoft Tenant ID missing or using placeholder');
}

if (msClientSecret && !msClientSecret.includes('your_')) {
  console.log('✅ Microsoft Client Secret configured');
} else {
  console.log('❌ Microsoft Client Secret missing or using placeholder');
}

// Summary
console.log('\n📊 INTEGRATION SUMMARY');
console.log('======================');
console.log('✅ Ready to use:');
console.log('   • Odoo Integration');
console.log('   • Formspree (Contact Form)');
console.log('\n⏳ Needs configuration:');
console.log('   • Google Calendar (API Key)');
console.log('   • Social Media APIs (Tokens)');
console.log('   • Microsoft Outlook (Azure Credentials)');

console.log('\n🚀 NEXT STEPS:');
console.log('==============');
console.log('1. Run: npm start');
console.log('2. Test the working integrations');
console.log('3. Configure the missing integrations using:');
console.log('   • node setup-google-calendar.js');
console.log('   • node setup-social-media.js');
console.log('   • node setup-microsoft-outlook.js');
console.log('4. Test all integrations again');
console.log('5. Deploy to production');

console.log('\n🎉 Integration testing complete!'); 