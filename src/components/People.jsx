import { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'
import Cards from '../partials/Cards'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const People = () => {
  document.title = "CINEO | PEOPLE"

  const navigate = useNavigate()
  const [category, setCategory] = useState("popular")
  const [person, setPerson] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`)
      if (data.results.length > 0) {
        setPerson(prev => [...prev, ...data.results])
        setPage(prev => prev + 1)
      } else {
        setHasMore(false)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setHasMore(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setPerson([])
    setHasMore(true)
    getPerson()
  }, [category])

  return person.length > 0 ? (
    <div className='p-6 w-screen'>
      <div className='w-full flex items-center justify-between mb-4'>
        <h1 className='flex gap-2 text-2xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line"></i> PEOPLE
        </h1>
        <Topnav />
      </div>

      <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={person.length}
          next={getPerson}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.9}
        >
          <Cards data={person} type="people" />
        </InfiniteScroll>
      </div>
    </div>
  ) : <Loading />
}

export default People
