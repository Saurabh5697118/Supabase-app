import React, { useState } from "react";
import supabase from "../Config/SupabaseClientId";
import { Link, useNavigate } from "react-router-dom";
import LoginPageLogo from "../Components/LoginPageLogo";
import { useMediaQuery } from "@mui/material";

const SignUp = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          age: 28,
        },
      },
    });
    if (error) {
      alert(error.message);
      return;
    }
    alert("Check your mail for verification Link");
    navigate("/signUp");
  };
  return (
    <div className="signUp-Login-container">
      {" "}
      <LoginPageLogo />
      <div>
        <form onSubmit={handleSubmit} className="signUp-login-form">
          <h2 style={{ fontSize: sizes }}>SignUp</h2>
          <div className="creds">
            <input
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              style={{ fontSize: sizes2 }}
              placeholder="Name..."
            />
          </div>
          <div className="creds">
            <input
              name="email"
              type="email"
              value={userData.email}
              required
              style={{ fontSize: sizes2 }}
              onChange={handleChange}
              placeholder="Email..."
            />
          </div>
          <div className="creds">
            <input
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              required
              style={{ fontSize: sizes2 }}
              placeholder="Password..."
            />
          </div>
          <div className="creds">
            <button style={{ fontSize: sizes2 }} type="submit">
              Submit
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", fontSize: 10 }}>
          Already Have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
