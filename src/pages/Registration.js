/*
@param {string} currentUser - the ID of the current user
@param {string} userRole - the role of the current user
@param {function} setCurrentPage - a function to set the current page to display
@returns {JSX.Element} - the rendered component
*/

import React, { useState, useEffect } from 'react';
import "../styles/Registration.css";
import NavigationButtons from '../components/NavigationButtons';
import CourseData from '../data/courses.json';
import UserData from '../data/login.json';

function Registration({ currentUser, userRole, setCurrentPage }) {
  const [unregisteredCourses, setUnregisteredCourses] = useState([]);

  useEffect(() => { // Load available courses for registration when the component mounts or when currentUser changes
    const user = UserData.find(user => user.ID === currentUser);
    const availableCourses = CourseData.filter(
      course => !course.studentsEnrolledArray.includes(user.ID)
    );
    setUnregisteredCourses(availableCourses);
  }, [currentUser, ]);

  const handleCourseClick = (event, course) => { // Handle course registration
    const user = UserData.find(user => user.ID === currentUser);
    const requestData = {
      courseId: course.courseID,
      userId: user.ID
    };
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Update the course with the new student enrollment
        const updatedCourse = {
          ...course,
          studentsEnrolledArray: [...course.studentsEnrolledArray, user.ID]
        };
        const updatedCourses = CourseData.map(c => { // Update the courses data with the updated course
          if (c.courseID === course.courseID) {
            return updatedCourse;
          }
          return c;
        });
        setUnregisteredCourses(updatedCourses.filter(c => !c.studentsEnrolledArray.includes(user.ID))); // Filter out the registered courses from the unregisteredCourses list
      })
      .catch(error => {
        console.error(error);
      });
  };


  const courseButtons = unregisteredCourses.map((course) => (
    <div key={course.courseID} className="course-cardReg">
      <h4>{course.courseName}</h4>
      <div className="description-container">
        <p>{course.description}</p>
      </div>
      <p>Instructor: {course.teacher}</p>
      <p>Classroom: {course.classRoom}</p>
      <p>Course ID: {course.courseID}</p>
      <h4>Meeting Times:</h4>
      <hr />
      <p>Class Days: {course.classDays}</p>
      <p>Class Time: {course.classTime}</p>
      <button
        className="course-button"
        onClick={(event) => handleCourseClick(event, course)}
        key={course.courseID}
      >
        Register for {course.courseName}
      </button>
      
    </div>
  ));



  return (
    <div>
      <NavigationButtons userRole={userRole} setCurrentPage={setCurrentPage} />
      <div className="registration-text" style={{ marginTop: '40px' }}>
        <h2>Register for classes!</h2>
        <div className="registration-container">
          <div className="course-card-container" style={{ marginTop: '10px' }}>
            {courseButtons}
          </div>
        </div>
      </div>
      <button onClick={() => setCurrentPage('dropping')} className="drop-button">
        Drop Course(s)
      </button>
    </div>
  );
}

export default Registration;

