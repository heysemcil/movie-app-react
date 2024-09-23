import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VideoSection from '../components/VideoSection'
import axios from 'axios'

export default function MovieDetails() {
  const {id} = useParams()
  const [movieDetails, setMovieDetails] = useState({})
  const [videoKey, setVideoKey] = useState();

  const {title , poster_path, overview, release_date, vote_average, vote_count} = movieDetails

  const API_KEY = process.env.REACT_APP_MOVIE_APIKEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const movieDetailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = 'https://image.tmdb.org/t/p/w1280';
  const defaultImage = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const videoUrl = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`


  const getMovieData = async()=>{
    try{
      const { data} = await axios.get(movieDetailsUrl)
      setMovieDetails(data)
       const {data:videoData} = await axios.get(videoUrl)
       setVideoKey(videoData.results[0].key)

    }catch(error){
      console.log(error)
    }

  }
  useEffect(()=>{
    getMovieData()
  }, [])

  return (
    <div className='md:container px-10 mx-auto py-5'>
      <h1 className='text-center text-3xl dark:text-slate-200'> {title}</h1>
      {videoKey&&<VideoSection videoKey={videoKey}/>}
      <div className='md:container flex justify-center px-10 mt-5'>
        <div className="flex flex-col lg:flex-row w-2/3 rounded-lg bg-gray-100 shadow-lg dark:bg-gray-700">
          <img 
          className='lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg'
          src={poster_path? `${baseImageUrl}${poster_path}`: defaultImage} alt={title} />
          <div className='p-6 flex flex-col justify-between'>
            <div>
              <h5 className='text-gray-900 text-xl font-medium mb-2 dark:text-gray-200 text-center'> Overview</h5>
              <p className='text-gray-700 text-base mb-4 dark:text-slate-200'>{overview}</p>
            </div>
            <ul className='bg-gray-100 rounded-lg border-gray-400 text-gray-900'>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg'> 
                  <span className='font-semibold'>Release Date</span>
                  <span>{release_date}</span>
              </li>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full'>
                <span className='font-semibold'>Rate</span>
                <span>{vote_average}</span>
              </li>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full'>
                <span className='font-semibold'>Total Vote</span>
                <span>{vote_count}</span>
              </li>
              <li className='px-6 py-2 border-gray-400 w-full rouned-t-lg text-center'>
                  <Link to={-1} className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4'>Back</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  )
}
