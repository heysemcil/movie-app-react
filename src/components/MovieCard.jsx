import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function MovieCard({ movie }) {
  const { id, poster_path, title, overview, vote_average } = movie;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getVoteClass = (vote) => {
    if (vote >= 8) return "green";
    else if (vote >= 6) return "orange";
    else return "red";
  };

  return (
    <div className="movie" onClick={() => navigate(`/details/${id}`)}>
      <img
        src={poster_path ? `${IMG_API}${poster_path}` : defaultImage}
        alt={title}
      />
      <div className="flex align-center justify-between p-1 text-white">
        <h5 className="p-3">{title}</h5>
        {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2 className="text-center font-semibold">Overview</h2>
        <p className="text-justify">{overview}</p>
      </div>
    </div>
  );
}
