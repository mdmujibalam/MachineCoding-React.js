import { useState, useEffect } from "react";
const PAGE_SIZE = 10;

const Pagination = () => {
  const [productsList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  async function fetchProducts(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProductList(data?.products);
    } catch (err) {
      console.log("error occurred", err);
    }
  }

  useEffect(() => {
    fetchProducts("https://dummyjson.com/products?limit=200");
  }, []);

  function handleClick(pageNo) {
    setPageNumber(pageNo);
  }

  function handleClickPrev() {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }

  function handleClickNext() {
    setPageNumber((prev) => Math.min(totalPages, prev + 1));
  }

  const totalPages = Math.ceil(productsList?.length / PAGE_SIZE);
  const start = (pageNumber - 1) * PAGE_SIZE;
  const end = pageNumber * PAGE_SIZE;
  const paginatedList = productsList?.slice(start, end);

  if (productsList?.length == 0) {
    return <div>No Products Found</div>;
  }

  return (
    <div className="main-container">
      <div className="product-grid">
        {paginatedList?.map((item) => (
          <div className="product-item">
            <div className="image-container">
              <img
                src={item?.thumbnail}
                alt={item.title}
                className="image-element"
              />
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* <div className="pagination-container">
        <button
          onClick={handleClickPrev}
          className="prev-btn"
          disabled={pageNumber == 1}
        >
          prev
        </button>
        {Array.from({ length: totalPages })?.map((item, index) => (
          <div
            className={
              pageNumber == index + 1
                ? "active paginated-item"
                : "paginated-item"
            }
            onClick={(e) => handleClick(index + 1)}
          >
            {index + 1}
          </div>
        ))}
        <button
          onClick={handleClickNext}
          className="next-btn"
          disabled={pageNumber == totalPages}
        >
          Next
        </button>
      </div> */}

      <div className="pagination-container">
        <button
          onClick={handleClickPrev}
          className="prev-btn"
          disabled={pageNumber == 1}
        >
          prev
        </button>
        {/* {Array.from({ length: totalPages })?.map((item, index) => (
          <div
            key={index}
            className={
              pageNumber == index + 1
                ? "active paginated-item"
                : "paginated-item"
            }
            onClick={(e) => handleClick(index + 1)}
          >
            {index + 1}
          </div>
        ))} */}
        {getPagination(pageNumber, totalPages)?.map((item, index) =>
          item === "..." ? (
            <div key={item}>...</div>
          ) : (
            <div
              key={`${item}-${index}`}
              onClick={(e) => handleClick(item)}
              className={
                pageNumber == item ? "active paginated-item" : "paginated-item"
              }
            >
              {item}
            </div>
          )
        )}
        <button
          onClick={handleClickNext}
          className="next-btn"
          disabled={pageNumber == totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

function getPagination(currPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  } else if (currPage <= 5) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  } else if (currPage > 5 && currPage <= totalPages - 4 ){
    return [1, "...", currPage - 1, currPage, currPage + 1, "...", totalPages];
  } else
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
}

export default Pagination;
