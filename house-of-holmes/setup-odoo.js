#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏠 House of Holmes Odoo Integration Setup');
console.log('==========================================\n');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envContent = `# House of Holmes Odoo Configuration
REACT_APP_ODOO_URL=https://house-of-holmes.odoo.com
REACT_APP_ODOO_DB=house-of-holmes
REACT_APP_ODOO_USERNAME=your_username_here
REACT_APP_ODOO_PASSWORD=your_password_here

# Formspree Backup
REACT_APP_FORMSPREE_ID=xrgjabqr
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Setup Instructions:');
console.log('=====================');
console.log('1. Edit the .env file with your Odoo credentials');
console.log('2. Replace "your_username_here" with your Odoo username');
console.log('3. Replace "your_password_here" with your Odoo password');
console.log('4. Restart your development server');
console.log('\n🔗 Your Odoo Instance: https://house-of-holmes.odoo.com/odoo');
console.log('🌐 Your Website: http://localhost:3000');
console.log('\n📚 Next Steps:');
console.log('- Log into Odoo and add products');
console.log('- Test the consultation form');
console.log('- Check if products display on your website');
console.log('\n❓ Need help? Check ODOO_SETUP.md for detailed instructions'); 