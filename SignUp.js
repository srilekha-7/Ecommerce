import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Config";
import "./index.css";
function SignUpManually(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  // console.log(values);

  const onClickSignUp = () => {
    if (!values.username || !values.email || !values.password) {
      setErrorMsg("*Fill all fields");
      return;
    }
    setErrorMsg("");
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: values.username,
        });
        console.log(res);
        navigate("/sign-in", { replace: true });
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
        <h1 style={{ color: "white", fontFamily: "serif" }}> Sign Up</h1>
        <label style={{ color: "white", fontWeight: "bold" }}>Username</label>
        <input
          className="button"
          placeholder="username"
          value={values.username}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <label style={{ color: "white", fontWeight: "bold" }}>Email</label>
        <input
          className="button"
          placeholder="Email"
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
        <p className="error-msg">{errorMsg}</p>
        <button className="button" type="submit" onClick={onClickSignUp}>
          Sign up
        </button>

        <p style={{ color: "white", fontWeight: "bold" }}>
          Already have an account?
          <Link to="/sign-in">
            <span className="sign-up-text" color="rgba(14, 10, 71, 0.963)">
              {" "}
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpManually;
