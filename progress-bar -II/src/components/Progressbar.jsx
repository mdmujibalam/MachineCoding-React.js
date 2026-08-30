import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 100);

    return () => clearTimeout(timerId);
  }, [progress]);

  return (
    <div>
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
