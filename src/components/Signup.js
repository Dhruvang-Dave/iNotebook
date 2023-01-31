import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [identity, setIdentity] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleCLick = async (e) => {
    e.preventDefault();
    const { name, email, password } = identity;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("token", json.authToken);
      console.log(json);
      navigate("/");
      props.showAlert("You created account successfully", "success");
    }
    else{
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setIdentity({ ...identity, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2 className="mb-4"> Please Signup to use iNotebook</h2>
      <form onSubmit={handleCLick}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            minLength={2}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
