import React, { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import Cards from '../partials/Cards'
import Loading from './Loading'

const Popular = () => {
  document.title = "CINEO | POPULAR";

  const navigate = useNavigate()
  const [category, setCategory] = useState("movie") 
  const [popular, setPopular] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular`, {
        params: { page }
      })
      if (data.results.length > 0) {
        setPopular(prev => [...prev, ...data.results])
        setPage(prev => prev + 1)
      } else {
        setHasMore(false)
      }
      setLoading(false)
    } catch (error) {
      console.log("Error fetching popular:", error)
      setHasMore(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setPopular([])
    setHasMore(true)
    setLoading(true)
    getPopular()
  }, [category])

  if (loading && popular.length === 0) return <Loading />

  return (
    <div className='p-6 w-screen'>
      <div className='w-full flex items-center justify-between mb-4'>
        <h1 className='flex gap-2 text-2xl text-zinc-400 font-semibold'>
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"
          ></i> POPULAR
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.9}
        >
          <Cards data={popular} type={category} />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Popular
