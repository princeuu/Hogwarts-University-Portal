const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for cross-origin resource sharing
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format

app.get('/api/assignments', (req, res) => { // Retrieve all assignments from the JSON file
  const data = fs.readFileSync('./src/data/assignments.json', 'utf-8');
  res.send(data);
});

app.post('/api/assignments', (req, res) => { // Add a new assignment to the JSON file
  let newAssignment = req.body;
  const data = JSON.parse(fs.readFileSync('./src/data/assignments.json', 'utf-8'));

  // Parse teacher's ID as an integer
  if (newAssignment.hasOwnProperty('teachersID')) {
    newAssignment.teachersID = parseInt(newAssignment.teachersID, 10);
  }

  data.push(newAssignment);
  fs.writeFileSync('./src/data/assignments.json', JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Assignment added successfully' });
});

app.delete('/api/assignments/:assignmentName', (req, res) => { // Delete an assignment from the JSON file based on assignmentName
  const assignmentName = req.params.assignmentName;
  const data = JSON.parse(fs.readFileSync('./src/data/assignments.json', 'utf-8'));

  const index = data.findIndex(assignment => assignment.assignmentName === assignmentName);
  
  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('./src/data/assignments.json', JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Assignment deleted successfully', data });
  } else {
    res.status(400).json({ message: 'Assignment not found' });
  }
});

app.post('/api/register', (req, res) => { // Register a student for a course
  const { courseId, userId } = req.body;
  const data = JSON.parse(fs.readFileSync('./src/data/courses.json', 'utf-8'));
  const course = data.find(c => c.courseID === courseId);
  if (course) {
    course.studentsEnrolledArray.push(userId);
    fs.writeFileSync('./src/data/courses.json', JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Registration successful' });
  } else {
    res.status(400).json({ message: 'Invalid course ID' });
  }
});

app.post('/api/drop', (req, res) => { // Drop a student from a course
  const { courseId, userId } = req.body;
  const data = JSON.parse(fs.readFileSync('./src/data/courses.json', 'utf-8'));
  const course = data.find(c => c.courseID === courseId);
  if (course) {
    course.studentsEnrolledArray = course.studentsEnrolledArray.filter(id => id !== userId);
    fs.writeFileSync('./src/data/courses.json', JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Dropping successful' });
  } else {
    res.status(400).json({ message: 'Invalid course ID' });
  }
});

app.post('/api/courses', (req, res) => { // Add a new course to the JSON file
  let newCourse = req.body;
  const data = JSON.parse(fs.readFileSync('./src/data/courses.json', 'utf-8'));

  // Parse teacher's ID as an integer
  if (newCourse.hasOwnProperty('teachersID')) {
    newCourse.teachersID = parseInt(newCourse.teachersID, 10);
  }

  // Change "teachersName" to "teacher"
  if (newCourse.hasOwnProperty('teachersName')) {
    newCourse.teacher = newCourse.teachersName;
    delete newCourse.teachersName;
  }

  // Add an empty "studentsEnrolledArray"
  newCourse.studentsEnrolledArray = [];

  data.push(newCourse);
  fs.writeFileSync('./src/data/courses.json', JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Course added successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

