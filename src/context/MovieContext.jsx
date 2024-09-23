import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const MovieContext = createContext()

const API_KEY = process.env.REACT_APP_MOVIE_APIKEY
const BASE_URL = "https://api.themoviedb.org/3";
const discoverMoviesUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

export const MovieContextProvider = ({children})=>{
   
    const [ movies, setMovies]= useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getMovies(discoverMoviesUrl)
    }, [])
    
    const getMovies = async (URL) =>{
        setLoading(true);
        try{
            const {data}= await axios.get(URL)
            setMovies(data.results);
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
        

    }

    const value = {movies, loading, getMovies}
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}


export const useMovies = ()=> useContext(MovieContext)