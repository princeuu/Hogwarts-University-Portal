/* @param {string} currentUser - the ID of the current user
@param {function} setCurrentPage - a function to set the current page to display
@param {string} userRole - the role of the current user
@returns {JSX.Element} - the rendered component
*/
import { useState, useEffect } from 'react';
import NavigationButtons from '../components/NavigationButtons';
import LoginData from '../data/login.json';
import CourseData from '../data/courses.json';
import '../styles/Profile.css';

function Profile({ currentUser, setCurrentPage, userRole}) {
  const [courseName, setCourseName] = useState(''); // Set up a state variable to store the course name(s) of the user

  const user = LoginData.find(user => user.ID === currentUser); // Find the user based on the currentUser ID and get their enrolled courses

  useEffect(() => {
    const enrolledCourses = CourseData.filter(course => course.studentsEnrolledArray.includes(user.ID));
    const courseNames = enrolledCourses.map(course => course.courseName); // Map over the enrolled courses and create an array of course names
    setCourseName(courseNames.join(", ")); // Join the array of course names into a string separated by commas and set the state variable
  }, [currentUser, user]);

  return (
    <div>
      <NavigationButtons userRole={userRole} setCurrentPage={setCurrentPage} />
      <div className="profile-wrapper">
        <div className="profile-container">
          <h2>Profile</h2>
          <div className="profile-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p> Your Classes: {courseName} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

