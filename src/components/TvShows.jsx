import { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import Cards from '../partials/Cards'
import Loading from './Loading'

const TvShows = () => {
  document.title = "CINEO | TV SHOWS";

  const navigate = useNavigate()
  const [category, setCategory] = useState("airing_today")
  const [tv, setTv] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`)
      if (data.results.length > 0) {
        setTv(prev => [...prev, ...data.results])
        setPage(prev => prev + 1)
      } else {
        setHasMore(false)
      }
      setLoading(false)
    } catch (error) {
      console.log("Error fetching TV shows:", error)
      setHasMore(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setTv([])
    setHasMore(true)
    getTv()
  }, [category])

  return tv.length > 0 ? (
    <div className='p-6 w-screen'>
      <div className='w-full flex items-center justify-between mb-4'>
        <h1 className='flex gap-2 text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i> TV_SHOWS
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["on_the_air", "top_rated", "popular", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={tv.length}
          next={getTv}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.9}
        >
          <Cards data={tv} type="tv" />
        </InfiniteScroll>
      </div>
    </div>
  ) : <Loading />
}

export default TvShows
