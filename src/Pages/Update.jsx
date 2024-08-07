import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../Config/SupabaseClientId";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    Title: "",
    Method: "",
    Rating: "",
  });
  const [formErr, setFormErr] = useState(null);
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
    if (!userData.Title || !userData.Rating || !userData.Method) {
      setFormErr("Kindly fill all the details");
      return;
    }
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
      setFormErr("Some Err");
    }

    if (data.length) {
      setFormErr(null);
      navigate("/home");
    }
  };

  return (
    <div className="update-create-movie">
      <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom: 40}}>Update Movie Details </h2>
        <div className="creds">
          <label htmlFor="Title">Title</label>
          <input
            id="Title"
            placeholder="Title..."
            value={userData.Title}
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="creds">
        <label htmlFor="Method">Method</label>
        <textarea
          id="Method"
          placeholder="Description..."
          value={userData.Method}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.id]: e.target.value })
          }
        /></div>
        <div className="creds">
        <label htmlFor="Rating">Rating</label>
        <input
          id="Rating"
          value={userData.Rating}
          type="number"
          placeholder="Rating..."
          max={5}
          min={0}
          onChange={(e) =>
            setUserData({ ...userData, [e.target.id]: e.target.value })
          }
        />
        </div>
        
        <div className="creds">
        <button type="submit">Submit</button></div>
        {formErr && <h6>{formErr}</h6>}
      </form>
    </div>
  );
};

export default Update;
