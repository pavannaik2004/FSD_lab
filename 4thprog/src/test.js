import React, { useState, useEffect } from "react";

const studlist = [
  { slno: 1, name: "stud1", usn: "rvce1", tmarks: 150 },
  { slno: 2, name: "stud2", usn: "rvce2", tmarks: 145 },
];

// Gets the student list as a prop
function StudentsTable({ students }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Student Name</th>
          <th>USN</th>
          <th>Total Marks</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.slno}>
            <th>{s.slno}</th>
            <th>{s.name}</th>
            <th>{s.usn}</th>
            <th>{s.tmarks}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Gets the add function as a prop
function StudentAddForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(Object.fromEntries(new FormData(e.target))); // { name, usn, tmarks }
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <input name="usn" placeholder="USN" />
      <input name="tmarks" placeholder="Total Marks" />
      <button>Add</button>
    </form>
  );
}

// Holds the state
export default function StudentListTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setStudents(studlist), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addStudent = (stud) =>
    setStudents((list) => [...list, { ...stud, slno: list.length + 1 }]);

  return (
    <>
      <hr />
      <StudentsTable students={students} />
      <hr />
      <StudentAddForm onAdd={addStudent} />
    </>
  );
}
