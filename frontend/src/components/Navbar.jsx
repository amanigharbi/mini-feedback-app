import React, { useState } from 'react';

function Navbar({ onAddFeedbackClick, showBackButton, onBackClick }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <style>
        {`
          .back-button {
            position: relative;
            padding-left: 8px;
          }

          .label {
            display: inline-block;
            padding: 6px 18px 6px 26px;
            background: linear-gradient(to bottom, #fdfdfd, #e5e5e5);
            color: #333;
            font-weight: bold;
            text-decoration: none;
            border-radius: 6px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
            border: 1px solid #ccc;
            position: relative;
          }

          .label::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -12px;
            width: 0;
            height: 0;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            border-right: 12px solid #e5e5e5;
            transform: translateY(-50%);
            z-index: 1;
          }

          .label.active {
            box-shadow: inset 1px 1px 3px rgba(0,0,0,0.3);
          }

          .label:active {
            box-shadow: inset 1px 1px 3px rgba(0,0,0,0.3);
          }

          .label:hover {
            background: linear-gradient(to bottom, #f0f0f0, #dcdcdc);
            border-color: #bbb;
          }
        `}
      </style>

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

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingRight: '1rem' }}>
          {showBackButton && (
            <div className="back-button">
              <a
                href="#"
                className={`label ${isActive ? 'active' : ''}`}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseOut={() => setIsActive(false)}
                onClick={(e) => {
                  e.preventDefault();
                  onBackClick();
                }}
              >
               Retour
              </a>
            </div>
          )}
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
          justifyContent: 'flex-start',
          paddingLeft: '1rem'
        }}>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
