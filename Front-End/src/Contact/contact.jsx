// ContactPage.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div style={styles.container}>
      <h2>Contact Yellow Pages</h2>
      <div style={styles.details}>
        <p><strong>Address:</strong>College Of Engineering , Guindy</p>
        <p><strong>Phone:</strong> +91 6369647196</p>
        <p><strong>Email:</strong> contact@yellowpages.com</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  details: {
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#333'
  }
};

export default ContactPage;
