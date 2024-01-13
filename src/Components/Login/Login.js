import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../Firebase/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) navigate("/");
      })
      .catch((error) => {
        console.error("Error registering:", error.message);
        alert(error.message);
      });
  };

  return (
    <div>
      <img
        className="Login_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt="amazon-logo"
      />
      <div className="Login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="Login_signInButton">
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use
          sale. Please see our privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="Login_registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
