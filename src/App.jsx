import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import TvShows from './components/TvShows';
import People from './components/People';
import TvDetails from './components/tvDetails';
import PersonDetails from './components/personDetails';
import MovieDetails from './partials/movieDetails';
import Trailer from './partials/Trailer';

const App = () => {
  return (
    <div className='w-screen overflow-x-hidden h-screen bg-[#1F1E24] flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />

        {/* Movies */}
        <Route path='/movies' element={<Movie />} />
        <Route path='/movies/details/:id' element={<MovieDetails />} >
          <Route path='/movies/details/:id/trailer' element={<Trailer/>}/>
        </Route>

        {/* TV Shows */}
        <Route path='/tv' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<TvDetails />} />

        {/* People */}
        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<PersonDetails />} />

      </Routes>
    </div>
  );
};

export default App;
