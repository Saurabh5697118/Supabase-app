import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Config/SupabaseClientId";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { useMediaQuery } from "@mui/material";

const MovieCard = ({ movie, onDelete }) => {
  let mobView = useMediaQuery("(max-width:576px)")
  let tabView = useMediaQuery("(max-width:1024px)")
  let sizes =  mobView ? 14 : tabView ? 18 : 24;
  const navigate = useNavigate();
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("SupaMovies")
      .delete()
      .eq("id", movie.id)
      .select();

    if (error) return;
    if (data.length) onDelete(movie.id);
  };

  const rated = (
    <StarOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  const unRated = (
    <StarOutlineOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  return (
    <div className="movie-card">
      <div style={{ fontWeight: 550, fontSize: sizes, marginBottom: 30 }}>
        {movie.Title}
      </div>
      <div className="card-rating-operator">
       <div
          style={{
            fontWeight: 300,
            fontSize: mobView ? 10 : tabView ? 12 : 18,
            color: "#515050",
            display: "flex",
          }}
        >
          Rating: {[...Array(+movie.Rating)].map(() => rated)}
          {[...Array(5 - +movie.Rating)].map(() => unRated)}
        </div>

        <div className="card-edit-del-buttons">
          <EditOutlinedIcon
            onClick={() => navigate(`/${movie.id}`)}
            sx={{ cursor: "pointer", fontSize: sizes }}
          />
          <DeleteOutlineOutlinedIcon
            onClick={() => handleDelete()}
            sx={{
              margin: "0px 5px",
              cursor: "pointer",
              color: "#ff0000ab",
              fontSize: sizes,
            }}
          />
          {/* <Link to={}>Edit</Link> */}
          {/* <button>Delete</button> */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
