import { Link } from 'react-router-dom'

const Sidenav = () => {

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-5'>
      <h1 className=' text-2xl text-white font-bold'>
        <i className="text-[#6556cd] ri-tv-fill mr-2"></i>
        <span>CINEO.</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-lg gap-2'>
        <h1 className='text-white font-semibold text-xl mt-7 mb-3'>
          New Feeds
        </h1>
        <Link to="/trending" className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-fire-fill"></i>Trending </Link>

        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-bard-fill mr-2"></i>Popular</Link>

        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>

        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-tv-fill mr-2"></i>Tv Shows</Link>

        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-team-fill mr-2"></i>People</Link>
      </nav>

      <hr className='border-none h-[1px] mt-2 bg-zinc-400' />



      <nav className='flex flex-col text-zinc-400 text-lg gap-2'>
        <h1 className='text-white font-semibold text-xl mt-4 mb-3'>
          Website information
        </h1>
        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-information-fill mr-2"></i>About </Link>
        <Link className='hover:bg-[#6556cd] p-2 rounded-lg hover:text-white duration-300'><i className="ri-phone-line mr-2"></i>Contact US</Link>


      </nav>

    </div>

  )
}

export default Sidenav