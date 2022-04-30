import React from 'react';
import homeImg from '../constants/png/homeImg.png'

function HomeImg() {
    const imgStyle = {
        height: "39.8vh",
        width: "100%"
      };
  return (
      <>
        <img src={homeImg} style={imgStyle} />
      </>
  )
}

export default HomeImg