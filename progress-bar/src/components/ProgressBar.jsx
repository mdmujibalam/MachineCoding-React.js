import { useState, useEffect } from "react";

const ProgressBar = ({ maxWidth }) => {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    setFilled(maxWidth);
  }, []);

  return (
    <div className="progressBar">
      <div
        className="progress-filled"
        style={{
          transform: `scaleX(${filled / 100})`,
          transformOrigin: "left",
        }}
      ></div>
      <span className="progress-text">{maxWidth}%</span>
    </div>
  );
};

export default ProgressBar;
