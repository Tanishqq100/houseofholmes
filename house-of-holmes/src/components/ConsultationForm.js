import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import odooService from '../services/odooService';

const ConsultationForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Create lead in Odoo CRM
      const leadResult = await odooService.createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Gender: ${formData.gender}\n\nProject Details: ${formData.message}`
      });

      // Also create customer record
      const customerResult = await odooService.createCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      // Send email notification (backup)
      await fetch('https://formspree.io/f/xrgjabqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          message: formData.message,
          subject: 'New Consultation Request - House of Holmes',
          odoo_lead_id: leadResult,
          odoo_customer_id: customerResult
        })
      });

      if (leadResult && customerResult) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          gender: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation">
      <h2>{t('consultation.title')}</h2>
      <form className="consult-form" onSubmit={handleSubmit}>
        <label htmlFor="name">{t('consultation.name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">{t('consultation.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">{t('consultation.phone')}</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <div className="gender-radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            {t('consultation.male')}
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            {t('consultation.female')}
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
            />
            {t('consultation.other')}
          </label>
        </div>

        <label htmlFor="message">{t('consultation.message')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : t('consultation.submit')}
        </button>

        {submitStatus === 'success' && (
          <div className="form-success">
            Thank you! We'll be in touch soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-error">
            Something went wrong. Please try again or contact us directly.
          </div>
        )}
      </form>
    </section>
  );
};

export default ConsultationForm; 