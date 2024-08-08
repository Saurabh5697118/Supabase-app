import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import Update from "./Pages/Update";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { useEffect, useState } from "react";
import Header from "./Pages/Header";

function App() {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);
  console.log(token);

  return (
    <div className="App">

      <BrowserRouter>
      <Header />
      {/* {token ? 
        <nav className="navbar" >
          <h1>Supabase Movies</h1>
          <Link to="/home">Home</Link>
          <Link to="/create">Create</Link>
        </nav>: ""} */}
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/signUp" element={<SignUp />} />
          {token ? (
            <>
            
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/:id" element={<Update />} />
            </>
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
