import React, { useState } from 'react';

const ConsultationForm = () => {
  const [form, setForm] = useState({ name: '', email: '', gender: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    // Simulate async submission
    setTimeout(() => {
      if (form.name && form.email && form.gender && form.message) {
        setStatus('success');
        setForm({ name: '', email: '', gender: '', message: '' });
      } else {
        setStatus('error');
        setError('Please fill in all fields.');
      }
    }, 1200);
  };

  return (
    <section id="consultation">
      <h2>Free 15-Minute Consultation</h2>
      <p style={{maxWidth:'600px',margin:'0 auto 1.5rem'}}>Ready to bring your fashion vision to life? Schedule your free 15-minute consultation today and let's discuss how we can help.</p>
      <form className="consult-form" onSubmit={handleSubmit} autoComplete="off" aria-live="polite">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required disabled={status==='loading'} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required disabled={status==='loading'} />

        <label>Gender</label>
        <div className="gender-radio-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={form.gender==='Male'} onChange={handleChange} required disabled={status==='loading'} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={form.gender==='Female'} onChange={handleChange} required disabled={status==='loading'} />
            Female
          </label>
        </div>

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="4" placeholder="Your message here..." value={form.message} onChange={handleChange} required disabled={status==='loading'}></textarea>
        <button type="submit" disabled={status==='loading'}>
          {status==='loading' ? 'Booking...' : 'Book My Consultation'}
        </button>
        {status==='success' && <div className="form-success">Thank you! We'll be in touch soon.</div>}
        {status==='error' && <div className="form-error">{error}</div>}
      </form>
    </section>
  );
};

export default ConsultationForm; 