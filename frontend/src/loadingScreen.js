import React from 'react';
import gif from './images/loading.gif';

const FullScreenLoading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(1, 8, 14)', // Optional background color
      display: 'flex',
      flexDirection: 'column', // Stack items vertically
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <img src={gif} alt="Loading..." style={{ maxWidth: '50%', height: 'auto', marginBottom: '20px' }} />
      <h1
        style={{
          color: 'white',
          fontSize: '1.5rem',
          animation: 'pulse 1.5s infinite',
        }}
      >
        Loading, please wait...
      </h1>
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default FullScreenLoading;