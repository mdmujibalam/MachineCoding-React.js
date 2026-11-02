import { useState, useEffect, useRef } from "react";
import {PAGE_SIZE, STATUS} from "../utils/data";

const Product = ({ product }) => {
  return (
    <div className="product-item">
      <div>{product.title}</div>
      <div>{product.description}</div>
    </div>
  );
};

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [status, setStatus] = useState(STATUS.LOADING);
  const sentinelRef = useRef(null);

  console.log("products==>", products);

  useEffect(() => {
    setStatus(STATUS.LOADING);

    const skip = (pageNumber - 1) * PAGE_SIZE;
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`, {
      signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error : ${res.status}`);

        return res.json();
      })
      .then((data) => {
        setProducts((prev) => [...prev, ...(data?.products || [])]);
        setStatus(STATUS.IDLE);

        if (skip + PAGE_SIZE >= data.total) setHasMore(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus(STATUS.ERROR);
      });

    return () => abortController.abort();
  }, [pageNumber, retryCount]);

  useEffect(() => {
    const loaderElement = sentinelRef.current;

    if (!loaderElement || !hasMore || status !== STATUS.IDLE) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => prev + 1);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "200px",
      }
    );

    observer.observe(loaderElement);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, status]);

  return (
    <div>
      <div className="products-container">
        {products?.map((product, index) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

      <div className="loader-container">
        {status === STATUS.LOADING && <span>Loading...</span>}

        {status === STATUS.ERROR && (
          <span>
            Something went wrong.{" "}
            <button onClick={() => setRetryCount((c) => c + 1)}>Retry</button>
          </span>
        )}

        {!hasMore &&
          status === STATUS.IDLE &&
          (products.length === 0
            ? "No products found."
            : "You've reached the end.")}
      </div>
    </div>
  );
};

export default InfiniteScroll;

