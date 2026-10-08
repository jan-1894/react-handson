function Card({ student, onDelete, onEdit }) {
  return (
    <div className="student-card">
      <h2>{student.name}</h2>

      <p>
        <strong>Department:</strong> {student.department}
      </p>

      <p>
        <strong>Year:</strong> {student.year}
      </p>

      <p>
        <strong>CGPA:</strong> {student.cgpa}
      </p>

      <div className="card-buttons">
        <button
          className="edit-button"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;