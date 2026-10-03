import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchStudent from "./components/SearchStudent";
import { API_BASE_URL } from "./api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]); // all students from the backend
  const [editingStudent, setEditingStudent] = useState(null); // student being edited (null = add mode)
  const [searchQuery, setSearchQuery] = useState(""); // text typed in the search bar
  const [message, setMessage] = useState({ type: "", text: "" }); // success / error message

  // Fetch all students from the backend
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Could not connect to the server. Please make sure the backend is running.",
      });
    }
  };

  // Load students once when the page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // Called when the "Edit" button of a row is clicked
  const handleEdit = (student) => {
    setEditingStudent(student);
    setMessage({ type: "", text: "" });
    window.scrollTo(0, 0);
  };

  // Called after the form is saved so the table refreshes automatically
  const handleSaved = () => {
    setEditingStudent(null);
    fetchStudents();
  };

  // Called when the "Delete" button of a row is clicked
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        if (editingStudent && editingStudent.id === id) {
          setEditingStudent(null);
        }
        fetchStudents(); // refresh the list
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Could not connect to the server." });
    }
  };

  // Filter students for the search bar.
  // Search works by Student ID or Name (name search is case-insensitive).
  const query = searchQuery.trim().toLowerCase();
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      String(student.id).includes(query)
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Student Management System</h1>
      </header>

      <main className="content">
        <section>
          <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}

          <StudentForm
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            onSaved={handleSaved}
            setMessage={setMessage}
          />
        </section>

        <section>
          <h2>Student List</h2>

          <SearchStudent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <StudentList
            students={filteredStudents}
            totalStudents={students.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
