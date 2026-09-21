const Todo = ({ label, status, deleteTodo, markAsComplete }) => {
  return (
    <div className="todo-item">
      <div className={status === "completed" ? "markComplete" : ""}>
        {label}
      </div>
      <div>
        <span onClick={deleteTodo}>
          <img
            className="todo-img"
            src="data:image/png;base64,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"
            alt="delete-icon"
          />
        </span>
        <input
          type="checkbox"
          checked={status === "completed"}
          onChange={markAsComplete}
        />
      </div>
    </div>
  );
};

export default Todo;
