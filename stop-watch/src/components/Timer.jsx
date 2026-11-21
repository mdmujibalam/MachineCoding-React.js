import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [second, setSecond] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  function handleStart() {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);
  }

  function handleStop() {
    setSecond(0);
    handlePause();
  }

  function handlePause() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function handleResume() {
    handleStart();
  }

  const getTime = () => {
    const hours = Math.trunc(second / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.trunc((second % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.trunc((second % 3600) % 60)
      .toString()
      .padStart(2, "0");

    return hours + " : " + mins + " : " + secs;
  };

  return (
    <div>
      <div className="btn-container">
        <button className="btn" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handleStop}>
          Stop
        </button>
        <button className="btn" onClick={handlePause}>
          Pause
        </button>
        <button className="btn" onClick={handleResume}>
          Resume
        </button>
      </div>

      <div className="time-container">{getTime()}</div>
    </div>
  );
};

export default Timer;
