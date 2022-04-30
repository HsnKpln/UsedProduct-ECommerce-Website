import React from 'react'
import logoApp from '../constants/svg/logoApp.svg'

function Logo() {
    const logoStyle = {
        height: "6.75vh",
        width: "225px"
      };
  return (
    <img src={logoApp} style={logoStyle} />
  )
}

export default Logo