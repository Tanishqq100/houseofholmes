#!/usr/bin/env node

/**
 * Social Media Integration Setup
 * =============================
 * 
 * This script helps you set up social media integrations
 * for Instagram, Facebook, and LinkedIn.
 */

console.log('📱 Social Media Integration Setup');
console.log('=================================\n');

console.log('🔧 Step-by-Step Setup Guide:');
console.log('============================\n');

console.log('📸 INSTAGRAM BASIC DISPLAY API');
console.log('==============================\n');

console.log('1️⃣ CREATE FACEBOOK APP');
console.log('----------------------');
console.log('• Go to: https://developers.facebook.com/');
console.log('• Click "My Apps" → "Create App"');
console.log('• Choose "Consumer" app type');
console.log('• Name: "House of Holmes Instagram"');
console.log('• Contact email: it@houseofholmes.com\n');

console.log('2️⃣ ADD INSTAGRAM PRODUCT');
console.log('------------------------');
console.log('• In your app, go to "Add Product"');
console.log('• Find "Instagram Basic Display"');
console.log('• Click "Set Up"\n');

console.log('3️⃣ CONFIGURE INSTAGRAM');
console.log('----------------------');
console.log('• Go to "Instagram Basic Display" → "Basic Display"');
console.log('• Add your Instagram account');
console.log('• Generate access token');
console.log('• Copy the token\n');

console.log('4️⃣ UPDATE .ENV FILE');
console.log('-------------------');
console.log('Add to your .env file:');
console.log('REACT_APP_INSTAGRAM_TOKEN=your_instagram_token_here\n');

console.log('📘 FACEBOOK GRAPH API');
console.log('=====================\n');

console.log('1️⃣ USE SAME FACEBOOK APP');
console.log('------------------------');
console.log('• In your existing Facebook app');
console.log('• Go to "Add Product"');
console.log('• Add "Facebook Login"\n');

console.log('2️⃣ GET PAGE ACCESS TOKEN');
console.log('-------------------------');
console.log('• Go to "Tools" → "Graph API Explorer"');
console.log('• Select your app and page');
console.log('• Generate page access token');
console.log('• Copy the token\n');

console.log('3️⃣ UPDATE .ENV FILE');
console.log('-------------------');
console.log('Add to your .env file:');
console.log('REACT_APP_FACEBOOK_TOKEN=your_facebook_token_here\n');

console.log('💼 LINKEDIN MARKETING API');
console.log('========================\n');

console.log('1️⃣ CREATE LINKEDIN APP');
console.log('----------------------');
console.log('• Go to: https://www.linkedin.com/developers/');
console.log('• Click "Create App"');
console.log('• Name: "House of Holmes"');
console.log('• LinkedIn Page: Your company page\n');

console.log('2️⃣ REQUEST API ACCESS');
console.log('---------------------');
console.log('• In your app, go to "Products"');
console.log('• Request access to "Marketing Developer Platform"');
console.log('• Wait for approval (can take 1-2 days)\n');

console.log('3️⃣ GENERATE ACCESS TOKEN');
console.log('------------------------');
console.log('• Once approved, go to "Auth"');
console.log('• Generate access token');
console.log('• Copy the token\n');

console.log('4️⃣ UPDATE .ENV FILE');
console.log('-------------------');
console.log('Add to your .env file:');
console.log('REACT_APP_LINKEDIN_TOKEN=your_linkedin_token_here\n');

console.log('🧪 TESTING');
console.log('==========\n');

console.log('1️⃣ TEST INSTAGRAM');
console.log('-----------------');
console.log('• Run: npm start');
console.log('• Go to Social Media section');
console.log('• Check if Instagram posts appear\n');

console.log('2️⃣ TEST FACEBOOK');
console.log('----------------');
console.log('• Check if Facebook posts appear');
console.log('• Verify post content and images\n');

console.log('3️⃣ TEST LINKEDIN');
console.log('----------------');
console.log('• Check if LinkedIn articles appear');
console.log('• Verify "All articles" button works\n');

console.log('🔗 USEFUL LINKS:');
console.log('================');
console.log('• Facebook Developers: https://developers.facebook.com/');
console.log('• Instagram Basic Display: https://developers.facebook.com/docs/instagram-basic-display-api/');
console.log('• LinkedIn Developers: https://www.linkedin.com/developers/');
console.log('• Graph API Explorer: https://developers.facebook.com/tools/explorer/\n');

console.log('⚠️  IMPORTANT NOTES:');
console.log('===================');
console.log('• Keep all tokens secure');
console.log('• Tokens may expire - you\'ll need to regenerate');
console.log('• LinkedIn approval can take time');
console.log('• Some APIs have rate limits');
console.log('• Test with fallback content if APIs fail\n');

console.log('✅ Setup complete! Follow the steps above to configure social media integrations.'); 