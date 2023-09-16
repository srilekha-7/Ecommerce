import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { requirePropFactory } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Cart(props) {
  const location = useLocation();
  const cartData = location.state.cartList;
  const price = location.state.price;
  const [productPrice, setProductPrice] = useState(price);
  const [subTotal, setSubTotal] = useState(0);
  const [filters, setFilters] = useState([]);
  const [receivedCartData, setReceivedCartData] = useState(cartData);
  const payment = ["Offline", "Online"];
  const onClickDecrease = (id) => {
    const tempCartData = [...receivedCartData];
    let tempCost = 0;
    if (tempCartData.length !== 0) {
      for (let i = 0; i < tempCartData.length; i++) {
        if (tempCartData[i].id === id) {
          if (tempCartData[i].quantity > 1) {
            tempCartData[i].quantity = tempCartData[i].quantity - 1;
            tempCartData[i].price = tempCartData[i].quantity * productPrice[i];
          }
        }
      }
    }
    setReceivedCartData(tempCartData);
  };

  const onClickIncrease = (id) => {
    const tempCartData = [...receivedCartData];
    if (tempCartData.length !== 0) {
      for (let i = 0; i < tempCartData.length; i++) {
        if (tempCartData[i].id === id) {
          if (tempCartData[i].quantity >= 1) {
            tempCartData[i].quantity = tempCartData[i].quantity + 1;
            tempCartData[i].price = tempCartData[i].quantity * productPrice[i];
          }
        }
      }
    }
    setReceivedCartData(tempCartData);
  };
  const onHandleRemove = (id) => {
    const cartAfterOnHandleRemove = receivedCartData.filter(
      (eachCart) => eachCart.id !== id
    );
    setReceivedCartData(cartAfterOnHandleRemove);
  };

  useEffect(() => {
    const cartFinalUpdate = [...receivedCartData];
    for (let i = 0; i < cartFinalUpdate.length; i++) {
      cartFinalUpdate[i].price = productPrice[i] * cartFinalUpdate[i].quantity;
      setReceivedCartData(cartFinalUpdate);
      setSubTotal(subTotal + receivedCartData[i].price);
    }
  }, []);

  console.log(receivedCartData);

  useEffect(() => {
    let subTotalSum = 0;
    for (let i = 0; i < receivedCartData.length; i++)
      subTotalSum = subTotalSum + receivedCartData[i].price;
    setSubTotal(subTotalSum);
  }, [receivedCartData]);
  console.log(subTotal);
  return (
    <div style={{ display: "flex" }}>
      <div>
        {receivedCartData.length !== 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "5%",
              height: "100%",
            }}
          >
            {receivedCartData.map((eachCartEl) => {
              return (
                <div
                  key={eachCartEl.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",

                    padding: "20px",
                    boxShadow:
                      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    margin: "10px",
                    width: "100vh",
                  }}
                >
                  <img
                    src={eachCartEl.images[0]}
                    alt=""
                    style={{ height: "50vh", width: "50vh" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "20px",
                    }}
                  >
                    <h2
                      style={{
                        color: "rgba(14, 10, 71, 0.963)",

                        fontFamily: "serif",
                      }}
                    >
                      {eachCartEl.title}
                    </h2>
                    <p
                      style={{
                        color: "rgb(78, 76, 76)",
                        fontSize: "15px",
                        fontFamily: "serif",
                      }}
                    >
                      {eachCartEl.description}
                    </p>
                    <p
                      style={{
                        color: "rgb(78, 76, 76)",
                        fontSize: "15px",
                        fontFamily: "serif",
                      }}
                    >
                      Brand: {eachCartEl.brand}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          color: "rgba(14, 10, 71, 0.963)",
                          fontWeight: "bold",
                          fontSize: "15px",
                          fontFamily: "serif",
                        }}
                      >
                        ${eachCartEl.price}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => onClickDecrease(eachCartEl.id)}
                          style={{
                            backgroundColor: "rgba(250, 158, 19, 0.963)",
                            height: "20px",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          -
                        </button>
                        <p
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            color: "rgba(14, 10, 71, 0.963)",
                            fontWeight: "bold",
                            fontSize: "15px",
                            fontFamily: "serif",
                          }}
                        >
                          {eachCartEl.quantity}
                        </p>
                        <button
                          onClick={() => onClickIncrease(eachCartEl.id)}
                          style={{
                            backgroundColor: "rgba(250, 158, 19, 0.963)",
                            height: "20px",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="cart"
                      onClick={() => onHandleRemove(eachCartEl.id)}
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
          margin: "6%",
          height: "100%",
          padding: "20px",
          // position: "absolute",
          // position: "fixed",
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <h1
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            fontFamily: "serif",
            color: "rgba(14, 10, 71, 0.963)",
          }}
        >
          Checkout
        </h1>
        <p style={{ fontWeight: "bold", color: "rgba(14, 10, 71, 0.963)" }}>
          {" "}
          Sub Total: {subTotal}
        </p>
        <p style={{ fontWeight: "bold", color: "rgba(14, 10, 71, 0.963)" }}>
          Shipping: $20
        </p>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            color: "rgba(14, 10, 71, 0.963)",
          }}
        >
          <p>Payment Details</p>
          <select
            style={{ width: "100px", padding: "10px", margin: "10px" }}
            value={filters.mode}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            {payment.map((eachPayment) => (
              <option>{eachPayment}</option>
            ))}
          </select>
        </div>
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "rgba(14, 10, 71, 0.963)",
          }}
        >
          Total: {subTotal - 20}
        </p>
      </div>
    </div>
  );
}

export default Cart;
