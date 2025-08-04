#!/usr/bin/env node

/**
 * Microsoft Outlook Integration Setup
 * =================================
 * 
 * This script helps you set up Microsoft Graph API
 * for Outlook integration with Odoo.
 */

console.log('📧 Microsoft Outlook Integration Setup');
console.log('=====================================\n');

console.log('🔧 Step-by-Step Setup Guide:');
console.log('============================\n');

console.log('1️⃣ CREATE AZURE APP REGISTRATION');
console.log('================================\n');

console.log('• Go to: https://portal.azure.com/');
console.log('• Sign in with your Microsoft account');
console.log('• Search for "App registrations"');
console.log('• Click "New registration"\n');

console.log('2️⃣ CONFIGURE APP DETAILS');
console.log('========================');
console.log('• Name: "House of Holmes Outlook Integration"');
console.log('• Supported account types: "Accounts in this organizational directory only"');
console.log('• Redirect URI: Web → http://localhost:3000/auth/callback');
console.log('• Click "Register"\n');

console.log('3️⃣ COPY APP CREDENTIALS');
console.log('========================');
console.log('• Application (client) ID: Copy this value');
console.log('• Directory (tenant) ID: Copy this value');
console.log('• Save both for your .env file\n');

console.log('4️⃣ CREATE CLIENT SECRET');
console.log('========================');
console.log('• Go to "Certificates & secrets"');
console.log('• Click "New client secret"');
console.log('• Description: "House of Holmes Integration"');
console.log('• Expiration: Choose appropriate duration');
console.log('• Copy the secret value immediately (you won\'t see it again)\n');

console.log('5️⃣ CONFIGURE API PERMISSIONS');
console.log('============================');
console.log('• Go to "API permissions"');
console.log('• Click "Add a permission"');
console.log('• Select "Microsoft Graph"');
console.log('• Choose "Application permissions"');
console.log('• Add these permissions:');
console.log('  - Mail.Read');
console.log('  - Mail.ReadWrite');
console.log('  - Contacts.Read');
console.log('  - Contacts.ReadWrite');
console.log('  - Calendars.Read');
console.log('  - Calendars.ReadWrite');
console.log('• Click "Add permissions"\n');

console.log('6️⃣ GRANT ADMIN CONSENT');
console.log('======================');
console.log('• Click "Grant admin consent for [Your Organization]"');
console.log('• Confirm the permissions\n');

console.log('7️⃣ UPDATE YOUR .ENV FILE');
console.log('========================');
console.log('Add these lines to your .env file:');
console.log('REACT_APP_MICROSOFT_CLIENT_ID=your_client_id_here');
console.log('REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id_here');
console.log('REACT_APP_MICROSOFT_CLIENT_SECRET=your_client_secret_here');
console.log('REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth/callback\n');

console.log('8️⃣ TEST THE INTEGRATION');
console.log('========================');
console.log('• Run: npm start');
console.log('• Go to the Outlook Integration section');
console.log('• Click "Test Connection"');
console.log('• Try syncing emails, contacts, and calendar\n');

console.log('🔗 USEFUL LINKS:');
console.log('================');
console.log('• Azure Portal: https://portal.azure.com/');
console.log('• Microsoft Graph Explorer: https://developer.microsoft.com/en-us/graph/graph-explorer');
console.log('• Graph API Documentation: https://docs.microsoft.com/en-us/graph/');
console.log('• Authentication Guide: https://docs.microsoft.com/en-us/graph/auth-v2-service\n');

console.log('⚠️  IMPORTANT NOTES:');
console.log('===================');
console.log('• Keep your client secret secure');
console.log('• Client secrets expire - you\'ll need to regenerate');
console.log('• Admin consent is required for application permissions');
console.log('• The app needs appropriate licenses for the features');
console.log('• Test in development before production\n');

console.log('🔄 SYNC FEATURES:');
console.log('=================');
console.log('• Email synchronization with Odoo');
console.log('• Contact synchronization with Odoo CRM');
console.log('• Calendar event synchronization');
console.log('• Full sync option for all data\n');

console.log('✅ Setup complete! Follow the steps above to configure Microsoft Outlook integration.'); 