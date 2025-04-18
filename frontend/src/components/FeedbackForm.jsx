import React, { useState, useEffect, useRef } from 'react';

function FeedbackForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

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

  const styles = {
    formModal: {
      position: 'fixed',
      bottom: '20px', // Positionné en bas
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end', // Alignement en bas
      zIndex: 1000,
    },
    form: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)', // Ombre vers le haut
      width: '500px',
      maxWidth: '90%',
      marginBottom: '20px', // Espace depuis le bas
    },
  
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%', // Prend toute la largeur disponible
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
      height: '50px',
      boxSizing: 'border-box', 
    },
    textarea: {
      width: '100%',
      minHeight: '200px', 
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      resize: 'vertical',
       boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      backgroundColor: 'white',
      boxSizing: 'border-box'
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
      <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
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
