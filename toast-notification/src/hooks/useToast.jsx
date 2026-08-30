import { useState, useEffect, useRef } from "react";
import Toast from "../components/Toast";

function useToast(delay, alignment = "top-right") {
  const [list, setList] = useState([]);
  const timerRef = useRef({});

  function createToast(item) {
    const id = Date.now();
    const updatedItem = { ...item, id };

    setList((prev) => [...prev, updatedItem]);

    timerRef.current[id] = setTimeout(() => {
      setList((prev) => prev.filter((currItem) => currItem.id !== id));
      delete timerRef.current[id];
    }, delay);
  }

  function deleteToast(id) {
    clearTimeout(timerRef.current[id]);
    setList((prev) => prev.filter((currItem) => currItem.id !== id));
    delete timerRef.current[id];
  }

  const ToastComponent = () => {
    return (
      <div className={`toast-stack ${alignment}`}>
        {list?.map((item, index) => (
          <Toast
            key={item.id}
            type={item.type}
            message={item.message}
            onDelete={() => deleteToast(item.id)}
          />
        ))}
      </div>
    );
  };

  return { createToast, ToastComponent };
}

export default useToast;
