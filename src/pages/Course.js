import { useState, useEffect } from 'react';
import NavigationButtons from '../components/NavigationButtons';
import '../styles/Course.css';
import CourseData from '../data/courses.json';
import UserData from '../data/login.json';
import GradeData from '../data/grades.json';

function Course({ setCurrentPage, userRole, userId }) {
  const [courses, setCourses] = useState([]); // State for courses
  const [grades, setGrades] = useState([]); // State for grades

  useEffect(() => {
    if (userRole === 'student') { // Load courses and grades for student or teacher
      const enrolledCourses = CourseData.filter(course =>
        course.studentsEnrolledArray.includes(userId)
      );
      const studentGrades = GradeData.filter(grade => grade.studentID === userId);
      setGrades(studentGrades);
      setCourses(enrolledCourses);
    } else if (userRole === 'teacher') {
      const teachingCourses = CourseData.filter(course => course.teachersID === userId);
      setCourses(teachingCourses);
    }
  }, [userRole, userId]);

  const getGradesForTeacher = (courseId) => { // Get grades for a teacher's course
    return GradeData.filter(grade => grade.courseID === courseId);
  };

  const getStudentName = (studentId) => { // Get student name from ID
    const student = UserData.find(user => user.ID === studentId && user.role === 'student');
    return student ? student.name : 'Unknown';
  };

  const getGrade = (courseId, teachersId) => { // Get student's grade for a course or teacher's course grades
    if (userRole === 'student') {
      const grade = grades.find(grade => grade.courseID === courseId && grade.studentID === userId);
      if (grade) {
        return <p>Grade: {grade.grade}</p>;
      } else {
        return <p>Grade not in yet</p>;
      }
    } else if (userRole === 'teacher' && teachersId === userId) {
      const courseGradesList = getGradesForTeacher(courseId);
      if (courseGradesList.length > 0) {
        return (
          <div>
            <h4>Grades:</h4>
            <ul>
              {courseGradesList.map(grade => (
                <p key={grade.studentID} id = "lists">Name: {getStudentName(grade.studentID)}
                <p>Grade: {grade.grade}</p>
                </p>
              ))}
            </ul>
          </div>
        );
      } else {
        return <p>No grades yet</p>;
      }
    } else {
      return null;
    }
  };

  const getTeacherName = (teacherId) => { // Get teacher name from ID
    const teacher = UserData.find(user => user.ID === teacherId && user.role === 'teacher');
    return teacher ? teacher.name : 'Unknown';
  };

  const getTeacherEmail = (teacherId) => { // Get teacher email from ID
    const teacher = UserData.find(user => user.ID === teacherId && user.role === 'teacher');
    return teacher ? teacher.email : 'Unknown';
  };

  return (
    <div>
      <NavigationButtons setCurrentPage={setCurrentPage} userRole={userRole} userId={userId} />
      <h3 className="Course-welcome-title">Registered Courses:</h3>
      <div className="course-container">
        {courses.length === 0 ? (
          <p1>Currently you're not registered for any courses</p1>
        ) : (
          <div className="course-list">
            {courses.map(course => (
              <div key={course.courseID} className="course-card">
                <h4>{course.courseName}</h4>
                <p>{course.description}</p>
                <p> Instructor: {getTeacherName(course.teachersID)}</p>
                <p>Classroom: {course.classRoom}</p>
                <h4>Meeting Times:</h4>
                <hr />
                <p>{course.classDays}</p>
                <p>{course.classTime}</p>
                <p>Instructor Email: {getTeacherEmail(course.teachersID)} </p>
                {getGrade(course.courseID, course.teachersID)}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="register-container">
        <h3 className="course-register-lead">Not registered for all of your courses?</h3>
        <button className="registration-button" onClick={() => setCurrentPage("registration")}>
          Register Here
        </button>
      </div>
    </div>
  );
}

export default Course;

