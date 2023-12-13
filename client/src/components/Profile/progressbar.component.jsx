import React from 'react';

export const ProgressBar = (props) => {
  const { value } = props;
  const containerStyle = {
    width: '25%',
    height: '30px',
    border: '2px solid #FFFFFF',
    borderRadius: '10px',
    marginTop: '5px'
  };
  const progressStyle = {
    height: '26px',
    backgroundColor: 'white',
    width: value + '%',
    borderRadius: '3px'
  };
  return (
    <div style={containerStyle}>
      <div style={progressStyle}></div>
    </div>
  );
};