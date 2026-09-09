import { useState, useEffect } from "react";

const useDebounce = (query, delay = 600) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timerId);
  }, [query]);

  return debouncedQuery;
};

export default useDebounce;
