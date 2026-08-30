import { useState, useEffect, useRef } from "react";

const MultiSelectDropdown = ({ options }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  //Click Outside functionality
  useEffect(() => {
    function handleOutSideClick(e) {
      if (wrapperRef?.current && !wrapperRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleOutSideClick);

    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  // useEffect(() => {
  //   inputRef?.current?.focus();
  // }, []);

  function handleAddItem(item) {
    setSelected((prev) => [...prev, item]);
  }

  function handleRemoveItem(item) {
    setSelected((prev) => prev?.filter((o) => o?.id !== item?.id));
  }

  //console.log(query);

  const filteredOptions = options.filter(
    (item) =>
      item?.value?.toLowerCase()?.includes(query?.toLowerCase()) &&
      !selected?.some((s) => s?.id === item?.id),
  );

  return (
    <div className="wrapper-container" ref={wrapperRef}>
      <div className="selected-container">
        {selected?.map((item) => (
          <div className="selected-item" key={item?.id}>
            {item?.label}
            <span onClick={() => handleRemoveItem(item)}>X</span>
          </div>
        ))}
      </div>

      <div className="input-box-container">
        <input
          ref={inputRef}
          className="input-box"
          type="text"
          placeholder="Search here..."
          onFocus={() => setIsOpen(true)}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {isOpen && (
          <div className="dropdown-container">
            {filteredOptions?.map((item) => (
              <div
                key={item.id}
                className="dropdown-item"
                onClick={() => handleAddItem(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
