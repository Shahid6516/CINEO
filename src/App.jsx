import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'

const App = () => {
  return (
    <div className='w-screen overflow-x-hidden h-screen bg-[#1F1E24] flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/tv' element={<TvShows />} />
        <Route path='/people' element={<People />} />
      </Routes>


    </div >
  )
}

export default App