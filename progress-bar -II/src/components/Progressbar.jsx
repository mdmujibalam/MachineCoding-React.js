import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 500);

    return () => clearInterval(timerId);
  }, [progress]);

  return (
    <div className="progress-wrapper">
      <div className="progressBar-container">
        <div
          className={
            progress < 40
              ? "progress red"
              : progress < 80
              ? "progress orange"
              : "progress green"
          }
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: "left",
          }}
        ></div>
        <span className="progress-text">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
