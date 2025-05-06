import React from 'react';
import gif from './images/loading.gif'
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
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <img src={gif} alt="Loading..." style={{ maxWidth: 'auto', height: 'auto' }} />
      {/* <h1 style={{ color: 'white' }}>LOADING</h1> */}
    </div>
  );
};

export default FullScreenLoading;