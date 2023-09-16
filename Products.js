import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-dropdown";
import ProductsEl from "./ProductsEl";
import { Link } from "react-router-dom";
import "./index.css";
function Products(props) {
  // const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [productsData, setProductsData] = useState([]);
  const [filters, setFilters] = useState({});
  const [categoryFilterData, setCategoryFilterData] = useState([]);
  const [finalFilterData, setFinalFilterData] = useState([]);
  const [cartCount, setCartCount] = useState("0");
  const [cartList, setCartList] = useState([]);
  const [price, setPrice] = useState([]);
  const category = [
    "category",
    "smartphones",
    "laptops",
    "skincare",
    "groceries",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-watches",
    "womens-bags",
    "womens-jewellery",
  ];
  const priceRange = ["price range", "0-500", "500-1000", "1000-1500"];
  const onSelectCategory = () => {};
  useEffect(() => {
    const fetchedProductsData = fetch(
      "https://dummyjson.com/products?limit=100"
    )
      .then((res) => res.json())
      .then((data) => setProductsData(data.products));
  }, []);

  const handleCartCount = (count, newList, initialPrice) => {
    let cartCountVal = count;
    setCartCount(cartCountVal);
    console.log(count);
    setCartList(newList);
    setPrice(initialPrice);
  };

  useEffect(() => {
    let categoryFilter = productsData.filter(
      (eachProduct) => eachProduct.category === filters.category
    );
    setCategoryFilterData(categoryFilter);
    const tempCategoryFilterData = [...categoryFilterData];

    if (filters.priceRange === "0-500") {
      const priceFilter = tempCategoryFilterData.filter(
        (eachFilterData) =>
          parseInt(eachFilterData.price) > 0 &&
          parseInt(eachFilterData.price) <= 500
      );
      setFinalFilterData(priceFilter);
    } else if (filters.priceRange === "500-1000") {
      const priceFilter = tempCategoryFilterData.filter(
        (eachFilterData) =>
          parseInt(eachFilterData.price) >= 500 &&
          parseInt(eachFilterData.price) <= 1000
      );
      setFinalFilterData(priceFilter);
    } else if (filters.priceRange === "1000-1500") {
      const priceFilter = tempCategoryFilterData.filter(
        (eachFilterData) =>
          parseInt(eachFilterData.price) >= 1000 &&
          parseInt(eachFilterData.price) <= 1500
      );
      setFinalFilterData(priceFilter);
    }
  }, [filters.category, filters.priceRange]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontStyle: "italic",
          fontFamily: "serif",
          backgroundColor: "rgba(14, 10, 71, 0.963)",
          paddingLeft: "20px",
        }}
      >
        <h1 style={{ color: "rgba(250, 158, 19, 0.963)" }}>TRND</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1%",
            width: "auto",
          }}
        >
          <Link to={"/cart"} state={{ cartList: cartList, price: price }}>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{
                color: "rgba(250, 158, 19, 0.963)",
                padding: "15px",
                height: "30px",
              }}
            />
          </Link>
          <p
            style={{
              backgroundColor: "rgba(250, 158, 19, 0.963)",
              color: "rgba(14, 10, 71, 0.963)",
              fontWeight: "bold",
              padding: "3px",
              borderRadius: "50px",
              marginRight: "10px",
            }}
          >
            {cartCount}
          </p>

          <button className="know-more-button" onClick={logOutUser}>
            Log Out
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select
          style={{ width: "100px", padding: "10px", margin: "10px" }}
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        >
          {category.map((eachCategory) => (
            <option>{eachCategory}</option>
          ))}
        </select>

        <select
          style={{ width: "100px", padding: "10px", margin: "10px" }}
          value={filters.priceRange}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: e.target.value,
            }))
          }
        >
          {priceRange.map((eachCategory) => (
            <option>{eachCategory}</option>
          ))}
        </select>
      </div>

      <div>
        <ProductsEl
          finalFilterData={finalFilterData}
          productsData={productsData}
          handleCartCount={handleCartCount}
        />
      </div>
    </div>
  );
}

export default Products;
