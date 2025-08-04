const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Microsoft Azure Credentials Setup');
console.log('=====================================\n');

console.log('📋 You need the following from Microsoft Azure Portal:');
console.log('1. Application (Client) ID');
console.log('2. Directory (Tenant) ID');
console.log('3. Client Secret (optional)\n');

console.log('🌐 To get these credentials:');
console.log('1. Go to: https://portal.azure.com/');
console.log('2. Search for "App registrations"');
console.log('3. Create a new registration or use existing one');
console.log('4. Copy the Application ID and Directory ID\n');

rl.question('Application (Client) ID: ', (clientId) => {
  rl.question('Directory (Tenant) ID: ', (tenantId) => {
    rl.question('Client Secret (optional, press Enter to skip): ', (clientSecret) => {
      
      // Read current .env file
      let envContent = '';
      try {
        envContent = fs.readFileSync('.env', 'utf8');
      } catch (error) {
        console.log('❌ .env file not found. Creating new one...');
        envContent = `# House of Holmes Configuration
REACT_APP_ODOO_URL=https://house-of-holmes.odoo.com
REACT_APP_ODOO_DB=house-of-holmes
REACT_APP_ODOO_USERNAME=it@houseofholmes.com
REACT_APP_ODOO_PASSWORD=a4fCNrx!6CiuKjH7

# Formspree Backup
REACT_APP_FORMSPREE_ID=xrgjabqr
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key_here
REACT_APP_GOOGLE_CALENDAR_ID=primary

# Social Media API Tokens
REACT_APP_INSTAGRAM_TOKEN=your_instagram_token_here
REACT_APP_FACEBOOK_TOKEN=your_facebook_token_here
REACT_APP_LINKEDIN_TOKEN=your_linkedin_token_here

# Microsoft Outlook Integration
REACT_APP_MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
REACT_APP_MICROSOFT_TENANT_ID=your_microsoft_tenant_id_here
REACT_APP_MICROSOFT_REDIRECT_URI=http://localhost:3000/auth
`;
      }

      // Update Microsoft credentials
      envContent = envContent.replace(
        /REACT_APP_MICROSOFT_CLIENT_ID=.*/,
        `REACT_APP_MICROSOFT_CLIENT_ID=${clientId}`
      );
      
      envContent = envContent.replace(
        /REACT_APP_MICROSOFT_TENANT_ID=.*/,
        `REACT_APP_MICROSOFT_TENANT_ID=${tenantId}`
      );

      if (clientSecret && clientSecret.trim()) {
        // Add client secret if provided
        if (envContent.includes('REACT_APP_MICROSOFT_CLIENT_SECRET=')) {
          envContent = envContent.replace(
            /REACT_APP_MICROSOFT_CLIENT_SECRET=.*/,
            `REACT_APP_MICROSOFT_CLIENT_SECRET=${clientSecret}`
          );
        } else {
          envContent += `REACT_APP_MICROSOFT_CLIENT_SECRET=${clientSecret}\n`;
        }
      }

      // Write updated .env file
      try {
        fs.writeFileSync('.env', envContent);
        console.log('\n✅ Microsoft credentials updated successfully!');
        console.log('\n📋 Updated credentials:');
        console.log(`Client ID: ${clientId}`);
        console.log(`Tenant ID: ${tenantId}`);
        if (clientSecret && clientSecret.trim()) {
          console.log(`Client Secret: ${clientSecret.substring(0, 3)}...`);
        }
        console.log('\n🔄 Please restart your development server to apply changes.');
        console.log('Run: npm start');
      } catch (error) {
        console.error('❌ Error updating .env file:', error.message);
      }

      rl.close();
    });
  });
}); 