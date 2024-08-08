import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabaseLogo from "../Assets/supabase-biglogo.png";
import { Avatar, useMediaQuery } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 18 : 24;
  const history = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const data = JSON.parse(sessionStorage.getItem("token"));
      console.log(data);

      setToken(data);
    } else {
      if (history.pathname !== "/" && history.pathname !== "/signUp")
        navigate("/");
    }
  }, [history.pathname]);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-firebase-logo">
        <img
          src={supabaseLogo}
          style={{ height: sizes * 2, width: sizes * 2 }}
        />
        <h2 style={{ fontSize: sizes }}>Supabase Movies</h2>
      </div>
      <div className="header-logout-logo">
        {token && history.pathname !== "/" && history.pathname !== "/signUp" ? (
          <>
            {!mobView ? (
              <>
                <Avatar />
                <button onClick={() => handleSignOut()}>Logout</button>
              </>
            ) : (
              <LogoutIcon onClick={() => handleSignOut()} />
            )}
          </>
        ) : (
          ""
        )}
        {/* <Link to="/home" replace={true}>Home</Link>
          <Link to="/create" replace={true}>Create</Link> */}
      </div>
    </div>
  );
};
export default Header;
