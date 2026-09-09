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
      delete timerRef.current[id];  // freeing memory for timerId to avoid memory leak
    }, delay);
  }

  function deleteToast(id) {
    clearTimeout(timerRef.current[id]);//cancelling timer
    setList((prev) => prev.filter((currItem) => currItem.id !== id)); // delete toast from list
    delete timerRef.current[id]; // freeing memory for timerId to avoid memory leak
  }

  useEffect(()=>{

    return () =>{
      // for(const timerId in timerRef.current){
      //   clearTimeout(timerRef.current[timerId]);
      // }

      const timerIds= Object.values(timerRef.current);

      timerIds.forEach((timerId)=>{
        clearTimeout(timerId);
      })
    }
  }, []);

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
