import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../Config/SupabaseClientId";
import { useMediaQuery } from "@mui/material";

const Update = () => {
  let mobView = useMediaQuery("(max-width:576px)");
  let tabView = useMediaQuery("(max-width:1024px)");
  let sizes = mobView ? 14 : tabView ? 16 : 20;
  let sizes2 = mobView ? 10 : tabView ? 12 : 16;
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Title: "",
    Method: "",
    Rating: "",
  });
  // const [formErr, setFormErr] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("SupaMovies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/home", { replace: "true" });
      }
      if (data.id) {
        setUserData(data);
      }
    };
    fetch();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Title: userData.Title,
      Rating: userData.Rating,
      Method: userData.Method,
    };
    const { data, error } = await supabase
      .from("SupaMovies")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) {
      alert(error.message);
    }

    if (data.length) {
      // setFormErr(null);
      navigate("/home");
    }
  };

  return (
    <div className="update-create-movie">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 40, fontSize: sizes }}>
          Update Movie Details{" "}
        </h2>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Title">
            Title
          </label>
          <input
            id="Title"
            required
            placeholder="Title..."
            value={userData.Title}
            type="text"
            style={{ fontSize: sizes2 }}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Method">
            Description
          </label>
          <textarea
            id="Method"
            required
            placeholder="Description..."
            value={userData.Method}
            style={{ fontSize: sizes2 }}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
          <label style={{ fontSize: sizes2 }} htmlFor="Rating">
            Rating
          </label>
          <input
            id="Rating"
            required
            value={userData.Rating}
            type="number"
            placeholder="Rating..."
            max={5}
            min={0}
            style={{ fontSize: sizes2 }}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.id]: e.target.value })
            }
          />
        </div>

        <div className="creds">
          <button style={{ fontSize: sizes2 }} type="submit">
            Submit
          </button>
        </div>
        {/* {formErr && <h6>{formErr}</h6>} */}
      </form>
    </div>
  );
};

export default Update;
