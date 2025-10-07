import { useNavigate } from 'react-router-dom'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import { useEffect, useState } from 'react'
import axios from '../utils/Axios'
import Cards from '../partials/Cards'
import Loading from './Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  const navigate = useNavigate() 

  const [category, setCategory] = useState("all")
  const [duration, setDuration] = useState("day")
  const [trending, setTrending] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`, {
        params: { page }
      })

      if (data.results.length > 0) {
        setTrending(prev => [...prev, ...data.results])
        setPage(prev => prev + 1)

      }
      else{
        setHasMore(false)
      }
        if (!data.results || data.results.length === 0) {
          setHasMore(false)
          return
        }

      setLoading(false)
      console.log("Fetched page:", page)
    } catch (error) {
      console.log("Error fetching trending:", error)
      setHasMore(false)
      setLoading(false)
    }
  }

  const refreshHandler =  () => {
    if (trending.length === 0) {
      getTrending()
    } else {
      setPage(1)
      setTrending([])
    }

  }

  useEffect(() => {
    setTrending([])
    setPage(1)
    setHasMore(true)
    setLoading(true)
    refreshHandler()
    getTrending()
  }, [category, duration])

  if (loading && trending.length === 0) return <Loading />

  return (
    <div className='p-6 w-screen'>
      <div className='w-full flex items-center justify-between mb-4'>
        <h1 className='text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i> Trending
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className='w-[2%]'></div>

        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={trending.length}
          next={getTrending}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.9} // fetch when 90% scrolled
        >
          <Cards data={trending} />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Trending
