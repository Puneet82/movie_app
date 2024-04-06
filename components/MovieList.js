import React, { useEffect, useState } from 'react';
import { getMovies } from '../utils/api'; 
import Movie from './Movie';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies(); 
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>List of Movies</h2>
      <ul>
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;


