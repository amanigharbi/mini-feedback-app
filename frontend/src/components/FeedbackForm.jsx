import React, { useState } from 'react';

function FeedbackForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const feedbackData = {
      title,
      message,
      category,
      date: new Date().toLocaleString(),
      id: Date.now(),
    };

    onSubmit(feedbackData);
    setTitle('');
    setMessage('');
    setCategory('');
  };

  // Styles intégrés
  const styles = {
    formModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    form: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      width: '500px',
      maxWidth: '90%',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 600,
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      height: '50px', // Taille augmentée
    },
    textarea: {
      width: '100%',
      minHeight: '200px', // Taille augmentée
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      backgroundColor: 'white',
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    submitBtn: {
      padding: '12px 24px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    cancelBtn: {
      padding: '12px 24px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    btnHover: {
      submit: { backgroundColor: '#45a049' },
      cancel: { backgroundColor: '#d32f2f' },
    },
  };



  

  return (
    <div style={styles.formModal}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333', textAlign: 'center' }}>Nouveau Feedback</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Titre</label>
          <input
            type="text"
            placeholder="Donnez un titre à votre message"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message</label>
          <textarea
            placeholder="Écrivez votre message ici..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Choisissez une catégorie</option>
            <option value="Droit">Droit</option>
            <option value="Management">Management</option>
            <option value="Science">Science</option>
            <option value="Lettre">Lettre</option>
            <option value="Technologie">Technologie</option>
            <option value="Sport">Sport</option>
            <option value="Santé">Santé</option>
            <option value="Autres">Autres</option>
          </select>
        </div>

        <div style={styles.formActions}>
          <button 
            type="button" 
            onClick={onClose} 
            style={styles.cancelBtn}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.btnHover.cancel.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.cancelBtn.backgroundColor}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            style={styles.submitBtn}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.btnHover.submit.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitBtn.backgroundColor}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;