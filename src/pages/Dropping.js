import React, { useState, useEffect } from 'react';
import '../styles/Dropping.css';
import NavigationButtons from '../components/NavigationButtons';
import CourseData from '../data/courses.json';
import UserData from '../data/login.json';

function Dropping({ currentUser, userRole, setCurrentPage }) { // This component displays a list of courses that the user is currently enrolled in and allows them to drop a course by clicking on a button.
  const [unregisteredCourses, setUnregisteredCourses] = useState([]); // Initialize state for unregisteredCourses, which will hold a list of courses the user is currently enrolled in but can drop

  useEffect(() => { // Use useEffect to update unregisteredCourses when the user changes
    const user = UserData.find((user) => user.ID === currentUser);
    const availableCourses = CourseData.filter( // Filter the course data to only include courses that the user is enrolled in
      (course) => course.studentsEnrolledArray.includes(user.ID)
    ); // Set the unregisteredCourses state to the filtered courses
    setUnregisteredCourses(availableCourses);
  }, [currentUser]);

  const handleCourseClick = (event, course) => { // Define a function to handle course drop requests
    const user = UserData.find((user) => user.ID === currentUser); // Create an object to send in the fetch request to the server
    const requestData = {
      courseId: course.courseID,
      userId: user.ID,
    };
    fetch('/api/drop', { // Send a POST request to the server to drop the course
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Log the message returned from the server
        const updatedCourse = { // Update the course data in the CourseData array to reflect the dropped course
          ...course,
          studentsEnrolledArray: course.studentsEnrolledArray.filter(
            (id) => id !== user.ID
          ),
        };
        const updatedCourses = CourseData.map((c) => {
          if (c.courseID === course.courseID) {
            return updatedCourse;
          }
          return c;
        }); // Update the unregisteredCourses state to reflect the dropped course
        setUnregisteredCourses(
          updatedCourses.filter((c) => c.studentsEnrolledArray.includes(user.ID))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const courseButtons = unregisteredCourses.map((course) => (
    <div key={course.courseID} className="course-cardDrop">
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
        className="drop-course-button"
        onClick={(event) => handleCourseClick(event, course)}
        key={course.courseID}
      >
        Drop {course.courseName}
      </button>
    </div>
  ));
  

  return (
    <div>
      <NavigationButtons userRole={userRole} setCurrentPage={setCurrentPage} />
      <div className="drop-text" style={{ marginTop: '40px' }}>
        <h2>Drop Courses:</h2>
        <div className="course-card-container" style={{ marginTop: '10px' }}>
          {courseButtons}
        </div>
      </div>
      <button onClick={() => setCurrentPage('registration')} className="drop-button">
        Register Course(s)
      </button>
    </div>
  );
}

export default Dropping;

