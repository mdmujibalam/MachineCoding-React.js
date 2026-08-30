import { useState, useEffect, useRef } from "react";

const OTPInput = ({ size = 6 }) => {
  const [inputArr, setInputArr] = useState(
    Array.from({ length: size }).fill(""),
  );

  const inputRef = useRef({});

  useEffect(() => {
    if (inputArr.every((val) => val !== "")) {
      console.log("OTP Entered: ", inputArr.join(""));
    }
  }, [inputArr]);

  useEffect(() => {
    inputRef?.current?.[0]?.focus();
  }, []);

  function handleInputChange(e, index) {
    const value = e.target.value.trim().slice(-1);

    if (isNaN(value) || value === "") return;

    setInputArr((prev) => {
      const temp = [...prev];
      temp[index] = value;
      return temp;
    });

    inputRef?.current?.[index + 1]?.focus();
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      // if (inputArr[index] == "") {
      //   inputRef?.current?.[index - 1]?.focus();
      // } else {
      //   setInputArr((prev) => {
      //     const temp = [...prev];
      //     temp[index] = "";
      //     return temp;
      //   });
      // }

      setInputArr((prev) => {
        const temp = [...prev];
        temp[index] = "";
        return temp;
      });

      inputRef?.current?.[index - 1]?.focus();
    }
  }

  return (
    <div className="input-container">
      {Array.from({ length: size })?.map((_, index) => (
        <input
          className="input-box"
          ref={(ref) => (inputRef.current[index] = ref)}
          key={index}
          type="text"
          value={inputArr[index]}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
