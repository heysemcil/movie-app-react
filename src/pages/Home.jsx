import React, { useState } from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { MoonLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const API_KEY = process.env.REACT_APP_MOVIE_APIKEY;
const BASE_URL = "https://api.themoviedb.org/3";
const searchMoviesUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;


export default function Home() {
  const { movies, loading } = useMovies();
  const [searchTerm, setSearchTerm] = useState("")
  const {currentUser} = useAuth()
  const {getMovies} = useMovies();

  if (movies.length == 0) {
    return (
      <h2 className="text-center text-red-500">
        No Movies, Something went wrong !
      </h2>
    );
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    if(currentUser&&searchTerm)
        getMovies(`${searchMoviesUrl}${searchTerm}`)
    else if(!currentUser)
        toast.warn('Please Login to search movies')
    else 
        toast.warn('Please Enter a movie name')

  }

  return (
    <>
    <form className="flex justify-center p-2 my-5 " onSubmit={submitHandler}>
      <input type="search" className="w-80 form-input h-11 mr-2" 
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}
      />
      <button className="btn-danger-bordered">Search</button>
    </form>
    
    <div className="flex justify-center flex-wrap">
      {loading ? (
        <div className="mt-48 flex justify-center items-center">
          <MoonLoader color="red" />
        </div>
      ) : (
        movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
      )}
    </div>
    </>
  );
}
