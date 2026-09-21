import { useState, useEffect } from "react";
import Todo from "./Todo.jsx";

const TodoList = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {
    if (!text || !text.trim()) return;

    setTodos((prev) => {
      const newId = Date.now();
      const temp = [...prev];
      temp.push({ id: newId, label: text, status: "active" });
      return temp;
    });

    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTodo();
    }
  }

  function handleDeleteTodo(id) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  function handleMarkAsComplete(id) {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "completed" : "active",
            }
          : item
      )
    );
  }

  console.log("text==>", text);

  return (
    <div>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button className="add-btn" onClick={() => addTodo()}>
          Add+
        </button>
      </div>

      <div className="todo-container">
        {todos?.map((todo, index) => (
          <Todo
            key={todo?.id}
            label={todo.label}
            status={todo.status}
            deleteTodo={() => handleDeleteTodo(todo?.id)}
            markAsComplete={() => handleMarkAsComplete(todo?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
