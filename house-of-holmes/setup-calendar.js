#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗓️  House of Holmes Calendar Setup');
console.log('===================================\n');

// Check current .env file
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ .env file found');
} else {
  console.log('❌ .env file not found');
}

console.log('\n📋 Google Calendar Setup Instructions:');
console.log('=====================================');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Create a new project or select existing');
console.log('3. Enable Google Calendar API');
console.log('4. Create API Key in Credentials');
console.log('5. Replace "your_api_key_here" in .env file');
console.log('\n🔗 Your Calendar:');
console.log('- Website: http://localhost:3000');
console.log('- Calendar section: Between Odoo Products and Reviews');
console.log('\n📅 Current Features:');
console.log('- Interactive monthly calendar');
console.log('- Sample events (consultations, meetings, planning)');
console.log('- Event categorization by type');
console.log('- Upcoming events list');
console.log('\n🎯 Next Steps:');
console.log('1. Get your Google Calendar API key');
console.log('2. Update the .env file with your API key');
console.log('3. Add events to your Google Calendar');
console.log('4. Events will automatically appear on your website');
console.log('\n📚 Event Types:');
console.log('- Consultation (Black) - Client meetings');
console.log('- Meeting (Dark Grey) - Sample reviews');
console.log('- Planning (Medium Grey) - Production planning');
console.log('- QC (Light Grey) - Quality control');
console.log('\n❓ Need help? Check CALENDAR_SETUP.md for detailed instructions'); 