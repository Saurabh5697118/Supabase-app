import React, { useState } from "react";
import supabase from "../Config/SupabaseClientId";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formErr, setFormErr] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormErr("please fill all the fields");
      return;
    }
    const { data, error } = await supabase
      .from("SupaMovies")
      .insert([{ Title: title, Method: method, Rating: rating }]);
    if (error) {
      setFormErr("Kindly fill all the data");
    }
    navigate("/home");

    setFormErr(null);
  };
  return (
    <div  className="update-create-movie">
      <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom: 40}}>Create Movie </h2>
        <div className="creds">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        /></div>
        <div className="creds">
        
        <label htmlFor="method">Description</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        /></div>
        <div className="creds">
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          value={rating}
          type="number"
          min={0}
          max={5}
          onChange={(e) => setRating(e.target.value)}
        /></div>
        <div className="creds">
        <button type="submit">Submit</button>
        </div>
        {formErr && <h6>{formErr}</h6>}
      </form>
    </div>
  );
};

export default Create;
