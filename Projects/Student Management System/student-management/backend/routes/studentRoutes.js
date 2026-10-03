const express = require("express");
const router = express.Router();

/*
 * In-memory "database".
 * There is NO real database in this project. All students are stored in
 * this JavaScript array, so the data resets every time the server restarts.
 */
let students = [
  {
    id: 101,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    branch: "CSE",
    semester: 3,
    mobile: "9876543210",
  },
  {
    id: 102,
    name: "Priya Patel",
    email: "priya@gmail.com",
    branch: "IT",
    semester: 5,
    mobile: "8765432109",
  },
  {
    id: 103,
    name: "Aman Verma",
    email: "aman@gmail.com",
    branch: "ECE",
    semester: 1,
    mobile: "7654321098",
  },
];

const ALLOWED_BRANCHES = ["CSE", "CS", "IT", "ECE"];

// Validates the request body and returns an error message, or null if valid.
// "currentId" is the ID of the student being updated (null when adding).
function validateStudent(body, currentId) {
  const { id, name, email, branch, semester, mobile } = body;

  // All fields are required
  if (
    id === undefined ||
    id === null ||
    String(id).trim() === "" ||
    !name ||
    String(name).trim() === "" ||
    !email ||
    String(email).trim() === "" ||
    !branch ||
    semester === undefined ||
    semester === null ||
    String(semester).trim() === "" ||
    !mobile ||
    String(mobile).trim() === ""
  ) {
    return "All fields are required";
  }

  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return "Student ID must be a positive number";
  }

  // Student ID must be unique
  // (the student being edited is allowed to keep its own ID)
  const existing = students.find((s) => s.id === numericId);
  if (existing && existing.id !== currentId) {
    return "Student ID already exists";
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(String(email).trim())) {
    return "Invalid email format";
  }

  if (!ALLOWED_BRANCHES.includes(branch)) {
    return "Branch must be one of CSE, CS, IT, ECE";
  }

  const numericSemester = Number(semester);
  if (
    !Number.isInteger(numericSemester) ||
    numericSemester < 1 ||
    numericSemester > 8
  ) {
    return "Semester must be between 1 and 8";
  }

  if (!/^\d{10}$/.test(String(mobile).trim())) {
    return "Mobile number must contain exactly 10 digits";
  }

  return null;
}

// GET /api/students - get all students
router.get("/", (req, res) => {
  res.json(students);
});

// GET /api/students/:id - get one student by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// POST /api/students - add a new student
router.post("/", (req, res) => {
  const error = validateStudent(req.body, null);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const newStudent = {
    id: Number(req.body.id),
    name: String(req.body.name).trim(),
    email: String(req.body.email).trim(),
    branch: req.body.branch,
    semester: Number(req.body.semester),
    mobile: String(req.body.mobile).trim(),
  };

  students.push(newStudent);
  res
    .status(201)
    .json({ message: "Student added successfully", student: newStudent });
});

// PUT /api/students/:id - update an existing student
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  // While editing, the ID in the body matches the ID in the URL
  const body = {
    ...req.body,
    id: req.body.id !== undefined ? req.body.id : id,
  };

  const error = validateStudent(body, id);
  if (error) {
    return res.status(400).json({ message: error });
  }

  students[index] = {
    id: Number(body.id),
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    branch: body.branch,
    semester: Number(body.semester),
    mobile: String(body.mobile).trim(),
  };

  res.json({ message: "Student updated successfully", student: students[index] });
});

// DELETE /api/students/:id - delete a student
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];
  res.json({ message: "Student deleted successfully", student: deletedStudent });
});

module.exports = router;
