import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Config/SupabaseClientId";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";

const MovieCard = ({ movie, onDelete }) => {
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

  let sizes = window.innerWidth < 576 ? 10 : window.innerWidth < 1024 ? 16 : 24;
  const rated = (
    <StarOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  const unRated = (
    <StarOutlineOutlinedIcon sx={{ color: "#ffa500a1", fontSize: sizes }} />
  );
  return (
    <div className="movie-card">
      <div style={{ fontWeight: 550, fontSize: 24, marginBottom: 30 }}>
        {movie.Title}
      </div>
      {/* <hr  /> */}
      {/* <h5>{movie.Method}</h5> */}
      {/* <h6>{movie.Rating}</h6> */}
      <div className="card-rating-operator">
        {/* <div style={{ fontWeight: 300, fontSize: 16, color: "#515050"  }}>Rating: {`${stars}`.repeat(movie.Rating)}</div> */}
        <div
          style={{
            fontWeight: 300,
            fontSize: 16,
            color: "#515050",
            display: "flex",
          }}
        >
          Rating: {[...Array(movie.Rating)].map((data) => rated)}
          {[...Array(5 - movie.Rating)].map((data) => unRated)}
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
