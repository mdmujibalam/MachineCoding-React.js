import { useState, useEffect, useRef } from "react";

const MAX_CONCURRENT = 4;

export default function ProgressBarIV() {
  const [bar, setBar] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  function addProgressBar() {
    setBar((prev) => [...prev, prev.length]);
  }

  function handleComplete() {
    setCompletedCount((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={addProgressBar}>Add</button>

      <div className="progressBar-container">
        {bar?.map((node, index) => (
          <ProgressBar
            key={node}
            isActive={index < completedCount + MAX_CONCURRENT}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ isActive, onComplete }) {
  const [progress, setProgress] = useState(0);

  // Run the timer only while this bar is the active one
  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 1));
    }, 20);

    return () => clearInterval(timerId);
  }, [isActive]);

  useEffect(() => {
    if (progress === 100) onComplete();
  }, [progress]);

  return (
    <div className="progressBar">
      <div
        className="filledProgress"
        style={{ transform: `scaleX(${progress / 100})` }}
      ></div>

      <div className="textProgress">{progress}%</div>
    </div>
  );
}