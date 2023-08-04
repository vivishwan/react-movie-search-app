import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  //sample movie array:
  //it is initialized as an empty array
  const [movies, setMovies] = useState([
    {
      /*{
      Title: 'Resident Evil',
      Year: '2002',
      imdbID: 'tt0120804',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZmI1ZGRhNDYtOGVjZC00MmUyLThlNTktMTQyZGE3MzE1ZTdlXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg',
    },
    */
    },
  ]);

  //to search for a movie title, we create a new state, we will add this to a search component
  //it will be an empty string initially
  //input field in the SearchBox component will use this state
  const [searchValue, setSearchValue] = useState('');
  //handler favourites
  const [favs, setFavs] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=843825f`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    if (responseJson.Search) {
      //.Search is the array received from the OMDB API
      setMovies(responseJson.Search);
    }
  };

  //call the url
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]); //dependency array
  //we will pass the searchValue in the useEffect hook so that it will run the API call again if value changes

  //new hook to retrieve saved favs from local storage
  useEffect(() => {
    const movieFavouritesLocal = JSON.parse(
      localStorage.getItem('react-movie-search-app-favs')
    );
    if (movieFavouritesLocal) {
      setFavs(movieFavouritesLocal);
    }
  }, []); //dependency array

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-search-app-favs', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavsList = [...favs, movie];
    setFavs(newFavsList);
    saveToLocalStorage(newFavsList);
  };

  //remove favourites
  const removeFavouriteMovie = (movie) => {
    // const newFavsList1 = favs.filter((fav) => fav.imdbId !== movie.imdbId);
    // setFavs(newFavsList1);

    const newFavouriteList = favs.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavs(newFavouriteList);
    //also remove from local storage
    saveToLocalStorage(newFavouriteList);
  };
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Vivishwan picks movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favs}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
