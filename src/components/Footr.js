import React from 'react';
import '../styles/Footr.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='left'>
        <b>Contact us: </b>
        <span style={{ marginLeft: '20px' }}>
          Email: CollegeServices@HogwartsUni.edu
        </span>
        <span style={{ marginLeft: '20px' }}>
          Location: Hogwarts Castle, Highlands, Scotland, Great Britain.
        </span>
      </div>
    </div>
  );
}

export default Footer;