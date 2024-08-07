import React, { useState } from "react";
import supabase from "../Config/SupabaseClientId";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
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
    if(!userData.email || !userData.name || !userData.password){
      alert("Please fill all the fields");
      return
    }
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
      <form onSubmit={handleSubmit} className="signUp-login-form">
        <h2>SignUp</h2>
        <div className="creds">
          <input
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name..."
          />
        </div>
        <div className="creds">
          <input
            name="email"
            type="email"
            value={userData.email}
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
            placeholder="Password..."
          />
        </div>
        <div className="creds">
          <button type="submit">Submit</button>
        </div>
      </form>

      <div style={{ textAlign: "center", fontSize: 10 }}>
        Already Have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
