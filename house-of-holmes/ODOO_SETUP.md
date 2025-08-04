# House of Holmes Odoo Integration Setup

## Your Odoo Instance
**URL:** https://house-of-holmes.odoo.com/odoo

## Setup Steps

### 1. Configure Odoo Credentials
Edit `src/config/odooConfig.js`:
```javascript
username: 'your_odoo_username', // Replace with your actual username
password: 'your_odoo_password', // Replace with your actual password
```

### 2. Odoo Module Setup

#### Enable Required Modules:
1. **CRM** - For lead management
2. **Sales** - For product catalog
3. **Contacts** - For customer management
4. **Website** - For API access

#### Create API User:
1. Go to **Settings > Users & Companies > Users**
2. Create new user with **API access** permissions
3. Assign to **Sales** and **CRM** groups
4. Note the username and password

### 3. Product Setup in Odoo

#### Add Your Services as Products:
1. Go to **Sales > Products > Products**
2. Create products for your services:
   - **Product Development**
   - **Sample Making**
   - **Technical Design**
   - **Production**
3. Add descriptions, pricing, and images
4. Mark as **"Can be Sold"**

### 4. CRM Configuration

#### Create Lead Sources:
1. Go to **CRM > Configuration > Lead Sources**
2. Add "Website" as a source
3. Note the source ID (usually 1)

#### Set Up Sales Team:
1. Go to **CRM > Configuration > Sales Teams**
2. Create or note existing team ID
3. Assign salesperson to team

### 5. Test the Integration

#### Test Form Submission:
1. Fill out consultation form on your website
2. Check Odoo CRM for new lead
3. Check Contacts for new customer
4. Verify email notification

#### Test Product Display:
1. Check if products load on website
2. Verify pricing and descriptions
3. Test "Inquire Now" functionality

## Troubleshooting

### Common Issues:

#### Authentication Failed:
- Check username/password in config
- Verify API user permissions
- Ensure Odoo instance is accessible

#### Products Not Loading:
- Verify products are marked as "Can be Sold"
- Check product images are properly uploaded
- Ensure products have descriptions

#### Leads Not Creating:
- Verify CRM module is installed
- Check lead source configuration
- Ensure sales team is set up

### API Endpoints Used:
- `/web/session/authenticate` - Login
- `/web/dataset/call_kw/crm.lead/create` - Create leads
- `/web/dataset/call_kw/res.partner/create` - Create customers
- `/web/dataset/call_kw/product.template/search_read` - Get products

## Security Notes:
- Store credentials securely
- Use environment variables in production
- Regularly update Odoo instance
- Monitor API usage

## Next Steps:
1. **Add more products** to your Odoo catalog
2. **Set up automated workflows** in Odoo
3. **Create custom fields** for specific data
4. **Add inventory tracking** if needed
5. **Set up reporting** and analytics

## Support:
- **Odoo Documentation:** https://www.odoo.com/documentation
- **API Reference:** https://www.odoo.com/documentation/16.0/developer/reference.html
- **House of Holmes Odoo:** https://house-of-holmes.odoo.com/odoo 