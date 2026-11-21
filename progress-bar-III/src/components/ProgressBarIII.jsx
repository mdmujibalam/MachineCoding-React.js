import { useState, useEffect, useRef } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  function handleStart() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 1));
    }, 100);
  }

  function handlePause() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function handleReset() {
    setProgress(0);
    handlePause();
  }

  return (
    <div>
      <div className="btn-container">
        <button className="btn" onClick={handleStart}>
          Start
        </button>
        <button className="btn" onClick={handlePause}>
          Pause
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="progressBar">
        <div
          className="filledProgress"
          style={{ transform: `scaleX(${progress / 100})` }}
        ></div>

        <div className="textProgress">{progress}%</div>
      </div>
    </div>
  );
}

export default ProgressBar;