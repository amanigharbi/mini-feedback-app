import React from 'react';

function Navbar({ onAddFeedbackClick, showBackButton, onBackClick }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      padding: '0.5rem 1rem', // Réduit le padding
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      height: '50px' // Hauteur fixe réduite
    }}>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '1rem' }}> {/* Ajout de paddingRight pour plus d'espacement */}
  {showBackButton && (
    <button 
      onClick={onBackClick}
      style={{
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '0.4rem 0.8rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '0' // Supprime l'espacement inutile
      }}
    >
      ← Retour
    </button>
  )}
</div>
      
      <h1 style={{
        fontSize: '1.5rem', // Taille réduite
        fontWeight: 'bold',
        color: '#333',
        margin: 0,
        flex: 1,
        textAlign: 'center'
      }}>
        🎓 SchoolFeedBack
      </h1>
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start', // Aligné à gauche
        paddingLeft: '1rem' // Décalage vers la gauche
      }}>
        {!showBackButton && (
          <button 
            onClick={onAddFeedbackClick}
            style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              padding: '0.4rem 0.8rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            Ajouter un feedback
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;