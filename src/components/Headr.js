import React from 'react';
import "../styles/Headr.css";
import logo from '../images/HogLogo.png';

function HeaderNav({ isSchool }) {
  const handleLogoClick = () => {
    if (!isSchool) {
      window.location.href = '/';
    }
  };

  return (
    <div className='header'>
      Hogwarts University
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />
    </div>
  );
}
export default HeaderNav;