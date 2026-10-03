import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

const emptyForm = {
  id: "",
  name: "",
  email: "",
  branch: "CSE",
  semester: "",
  mobile: "",
};

// This same form is used for both adding and editing students.
function StudentForm({ editingStudent, setEditingStudent, onSaved, setMessage }) {
  const [formData, setFormData] = useState(emptyForm);

  // When "Edit" is clicked, fill the form with that student's data
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        id: editingStudent.id,
        name: editingStudent.name,
        email: editingStudent.email,
        branch: editingStudent.branch,
        semester: editingStudent.semester,
        mobile: editingStudent.mobile,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Client-side validation before sending data to the backend
  const validateForm = () => {
    if (
      String(formData.id).trim() === "" ||
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.branch === "" ||
      String(formData.semester).trim() === "" ||
      formData.mobile.trim() === ""
    ) {
      return "All fields are required";
    }
    if (isNaN(Number(formData.id)) || Number(formData.id) <= 0) {
      return "Student ID must be a positive number";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address";
    }
    const semester = Number(formData.semester);
    if (semester < 1 || semester > 8) {
      return "Semester must be between 1 and 8";
    }
    if (!/^\d{10}$/.test(formData.mobile.trim())) {
      return "Mobile number must contain exactly 10 digits";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const studentData = {
      id: Number(formData.id),
      name: formData.name.trim(),
      email: formData.email.trim(),
      branch: formData.branch,
      semester: Number(formData.semester),
      mobile: formData.mobile.trim(),
    };

    try {
      // Add -> POST, Edit -> PUT (same form for both)
      const url = editingStudent
        ? `${API_BASE_URL}/${editingStudent.id}`
        : API_BASE_URL;
      const method = editingStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        setFormData(emptyForm);
        onSaved(); // refresh the table and go back to add mode
      } else {
        // Backend validation error (e.g. duplicate Student ID)
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Could not connect to the server. Please make sure the backend is running.",
      });
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingStudent(null);
    setMessage({ type: "", text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="id">Student ID</label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g. 101"
            disabled={editingStudent !== null} // ID cannot be changed while editing
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          >
            <option value="CSE">CSE</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester</label>
          <input
            type="number"
            id="semester"
            name="semester"
            min="1"
            max="8"
            value={formData.semester}
            onChange={handleChange}
            placeholder="1 to 8"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10 digit mobile number"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-add">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
          {editingStudent && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default StudentForm;
