import React, { useState } from 'react';
import odooService from '../services/odooService';

const OdooTest = () => {
  const [testStatus, setTestStatus] = useState('');
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testOdooConnection = async () => {
    setLoading(true);
    setTestStatus('Testing Odoo connection...');
    
    try {
      // Test basic connectivity first
      const connectivityTest = await fetch('https://house-of-holmes.odoo.com/web/session/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: 'house-of-holmes',
            login: 'it@houseofholmes.com',
            password: 'a4fCNrx!6CiuKjH7',
          },
        }),
      });
      
      const connectivityData = await connectivityTest.json();
      console.log('Odoo response:', connectivityData);
      
      setTestResults(prev => ({ 
        ...prev, 
        connectivity: connectivityTest.ok ? '✅ Server reachable' : '❌ Server not reachable',
        response: JSON.stringify(connectivityData, null, 2)
      }));
      
      // Test authentication
      const authResult = await odooService.authenticate();
      setTestResults(prev => ({ ...prev, auth: authResult ? '✅ Success' : '❌ Failed' }));
      
      if (authResult) {
        // Test getting products
        try {
          const products = await odooService.getProducts();
          setTestResults(prev => ({ 
            ...prev, 
            products: products && products.length > 0 ? `✅ Found ${products.length} products` : '❌ No products found'
          }));
        } catch (error) {
          setTestResults(prev => ({ ...prev, products: '❌ Failed to load products' }));
        }
        
        // Test creating a test lead
        try {
          const leadResult = await odooService.createLead({
            name: 'Test Lead - Website Integration',
            email: 'test@houseofholmes.com',
            phone: '+1-555-123-4567',
            message: 'This is a test lead from the website integration.'
          });
          setTestResults(prev => ({ 
            ...prev, 
            lead: leadResult ? '✅ Test lead created' : '❌ Failed to create lead'
          }));
        } catch (error) {
          setTestResults(prev => ({ ...prev, lead: '❌ Failed to create lead' }));
        }
      }
      
      setTestStatus('Test completed!');
    } catch (error) {
      console.error('Odoo test error:', error);
      setTestStatus('❌ Connection failed');
      setTestResults({ auth: '❌ Authentication failed', error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: '#f8f8f8', 
      border: '2px solid #333', 
      borderRadius: '8px',
      margin: '2rem 0'
    }}>
      <h3>🔧 Odoo Integration Test</h3>
      <p>Test your Odoo connection and configuration</p>
      
      <button 
        onClick={testOdooConnection}
        disabled={loading}
        style={{
          background: '#000',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '1rem'
        }}
      >
        {loading ? 'Testing...' : 'Test Odoo Connection'}
      </button>
      
      {testStatus && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Status:</strong> {testStatus}
        </div>
      )}
      
      {Object.keys(testResults).length > 0 && (
        <div>
          <h4>Test Results:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(testResults).map(([test, result]) => (
              <li key={test} style={{ marginBottom: '0.5rem' }}>
                <strong>{test}:</strong> {result}
              </li>
            ))}
          </ul>
          
          {testResults.response && (
            <div style={{ marginTop: '1rem' }}>
              <h5>Detailed Response:</h5>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '1rem', 
                borderRadius: '4px', 
                fontSize: '0.8rem',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {testResults.response}
              </pre>
            </div>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Configuration:</strong></p>
        <ul>
          <li>Odoo URL: https://house-of-holmes.odoo.com</li>
          <li>Database: house-of-holmes</li>
          <li>Check .env file for credentials</li>
        </ul>
      </div>
    </div>
  );
};

export default OdooTest; 