import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError(err);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
      } catch (err) {
        console.error('Failed to fetch teachers:', err);
        setError(err);
      }
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <div>Error: {error.message}</div>}
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.cn}>{student.cn} - {student.mail}</li>
        ))}
      </ul>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.cn}>{teacher.cn} - {teacher.mail}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
