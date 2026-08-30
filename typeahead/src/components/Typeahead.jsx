import { useState, useEffect, useMemo } from "react";
import useDebounce from "../hooks/useDebounce.jsx";

const Typeahead = () => {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  async function fetchData(url) {
    try {
      const data = await fetch(url);
      const response = await data.json();
      setProductList(response?.products);
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    fetchData("https://dummyjson.com/products?limit=200");
  }, []);

  // console.log(productList);
  //console.log(query);

  const filteredList = useMemo(() => {
    if (debouncedQuery === "") return [];

    const list = productList?.filter((item) =>
      item?.title?.toLowerCase()?.includes(debouncedQuery?.toLowerCase()),
    );

    //console.log("calculeted");

    return list;
  }, [debouncedQuery, productList]);

  return (
    <div>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your text here..."
        />
      </div>

      <div className="item-contianer">
        <div className="item">
          <div className="header item-cell">Title</div>
          <div className="header item-cell">Price</div>
          <div className="header item-cell">Rating</div>
          <div className="header item-cell">Category</div>
        </div>

        {filteredList?.map((item, index) => (
          <div className="item" key={item?.id}>
            <div className="item-cell">{item?.title}</div>
            <div className="item-cell">${item?.price}</div>
            <div className="item-cell">{item?.rating}</div>
            <div className="item-cell">{item?.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typeahead;
