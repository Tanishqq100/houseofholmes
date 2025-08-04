// Odoo Configuration
export const odooConfig = {
  // House of Holmes Odoo Instance
  baseUrl: 'https://house-of-holmes.odoo.com',
  database: 'house-of-holmes', // Usually matches the subdomain
  username: 'your_username', // Replace with your Odoo username
  password: 'your_password', // Replace with your Odoo password
  
  // CRM Settings
  defaultSalespersonId: 1,
  defaultTeamId: 1,
  websiteSourceId: 1,
  
  // Product Settings
  serviceCategoryId: 1,
  
  // API Endpoints
  endpoints: {
    authenticate: '/web/session/authenticate',
    createLead: '/web/dataset/call_kw/crm.lead/create',
    createCustomer: '/web/dataset/call_kw/res.partner/create',
    getProducts: '/web/dataset/call_kw/product.template/search_read',
    createQuotation: '/web/dataset/call_kw/sale.order/create',
  }
};

// Environment variables (if using .env file)
export const getOdooConfig = () => ({
  baseUrl: process.env.REACT_APP_ODOO_URL || odooConfig.baseUrl,
  database: process.env.REACT_APP_ODOO_DB || odooConfig.database,
  username: process.env.REACT_APP_ODOO_USERNAME || odooConfig.username,
  password: process.env.REACT_APP_ODOO_PASSWORD || odooConfig.password,
}); 