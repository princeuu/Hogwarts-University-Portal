import React from 'react';
import NavigationButtons from '../components/NavigationButtons';
import '../styles/Accessibility.css';
import CourseData from '../data/courses.json';


function Accessibility({ userId, userRole, setCurrentPage }) {


  async function handleSubmit(event) { // This function handles the form submission when adding a new course
    event.preventDefault();

    
    const courseData = { // Create a JavaScript object with the form data
      courseName: event.target.courseName.value,
      courseID: event.target.CourseID.value,
      teachersID: event.target.teachersID.value,
      teacher: event.target.teachersName.value,
      description: event.target.description.value,
      classRoom: event.target.classRoom.value,
      classDays: event.target.classDays.value, // Add classDays
      classTime: event.target.classTime.value,
    };
  

    try {
      const response = await fetch('http://localhost:3001/api/courses', { // Send a POST request to the server with the course data
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) { // If the response is OK, display a success message
        alert('Course added successfully');
      } else {
        alert('Error adding course');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding course');
    }
  }

  
  
  async function handleDeleteCourse() { // This function handles the deletion of a course
    const courseIdToDelete = document.getElementById('courseIdToDelete').value; // Get the course ID to delete from the input field
    const courseIndexToDelete = CourseData.findIndex(course => course.courseID === courseIdToDelete); // Find the index of the course to delete in the CourseData array
  
    if (courseIndexToDelete !== -1) { // If the course is found, remove it from the CourseData array and update the localStorage
      CourseData.splice(courseIndexToDelete, 1);
      alert(`Course with ID ${courseIdToDelete} has been deleted.`);
      localStorage.setItem('CourseData', JSON.stringify(CourseData));
  
      // Fetch the original courses.json file from the server
      const response = await fetch('http://localhost:3001/api/courses');
      const coursesJson = await response.json();
  
      // Update the coursesJson array with the removed course
      const updatedCoursesJson = coursesJson.filter(course => course.courseID !== courseIdToDelete);
  
      // Send a PUT request to update the courses.json file on the server
      try {
        const response = await fetch('http://localhost:3001/api/courses', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCoursesJson),
        });
      
        if (response.ok) { // If the response is OK, display a success message
          alert('Course deleted successfully');
        } else {
          alert('Error deleting course');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting course');
      }
    } else {
      alert(`No course with ID ${courseIdToDelete} found.`);
    }
  }





  if (userRole === 'teacher') {
    return (
      <div id="access-container">
        <NavigationButtons userRole={userRole} setCurrentPage={setCurrentPage} />
        <div>
          <p className="Create-class-text">Would you like to Create a Class?</p>

          <form id="courseForm" onSubmit={handleSubmit}>
            <label htmlFor="courseName" className="form-label1" id="nam">
              Course Name:
            </label>
            <input type="text" id="courseName" name="courseName" placeholder="Course Name" />

            <label htmlFor="CourseID" className="form-label1">
              {' '}
              Course ID:
            </label>
            <input type="text" id="CourseID" name="CourseID" placeholder="Courses ID" />

            <label htmlFor="teachersID" className="form-label1">
              {' '}
              Teachers ID:
            </label>
            <input type="text" id="teachersID" name="teachersID" placeholder="Teachers ID" />

            <label htmlFor="teachersName" className="form-label1">
              Your Name:
            </label>
            <input type="text" id="teachersName" name="teachersName" placeholder="Teachers Name" />

            <label htmlFor="description" className="form-label1">
              Description:
            </label>
            <textarea type="text" id="description" name="description" placeholder="description" />

            <label htmlFor="classRoom" className="form-label1">
              Classroom number:
            </label>
            <input type="text" id="classRoom" name="classRoom" placeholder="Description" />

            <label htmlFor="classDays" className="form-label1">
              Class Days:
            </label>
            <input type="text" id="classDays" name="classDays" placeholder="Class Days" />

            <label htmlFor="classTime" className="form-label1">
              Class Time:
            </label>
            <input type="text" id="classTime" name="classTime" placeholder="ClassTime" />

            <button type="submit" id="submitAssignment">
              Submit
            </button>
          </form>
      
        </div>

        <div id="or-divider">
        <div className="or-text">- - - - Or - - - -</div>
        </div>
        <div>
          <label htmlFor="courseIdToDelete" className="form-label1">Enter the ID of the course to delete:</label>
          <input type="text" id="courseIdToDelete" placeholder="Course ID" />
          <button type="button" className= "deleteCourse-button" onClick={handleDeleteCourse}>Delete a Course</button>
        </div>
      </div>
      
    );
  } else {
    return (
      <div>
      <NavigationButtons userRole={userRole} setCurrentPage={setCurrentPage} />
      <div>Access restricted. You must be a teacher to create a class.</div>
    </div>
    );
}
}

export default Accessibility;

