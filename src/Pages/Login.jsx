import React, { useState } from "react";
import supabase from "../Config/SupabaseClientId";
import { Link, useNavigate } from "react-router-dom";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userData.email  || !userData.password){
      alert("Please fill all the fields");
      return
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    
    if (error) {
      alert(error.message);
      return;
    }
    alert("Sucessfully Logged In!");
    setToken(data);
    console.log(userData, data);
    navigate("/home");
  };
  return (
    <div className="signUp-Login-container">
      <form onSubmit={handleSubmit} className="signUp-login-form">
        <h2>Login</h2>
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
            value={userData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password..."
          />
        </div>
        <div className="creds">
          <button type="submit">Submit</button>
        </div>
      </form>

      <div style={{ textAlign: "center", fontSize: 10 }}>
        Create New Account? <Link to="/signUp">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
