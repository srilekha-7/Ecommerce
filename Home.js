import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { auth, provider } from "./Config";
import { signInWithPopup } from "firebase/auth";
import Products from "./Products";
function Home(props) {
  const [googleSignInUserVal, setGoogleSignInUserVal] = useState();
  const onSignUpWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setGoogleSignInUserVal(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setGoogleSignInUserVal(localStorage.getItem("email"));
  });
  return (
    <div>
      {googleSignInUserVal ? (
        <div style={{ backgroundColor: "white" }}>
          <Products />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(14, 10, 71, 0.963)",
            height: "100vh",
          }}
        >
          <div className="home-container">
            <h1
              style={{
                color: "white",
                fontFamily: "serif",
                fontStyle: "italic",
              }}
            >
              Shop now in TRND and get latest trends!!!
            </h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <img
                  src="https://img.freepik.com/free-photo/woman-posing-jumping-while-holding-shopping-bags_23-2148684543.jpg?w=360&t=st=1694670022~exp=1694670622~hmac=c74079bc512e7d5a0ebc8cac46337be1cad329595763d5d4f5f7a143912abc2d"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "28px",
                  border: "5px solid rgba(250, 158, 19, 0.963)",
                  borderRadius: "10px",
                  marginLeft: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "25px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Let's explore new TRND
                </p>

                <button className="button" onClick={onSignUpWithGoogle}>
                  SignUp with Google
                </button>

                <Link to="/sign-up">
                  <button className="button">SignUP Manually</button>
                </Link>

                <p style={{ color: "white", fontWeight: "bold" }}>
                  Already have an account?{" "}
                  <Link to="/sign-in">
                    <span style={{ color: "rgba(250, 158, 19, 0.963)" }}>
                      SignIn?
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
