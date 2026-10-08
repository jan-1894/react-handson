import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import useData from "../hooks/useData";
import students from "../data/data";

function Home() {
  const initialData = useData(students);

  const [studentData, setStudentData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newStudent, setNewStudent] = useState({
    name: "",
    department: "ECE",
    year: "3rd Year",
    cgpa: "",
  });

  const filteredStudents = studentData.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || student.department === department;

    return matchesSearch && matchesDepartment;
  });

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !newStudent.name ||
      !newStudent.department ||
      !newStudent.year ||
      !newStudent.cgpa
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId !== null) {
      setStudentData(
        studentData.map((student) =>
          student.id === editingId
            ? {
                ...student,
                name: newStudent.name,
                department: newStudent.department,
                year: newStudent.year,
                cgpa: Number(newStudent.cgpa),
              }
            : student
        )
      );

      setEditingId(null);
    } else {
      const student = {
        id: Date.now(),
        name: newStudent.name,
        department: newStudent.department,
        year: newStudent.year,
        cgpa: Number(newStudent.cgpa),
      };

      setStudentData([...studentData, student]);
    }

    setNewStudent({
      name: "",
      department: "ECE",
      year: "3rd Year",
      cgpa: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      setStudentData(
        studentData.filter((student) => student.id !== id)
      );
    }
  };

  const handleEdit = (student) => {
    setNewStudent({
      name: student.name,
      department: student.department,
      year: student.year,
      cgpa: student.cgpa,
    });

    setEditingId(student.id);
    setShowForm(true);
  };

  return (
    <div>
      <Navbar />

      <main>
        <h1>Student Details</h1>

        <div className="top-section">
          <div className="filters">
            <input
              type="text"
              placeholder="Search student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="ECE">ECE</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
            </select>
          </div>

          <button
            className="add-button"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setNewStudent({
                name: "",
                department: "ECE",
                year: "3rd Year",
                cgpa: "",
              });
            }}
          >
            {showForm ? "Close Form" : "+ Add Student"}
          </button>
        </div>

        {showForm && (
          <form className="student-form" onSubmit={handleSubmit}>
            <h2>
              {editingId !== null
                ? "Edit Student"
                : "Add New Student"}
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={handleChange}
            />

            <select
              name="department"
              value={newStudent.department}
              onChange={handleChange}
            >
              <option value="ECE">ECE</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
            </select>

            <select
              name="year"
              value={newStudent.year}
              onChange={handleChange}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <input
              type="number"
              name="cgpa"
              placeholder="CGPA"
              min="0"
              max="10"
              step="0.1"
              value={newStudent.cgpa}
              onChange={handleChange}
            />

            <button type="submit">
              {editingId !== null ? "Update Student" : "Add Student"}
            </button>
          </form>
        )}

        <div className="card-container">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <p className="no-result">No student found.</p>
        )}
      </main>
    </div>
  );
}

export default Home;