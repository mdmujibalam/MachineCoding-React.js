import { useState, useEffect, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import useSessionStorage from "../hooks/useSessionStorage";

const Typeahead = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const cachedRef = useRef({});
  const { getFromSessionStorage, addInSessionStorage } = useSessionStorage();

  async function fetchProducts(signal) {
    try {
      const updatedQuery = debouncedQuery?.trim()?.toLowerCase();

      // if (cachedRef?.current[updatedQuery]) {
      // setProductList(cachedRef?.current?.[updatedQuery]);
      // console.log("Updated from cache");
      // return;
      // }

      if (getFromSessionStorage(updatedQuery)) {
        const data = getFromSessionStorage(updatedQuery);
        setProductList(data);
        return;
      }

      const url =
        updatedQuery === ""
          ? "https://dummyjson.com/products"
          : `https://dummyjson.com/products/search?q=${updatedQuery}`;
      const res = await fetch(url, { signal });
      const data = await res.json();
      setProductList(data?.products);
      // cachedRef.current[updatedQuery] = data?.products;
      addInSessionStorage(updatedQuery, data?.products);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("API Cancelled here");
      } else {
        console.log("Error occurred", error);
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetchProducts(signal);

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

  console.log("==>", debouncedQuery);

  return (
    <div>
      <div className="input-container">
        <input
          className="input-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div>
        {productList?.map((product) => (
          <div className="product-item" key={product.id}>
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typeahead;
