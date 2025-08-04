#!/usr/bin/env node

/**
 * Google Calendar Integration Setup
 * ===============================
 * 
 * This script helps you set up Google Calendar integration
 * for the House of Holmes website.
 */

console.log('📅 Google Calendar Integration Setup');
console.log('===================================\n');

console.log('🔧 Step-by-Step Setup Guide:');
console.log('============================\n');

console.log('1️⃣ CREATE GOOGLE CLOUD PROJECT');
console.log('-----------------------------');
console.log('• Go to: https://console.cloud.google.com/');
console.log('• Click "Select a project" → "New Project"');
console.log('• Name: "House of Holmes Calendar"');
console.log('• Click "Create"\n');

console.log('2️⃣ ENABLE GOOGLE CALENDAR API');
console.log('----------------------------');
console.log('• In your project, go to "APIs & Services" → "Library"');
console.log('• Search for "Google Calendar API"');
console.log('• Click on it and press "Enable"\n');

console.log('3️⃣ CREATE API CREDENTIALS');
console.log('------------------------');
console.log('• Go to "APIs & Services" → "Credentials"');
console.log('• Click "Create Credentials" → "API Key"');
console.log('• Copy the generated API key');
console.log('• (Optional) Restrict the key to Calendar API)\n');

console.log('4️⃣ GET YOUR CALENDAR ID');
console.log('------------------------');
console.log('• Go to: https://calendar.google.com/');
console.log('• Click on your calendar name → "Settings"');
console.log('• Scroll down to "Integrate calendar"');
console.log('• Copy the "Calendar ID" (usually your email)\n');

console.log('5️⃣ UPDATE YOUR .ENV FILE');
console.log('-------------------------');
console.log('Add these lines to your .env file:');
console.log('REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key_here');
console.log('REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id_here\n');

console.log('6️⃣ TEST THE INTEGRATION');
console.log('------------------------');
console.log('• Run: npm start');
console.log('• Go to the Calendar section on your website');
console.log('• Check if events are loading\n');

console.log('🔗 USEFUL LINKS:');
console.log('================');
console.log('• Google Cloud Console: https://console.cloud.google.com/');
console.log('• Google Calendar API Docs: https://developers.google.com/calendar');
console.log('• Calendar ID Help: https://support.google.com/calendar/answer/37100\n');

console.log('⚠️  IMPORTANT NOTES:');
console.log('===================');
console.log('• Keep your API key secure');
console.log('• Consider restricting the API key to your domain');
console.log('• The calendar must be public or shared with the service account');
console.log('• Events will only show if they are public or shared\n');

console.log('✅ Setup complete! Follow the steps above to configure Google Calendar.'); 