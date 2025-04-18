import React from 'react';

function Navbar({ onAddFeedbackClick }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      height: '50px'
    }}>

      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '1rem'
      }}>
        {/* Espace réservé à gauche, vide */}
      </div>

      <h1 style={{
        fontSize: '1.5rem',
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
        justifyContent: 'flex-end',
        paddingRight: '1rem'
      }}>
        {/* Tu peux ajouter un bouton ici si besoin */}
      </div>

    </nav>
  );
}

export default Navbar;
