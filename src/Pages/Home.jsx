import React, { useEffect, useState } from "react";
import supabase from "../Config/SupabaseClientId";
import MovieCard from "../Components/MovieCard";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState(null);
  const [err, setErr] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const handleDelete = (id) => {
    setAllMovies((prevMovies) => prevMovies.filter((data) => data.id !== id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getDatas = async () => {
      const { data, error } = await supabase
        .from("SupaMovies")
        .select()
        .order(orderBy);

      if (error) {
        setErr("Could Not Find Datas");
        setAllMovies(null);
      }
      if (data) {
        setAllMovies(data);
        setErr(null);
      }
    };
    getDatas();
  }, [orderBy]);

  return (
    <div>
      <div className="home-filter">
        <span>Filter By:</span>
        <button className="filter-button" onClick={() => setOrderBy("Title")}>
          Title
        </button>
        {/* <button className="filter-button" onClick={() => setOrderBy("Method")}>
          Method
        </button> */}
        <button className="filter-button" onClick={() => setOrderBy("Rating")}>
          Rating
        </button>
      </div>
      {err && <h4>{err}</h4>}
      <div className="movie-cards">
        {allMovies &&
          allMovies.map((movie, ind) => {
            const animationDelay = 100;
            const animationDuration = 500;
            const anim = `movieCardDisplay ${animationDuration}ms ease-out ${
              animationDelay * (ind + 1)
            }ms forwards`;
            return (
              <div style={{ animation: anim, opacity: 0 }}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDelete={handleDelete}
                />
              </div>
            );
          })}

        {allMovies ? (
          <div
            className="add-card"
            onClick={() => navigate("/create")}
            style={{
              animation: `movieCardDisplay 500ms ease-out ${
                100 * (allMovies.length + 2)
              }ms forwards`,
              opacity: 0,
            }}
          >
            <AddCircleTwoToneIcon />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
