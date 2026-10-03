function StudentList({ students, totalStudents, onEdit, onDelete }) {
  // There are no students in the backend at all
  if (totalStudents === 0) {
    return (
      <p className="no-data">
        No students added yet. Use the form above to add a student.
      </p>
    );
  }

  // The search did not match any student
  if (students.length === 0) {
    return <p className="no-data">No student found</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Mobile Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
              <td>{student.semester}</td>
              <td>{student.mobile}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-delete"
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
