import { getOdooConfig } from '../config/odooConfig';

// Odoo API Integration Service
class OdooService {
  constructor() {
    const config = getOdooConfig();
    this.baseUrl = config.baseUrl;
    this.database = config.database;
    this.username = config.username;
    this.password = config.password;
    this.uid = null;
  }

  // Authenticate with Odoo
  async authenticate() {
    try {
      const response = await fetch(`${this.baseUrl}/web/session/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: this.database,
            login: this.username,
            password: this.password,
          },
        }),
      });

      const data = await response.json();
      if (data.result && data.result.uid) {
        this.uid = data.result.uid;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Odoo authentication failed:', error);
      return false;
    }
  }

  // Create a new lead in Odoo CRM
  async createLead(leadData) {
    if (!this.uid) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        throw new Error('Failed to authenticate with Odoo');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/web/dataset/call_kw/crm.lead/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'crm.lead',
            method: 'create',
            args: [{
              name: leadData.name,
              email_from: leadData.email,
              phone: leadData.phone,
              description: leadData.message,
              type: 'lead',
              source_id: 1, // Website source
              user_id: 1, // Assign to specific salesperson
              team_id: 1, // Assign to specific team
            }],
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to create lead in Odoo:', error);
      throw error;
    }
  }

  // Create a new customer in Odoo
  async createCustomer(customerData) {
    if (!this.uid) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        throw new Error('Failed to authenticate with Odoo');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/web/dataset/call_kw/res.partner/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'res.partner',
            method: 'create',
            args: [{
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone,
              comment: customerData.message,
              customer_rank: 1,
              supplier_rank: 0,
            }],
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to create customer in Odoo:', error);
      throw error;
    }
  }

  // Get products/services from Odoo
  async getProducts() {
    if (!this.uid) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        throw new Error('Failed to authenticate with Odoo');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/web/dataset/call_kw/product.template/search_read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'product.template',
            method: 'search_read',
            args: [
              [['sale_ok', '=', true]], // Only saleable products
              ['name', 'description', 'list_price', 'image_1920'],
            ],
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to get products from Odoo:', error);
      throw error;
    }
  }

  // Create a quotation/order
  async createQuotation(orderData) {
    if (!this.uid) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        throw new Error('Failed to authenticate with Odoo');
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/web/dataset/call_kw/sale.order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'sale.order',
            method: 'create',
            args: [{
              partner_id: orderData.customerId,
              order_line: orderData.items.map(item => [
                0, 0, {
                  product_id: item.productId,
                  name: item.name,
                  product_uom_qty: item.quantity,
                  price_unit: item.price,
                }
              ]),
            }],
          },
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Failed to create quotation in Odoo:', error);
      throw error;
    }
  }
}

const odooServiceInstance = new OdooService();
export default odooServiceInstance; 