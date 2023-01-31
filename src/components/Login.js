import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("OK");
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token to redirect
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("You logged in successfully", "success");
    } 
    else {
      props.showAlert("Please enter valid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
    <h2 className="mb-4">Login to continue using iNotebook</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          value={credential.email}
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          value={credential.password}
          className="form-control"
          id="password"
          name="password"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  );
};

export default Login;
