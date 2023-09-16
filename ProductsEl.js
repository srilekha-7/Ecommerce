import React, { useEffect, useState } from "react";
import "./index.css";

function ProductsEl(props) {
  const { productsData, finalFilterData, handleCartCount } = props;
  const [initialPrice, setInitialPrice] = useState([]);
  const [count, setCount] = useState(1);
  const [updateProductsData, setUpdateProductsData] = useState([]);
  const [cartEl, setCartEl] = useState([]);

  useEffect(() => {
    setUpdateProductsData(productsData);

    if (updateProductsData.length !== 0) {
      for (let i = 0; i < updateProductsData.length; i++) {
        updateProductsData[i].cart = false;
        updateProductsData[i].quantity = 0;
        setUpdateProductsData(updateProductsData);
      }
    }

    console.log("useeffect is called");
  }, [productsData]);

  const onHandleCart = (id) => {
    setCount(count + 1);
    console.log(count);
    handleCartCount(count, newList, newPriceList);
    const tempProductsData = [...updateProductsData];
    for (let i = 0; i < updateProductsData.length; i++) {
      if (tempProductsData[i].id === id) {
        setInitialPrice(initialPrice.concat(tempProductsData[i].price));
        tempProductsData[i].quantity = tempProductsData[i].quantity + 1;
        if (tempProductsData[i].cart === true) {
          tempProductsData[i].cart = false;
        } else {
          tempProductsData[i].cart = true;
        }
      }
    }
    setUpdateProductsData(tempProductsData);

    const selectedProduct = updateProductsData.filter(
      (eachUpdatedProduct) => eachUpdatedProduct.id === id
    );

    setCartEl(cartEl.concat(selectedProduct[0]));
  };

  var newList = [];
  newList = cartEl.filter(function (ele, pos) {
    return cartEl.indexOf(ele) === pos;
  });

  var newPriceList = [];
  newPriceList = initialPrice.filter(function (ele, pos) {
    return initialPrice.indexOf(ele) === pos;
  });
  return (
    <div>
      {finalFilterData.length !== 0 ? (
        <div className="card">
          {finalFilterData.map((eachProduct) => {
            return (
              <div
                key={eachProduct.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  padding: "20px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  margin: "10px",
                  width: "30vh",
                }}
              >
                <img
                  src={eachProduct.images[0]}
                  alt=""
                  style={{ height: "70%", width: "100%" }}
                />

                <p
                  style={{
                    color: "rgb(78, 76, 76)",
                    fontSize: "15px",
                    fontFamily: "serif",
                  }}
                >
                  {eachProduct.title}
                </p>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      color: "rgba(14, 10, 71, 0.963)",
                      fontWeight: "bold",
                      fontSize: "15px",
                      fontFamily: "serif",
                    }}
                  >
                    ${eachProduct.price}
                  </p>
                  <button
                    className="cart"
                    onClick={() => onHandleCart(eachProduct.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          {productsData.map((eachProduct) => {
            return (
              <div
                key={eachProduct.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  padding: "20px",
                  boxShadow:
                    " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  margin: "10px",
                  width: "30vh",
                }}
              >
                <img
                  src={eachProduct.images[0]}
                  alt=""
                  style={{ height: "80%", width: "80%" }}
                />

                <p
                  style={{
                    color: "rgb(78, 76, 76)",
                    fontSize: "15px",
                    fontFamily: "serif",
                  }}
                >
                  {eachProduct.title}
                </p>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      color: "rgba(14, 10, 71, 0.963)",
                      fontWeight: "bold",
                      fontSize: "15px",
                      fontFamily: "serif",
                    }}
                  >
                    ${eachProduct.price}
                  </p>
                  <button
                    className="cart"
                    onClick={() => onHandleCart(eachProduct.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductsEl;
