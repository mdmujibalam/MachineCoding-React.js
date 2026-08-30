import useToast from "./hooks/useToast";
import "./App.css";

function App() {
  const { createToast, ToastComponent } = useToast(8000, "bottom-right");

  function handleToast(type, message) {
    const toast = {
      type,
      message,
    };
    createToast(toast);
  }

  return (
    <div className="App">
      <div className="btn-container">
        <button onClick={() => handleToast("success", "This is success Toast")}>
          Success Toast
        </button>
        <button onClick={() => handleToast("error", "This is error Toast")}>
          Error Toast
        </button>
        <button onClick={() => handleToast("info", "This is info Toast")}>
          Info Toast
        </button>
        <button onClick={() => handleToast("warning", "This is warning Toast")}>
          Warning Toast
        </button>
      </div>

      <ToastComponent />
    </div>
  );
}

export default App;
