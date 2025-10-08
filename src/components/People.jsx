import { useState, useEffect } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'
import Cards from '../partials/Cards'
import Loading from './Loading'


const People = () => {
    document.title = "CINEO | PEOPLE";

    const navigate = useNavigate()
    const [category, setCategory] = useState("popular")
    const [duration, setDuration] = useState("week") // Add duration state
    const [person, setperson] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)

    const getperson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`, {
                params: { page, duration } // Send both category and duration in params
            })
            console.log(data)

            if (data.results.length > 0) {
                setperson(prev => [...prev, ...data.results])
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
        setperson([]) // Reset popular items when changing category or duration
        setHasMore(true)
        getperson()
    }, [category])
    return person.length > 0 ? (
        <div className='p-6 w-screen'>
            <div className='w-full flex items-center justify-between mb-4'>
                <h1 className='flex gap-2 text-2xl text-zinc-400 font-semibold'>
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556cd] ri-arrow-left-line"
                    ></i> PEOPLE
                </h1>

                <Topnav />

               
                <div className='w-[2%]'></div>


            </div>

            <div id="scrollableDiv" style={{ height: '80vh', overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={person.length}
                    next={getperson}
                    hasMore={hasMore}
                    loader={<h4 className='text-center'>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.9} // fetch when 90% scrolled
                >
                    <Cards data={person} />
                </InfiniteScroll>
            </div>
        </div>
    ) : <Loading />
}

export default People