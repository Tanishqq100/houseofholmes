import React, { useState, useEffect } from 'react';
import odooService from '../services/odooService';

const OdooProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const odooProducts = await odooService.getProducts();
      
      if (odooProducts && odooProducts.length > 0) {
        setProducts(odooProducts);
      } else {
        // Fallback to sample products if Odoo fails
        setProducts([
          {
            id: 1,
            name: 'Product Development Services',
            description: 'Complete product development from concept to production',
            price: 'Contact for Quote',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
          },
          {
            id: 2,
            name: 'Sample Making',
            description: 'Professional sample making for all garment types',
            price: 'Contact for Quote',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
          },
          {
            id: 3,
            name: 'Technical Design',
            description: 'Comprehensive technical design packages',
            price: 'Contact for Quote',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
          },
          {
            id: 4,
            name: 'Production Services',
            description: '100% Made in USA production with quality control',
            price: 'Contact for Quote',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      // Use fallback products instead of showing error
      setProducts([
        {
          id: 1,
          name: 'Product Development Services',
          description: 'Complete product development from concept to production',
          price: 'Contact for Quote',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          name: 'Sample Making',
          description: 'Professional sample making for all garment types',
          price: 'Contact for Quote',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          name: 'Technical Design',
          description: 'Comprehensive technical design packages',
          price: 'Contact for Quote',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
        },
        {
          id: 4,
          name: 'Production Services',
          description: '100% Made in USA production with quality control',
          price: 'Contact for Quote',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="products-section">
        <h2>Our Services</h2>
        <div className="loading-spinner">Loading services...</div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2>Our Services</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price">{product.price}</div>
              <button className="product-cta">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OdooProducts; 