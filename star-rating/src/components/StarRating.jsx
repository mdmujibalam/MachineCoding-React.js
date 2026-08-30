import { useState } from "react";

const StarRating = () => {
  const [starIndex, setStarIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  function handleClick(index) {
    setStarIndex(index);
  }

  function handleMouseEnter(index) {
    setHoverIndex(index);
  }

  function handleMouseLeave() {
    setHoverIndex(-1);
  }

  const activeIndex = hoverIndex > -1 ? hoverIndex : starIndex;

  return (
    <div className="main-container " onMouseLeave={() => handleMouseLeave()}>
      <div className="star-rating-container">
        {Array.from({ length: 10 })?.map((_, index) => (
          <span
            key={index}
            className={index <= activeIndex ? "golden" : "grey"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            ★
          </span>
        ))}
      </div>

      <div>Hover Index :{hoverIndex + 1}</div>
      <div>Rating :{starIndex + 1}</div>
    </div>
  );
};

export default StarRating;
