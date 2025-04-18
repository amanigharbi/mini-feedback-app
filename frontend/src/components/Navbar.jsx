import React from 'react';

function Navbar({ onAddFeedbackClick, showBackButton, onBackClick }) {
    return (
      <nav className="navbar">
        <div className="navbar-left">
          {showBackButton && (
            <button className="back-btn" onClick={onBackClick}>
              ← Retour
            </button>
          )}
        </div>
        <h1 className="app-title">🎓 SchoolFeedBack</h1>
        <div className="navbar-right">
          {!showBackButton && (
            <button className="add-btn" onClick={onAddFeedbackClick}>
              Ajouter un feedback
            </button>
          )}
        </div>
      </nav>
    );
  }
export default Navbar;