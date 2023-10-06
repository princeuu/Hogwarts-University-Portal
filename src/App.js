import React, { useState } from 'react';
import './styles/App.css';

import Login from './pages/Login';
import Course from './pages/Course';
import School from './pages/School';
import Header from './components/Headr';
import Profile from './pages/Profile';
import CourseWork from './pages/CourseWork';
import Registration from './pages/Registration';
import Announcements from './pages/Announcements';
import Dropping from './pages/Dropping';
import Accessibility from './pages/Accessibility';

function App() {
  const [currentPage, setCurrentPage] = useState('school');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (user) => {
    setUserRole(user.role);
    setUserId(user.ID);
    setCurrentPage('courses');
  };

  let content;
  if (currentPage === 'school') {
    content = <School setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'login') {
    content = <Login onLoginSuccess={handleLoginSuccess} />;
  } else if (currentPage === 'courses') {
    content = <Course setCurrentPage={setCurrentPage} userRole={userRole} userId={userId} />;
  } else if (currentPage === 'profile') {
    content = <Profile currentUser={userId} userRole={userRole} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'courseWork') {
    content = <CourseWork setCurrentPage={setCurrentPage} userRole={userRole} userId={userId} />;
  } else if (currentPage === 'registration') {
    content = <Registration currentUser={userId} userRole={userRole} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'announcements') {
    content = <Announcements currentUser={userId} userRole={userRole} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'dropping') {
    content = <Dropping currentUser={userId} userRole={userRole} setCurrentPage={setCurrentPage} />;
  } else if (currentPage === 'accessibility') {
    content = <Accessibility currentUser={userId} userRole={userRole} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className='App'>
      <Header isSchool={currentPage === 'school'} />
      {content}
    </div>
  );
}

export default App;



