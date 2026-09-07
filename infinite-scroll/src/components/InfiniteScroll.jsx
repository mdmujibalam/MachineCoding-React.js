import { useState, useEffect, useRef } from "react";
import {PAGE_SIZE, STATUS} from "../utils/data";

export default function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState(STATUS.LOADING);
  const loadingRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  async function fetchProducts() {
    try {
      setStatus(STATUS.LOADING);
      const skip = PAGE_SIZE * (pageNumber - 1);
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
      );

      const data = await res.json();
      setProducts((prev) => [...prev, ...data.products]);
      console.log(data.products);

      if (skip + data.products.length >= data.total) {
        setHasMore(false);
      }
      setStatus(null);
    } catch (err) {
      setStatus(STATUS.ERROR);
      console.error("Error Occurred", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  useEffect(() => {
    const loaderElement = loadingRef.current;

    if (!hasMore || !loaderElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && status !== STATUS.LOADING) {
          setPageNumber((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "200px",
      }
    );

    observer.observe(loaderElement);

    return () => {
      observer.unobserve(loaderElement);

      observer.disconnect();
    };
  }, [status, hasMore]);

  return (
    <div>
      <div className="product-container">
        {products?.map((product, index) => {
          return (
            <div className="product-item" key={product?.id}>
              <div>{product.title}</div>
              <div>{product.description}</div>
            </div>
          );
        })}
      </div>

      <div className="loader" ref={loadingRef}>
        {status === STATUS.LOADING && "Loading..."}
        {!hasMore && "Sorry, You have reached the end"}
      </div>

      {status === STATUS.ERROR && <div className="error">Error Occurred</div>}
    </div>
  );
}
