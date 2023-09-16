import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Config";

import "./index.css";
import { signInWithEmailAndPassword } from "firebase/auth";
function SignIn(props) {
  const [userName, setUserName] = useState("");
  const [values, setValues] = useState({ email: "", password: "" });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  const onClickLogin = () => {
    if (!values.email || !values.password) {
      setErrorMsg("*Fill all fields");
      return;
    }
    setErrorMsg("");
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        // console.log(res);
        navigate("/products", { replace: true });
      })
      .catch((err) => {
        setErrorMsg(err.message);
        // console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        margin: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(250, 158, 19, 0.963)",
          height: "100%",
          justifyContent: "center",
          alignItem: "center",
          padding: "30px",
        }}
      >
        {userName ? (
          <h2
            style={{ color: "white", fontFamily: "serif" }}
          >{`Login ${userName}`}</h2>
        ) : (
          <>
            <h2 style={{ color: "white", fontFamily: "serif" }}>Login</h2>
          </>
        )}

        <label style={{ color: "white", fontWeight: "bold" }}>E-mail</label>
        <input
          className="button"
          placeholder="email"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label style={{ color: "white", fontWeight: "bold" }}>Password</label>
        <input
          placeholder="password"
          type="password"
          className="button"
          value={values.password}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button className="button" type="submit" onClick={onClickLogin}>
          Login
        </button>
        <p className="error-msg">{errorMsg}</p>

        <p style={{ color: "white", fontWeight: "bold" }}>
          New User?
          <Link to="/">
            <span className="sign-up-text" color="rgba(14, 10, 71, 0.963)">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
