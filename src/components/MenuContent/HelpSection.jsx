import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from 'axios';

const SERVICE_ID = 'service_9kztqyf';
const TEMPLATE_ID = 'template_tlnqn1a';
const USER_ID = 'UBEPZL3oALdYJxdDT';
const ABSTRACT_API_KEY = '9c5305893dee40e48921d5fa15ee5ebf'; 
const HelpSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verifyEmail = async (email) => {
    try {
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`);
      return response.data.deliverability === 'DELIVERABLE';
    } catch (error) {
      console.error('Error verifying email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEmailValid = await verifyEmail(formData.email);
    if (!isEmailValid) {
      toast.error('Invalid email address. Please check and try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      }, USER_ID);
      toast.success('Message sent successfully. We\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.gradientOverlay}></div>
      <div style={styles.cardContent}>
        <h2 style={styles.title}>How can we help?</h2>
        <p style={styles.description}>Share your problem with us and we'll get back to you shortly.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Your Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="John Doe"
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Your Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="john@example.com"
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="message" style={styles.label}>Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="How can we assist you?"
              rows="4"
            />
          </div>
          <button type="submit" style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

HelpSection.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const styles = {
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
    padding: '20px',
    paddingTop: '30px' ,
    borderRadius: '3px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
    opacity: 0.1,
    zIndex: -1,
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '25px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    // marginBottom: '5px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '3px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#6e8efb',
      boxShadow: '0 0 0 2px rgba(110, 142, 251, 0.2)',
      outline: 'none',
    },
  },
  textarea: {
    padding: '12px 15px',
    borderRadius: '3px',
    border: '1px solid #ddd',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#6e8efb',
      boxShadow: '0 0 0 2px rgba(110, 142, 251, 0.2)',
      outline: 'none',
    },
  },
  button: {
    padding: '14px 20px',
    backgroundColor: '#6e8efb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#5a7af0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(110, 142, 251, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 5px rgba(110, 142, 251, 0.3)',
    },
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    '&:hover': {
      transform: 'none',
      boxShadow: 'none',
    },
  },
};

export default HelpSection;
