 /* @param {Object} props - The props object that contains the function setCurrentPage to handle the click event of the "Portal" button.
@param {function} props.setCurrentPage - The function that updates the current page to the "login" page when the "Portal" button is clicked.
@returns {JSX.Element} A JSX element that represents the School component.
@example */

import React from 'react';
import Footer from '../components/Footr';
import ClassRoom1 from '../images/ClassRoom1.jpg';
import '../styles/School.css';


function School({ setCurrentPage }) { //handles login page
  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="image-container">
          <h1 className="image-title-text">
            Welcome to Hogwarts School of Witchcraft and Wizardry!
          </h1>
          <h2 className="image-text-desc">
            Step into a world of magic and wonder at Hogwarts School of Witchcraft and Wizardry, where young witches and wizards embark on a journey of self-discovery, hone their magical skills, and forge lifelong friendships that will last a lifetime.
          </h2>
          <img
            className="hogwarts-image"
            src={ClassRoom1}
            alt="Hogwarts Classroom"
          />
        </div>
        <button className="btn" onClick={handleLoginClick}>
          Portal
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default School;



