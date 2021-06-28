import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export const LoginForm = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    props.history.push("/messenger");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [err, setErr] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 5) {
      setValidationMessage("Password must at least 5 character long.");
      setTimeout(() => {
        setValidationMessage("");
      }, 3000);
      return;
    }
    axios
      .post("/api/auth", {
        email,
        password,
      })
      .then(function (response) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        props.history.push("/messenger");
      })
      .catch(function (error) {
        console.log(error);
        setErr("Invalid user name or password");
        setTimeout(() => {
          setErr("");
        }, 3000);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="LoginForm__form">
        {err && <div className="ErrorBox">{err}</div>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </p>
        {validationMessage}
        <button
          type="submit"
          disabled={!email || !password}
          onClick={submitHandler}
        >
          Login
        </button>

        <p>New to Messenger? Register now...👇</p>
        <Link to="/register">🚩Register</Link>
      </form>
    </div>
  );
};
