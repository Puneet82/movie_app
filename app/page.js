import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import { getMovies } from '../api/movies'


const page = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleAddMovie = async (movieData) => {
    try {
      const newMovie = await addMovie(movieData);
      setMovies((prevMovies) => [...prevMovies, newMovie]);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleUpdateMovie = async (movieId, movieData) => {
    try {
      await updateMovie(movieId, movieData);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, ...movieData } : movie
        )
      );
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteMovie(movieId);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h1>Movies Page</h1>
      <AddMovieForm onAddMovie={handleAddMovie} />
      <MovieList
        movies={movies}
        onUpdateMovie={handleUpdateMovie}
        onDeleteMovie={handleDeleteMovie}
      />
    </div>
  );
};

export default page;



