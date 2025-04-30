import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted:", formData);
  //   setSubmitted(true);
  //   setFormData({ name: '', email: '', message: '' });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://resume-builder-server-teal.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Server response:", data);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };
  

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', maxWidth: '300px' }}>
      <h3 style={{ textAlign: 'center' }}>CONTACT FORM</h3>

      {submitted && <p style={{ color: 'green' }}>Thanks for contacting us!</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows="3" style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: 'limegreen', color: 'white', border: 'none', borderRadius: '5px' }}>Send</button>
      </form>
    </div>
  );
};

 export default ContactForm;
