const fs = require('fs');
const path = require('path');

console.log('📧 House of Holmes Outlook Integration Setup');
console.log('============================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ Found existing .env file');
} else {
  console.log('📝 Creating new .env file');
}

// Add Outlook integration environment variables if not present
if (!envContent.includes('REACT_APP_MICROSOFT_CLIENT_ID')) {
  envContent += '\n# Microsoft Outlook Integration\n';
  envContent += 'REACT_APP_MICROSOFT_CLIENT_ID=your_microsoft_client_id_here\n';
  envContent += 'REACT_APP_MICROSOFT_TENANT_ID=your_microsoft_tenant_id_here\n';
  envContent += 'REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth\n';
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Added Microsoft Outlook integration variables to .env file');
} else {
  console.log('✅ Microsoft Outlook integration variables already present in .env file');
}

console.log('\n📋 Outlook Integration Setup Steps:');
console.log('====================================');
console.log('');
console.log('1. Create Microsoft App Registration:');
console.log('   • Go to: https://portal.azure.com/');
console.log('   • Azure Active Directory → App registrations');
console.log('   • Click "New registration"');
console.log('   • Name: "House of Holmes Outlook Integration"');
console.log('   • Supported account types: Single tenant');
console.log('   • Redirect URI: http://localhost:3000/auth');
console.log('');
console.log('2. Configure API Permissions:');
console.log('   • In your app, go to "API permissions"');
console.log('   • Add Microsoft Graph permissions:');
console.log('     - Mail.ReadWrite');
console.log('     - Contacts.ReadWrite');
console.log('     - Calendars.ReadWrite');
console.log('     - User.Read');
console.log('');
console.log('3. Get Client Credentials:');
console.log('   • Copy Application (client) ID');
console.log('   • Create a client secret');
console.log('   • Note down Tenant ID');
console.log('');
console.log('4. Update .env File:');
console.log('   • Replace placeholder values with your actual credentials');
console.log('   • REACT_APP_MICROSOFT_CLIENT_ID=your_actual_client_id');
console.log('   • REACT_APP_MICROSOFT_TENANT_ID=your_actual_tenant_id');
console.log('');
console.log('5. Test Integration:');
console.log('   • Restart your app: npm start');
console.log('   • Go to Outlook Integration section on your website');
console.log('   • Click "Test Outlook Connection"');
console.log('   • Try sync operations');
console.log('');
console.log('🎯 Integration Features:');
console.log('=======================');
console.log('• 📧 Email Sync - Incoming emails create leads in Odoo');
console.log('• 👥 Contact Sync - Outlook contacts sync to Odoo customers');
console.log('• 📅 Calendar Sync - Outlook meetings appear in Odoo');
console.log('• 🔄 Automation - Automatic lead creation and follow-ups');
console.log('');
console.log('📚 Documentation:');
console.log('================');
console.log('• Microsoft Graph API: https://docs.microsoft.com/en-us/graph/');
console.log('• Odoo API: https://www.odoo.com/documentation/16.0/developer/reference.html');
console.log('• Integration Guide: OUTLOOK_ODOO_INTEGRATION.md');
console.log('');
console.log('🚀 Your Outlook to Odoo integration will streamline House of Holmes operations!'); 