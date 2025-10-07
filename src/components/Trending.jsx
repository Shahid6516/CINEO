import { useNavigate } from 'react-router-dom'
import Topnav from '../partials/Topnav'
import Dropdown from '../partials/Dropdown'

const Trending = () => {
  const navigate = useNavigate()
  return (
    <div className='p-6 w-screen h-screen'>

      <div className='w-full  flex items-center'>
        <h1 className='text-2xl text-nowrap text-zinc-400 font-semibold '>
          <i
            onClick={() => navigate(-1)}
            class="hover:text-[#6556cd] ri-arrow-left-line"></i> Trending</h1>
        <Topnav />
        <Dropdown title="Category" options={["movie", "tv", "all"]} func="" />
        <div className='w-[2%]'></div>

        <Dropdown title="Duration" options={["week", "day"]} func="" />

      </div>




      




    </div>
  )
}

export default Trending