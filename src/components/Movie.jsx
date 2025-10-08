import React, { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import Cards from '../partials/Cards'
import Loading from './Loading'

const Movie = () => {
    document.title = "CINEO | MOVIES";

    const navigate = useNavigate()
    const [category, setCategory] = useState("now_playing")
    const [duration, setDuration] = useState("week") // Add duration state
    const [movie, setmovie] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)

    const getMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`, {
                params: { page, duration } // Send both category and duration in params
            })
            console.log(data)

            if (data.results.length > 0) {
                setmovie(prev => [...prev, ...data.results])
                setPage(prev => prev + 1)
            } else {
                setHasMore(false)
            }

            setLoading(false)
            console.log("Fetched page:", page)
        } catch (error) {
            console.log("Error fetching popular:", error)
            setHasMore(false)
            setLoading(false)
        }
    }

    useEffect(() => {
        // Fetch data when category or duration changes
        setPage(1)
        setmovie([]) // Reset popular items when changing category or duration
        setHasMore(true)
        getMovie()
    }, [category])


    return movie.length > 0 ?(
      <div className='p-6 w-screen'>
            <div className='w-full flex items-center justify-between mb-4'>
                <h1 className='flex gap-2 text-2xl text-zinc-400 font-semibold'>
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556cd] ri-arrow-left-line"
                    ></i> Movie
                </h1>

                <Topnav />

                <Dropdown
                    title="Category"
                    options={["popular", "top_rated", "upcoming","now_playing"]}
                    func={(e) => setCategory(e.target.value)}
                />
                <div className='w-[2%]'></div>

                
            </div>

            <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={movie.length}
                    next={getMovie}
                    hasMore={hasMore}
                    loader={<h4 className='text-center'>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.9} // fetch when 90% scrolled
                >
                    <Cards data={movie} />
                </InfiniteScroll>
            </div>
        </div>
    ):<Loading/>
}

export default Movie