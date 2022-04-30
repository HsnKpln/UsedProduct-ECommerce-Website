import React from 'react';
import commonImg from '../constants/png/commonImg.png'

function CommonImg() {
    const imgStyle = {
        height: "100vh",
        width: "45%"
      };
  return (
      <>
        <img src={commonImg} style={imgStyle} />
      </>
  )
}

export default CommonImg