import ReactPlayer from "react-player"
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Trailer = () => {
  const { pathname } = useLocation()
  const category = pathname.includes("movies") ? "movie" : "tv"

  const ytvideo = useSelector((state) => state[category].info?.videos)


  return (
    <div className='fixed z-50 bg-[rgba(0,0,0,.9)] w-screen h-screen flex items-center justify-center top-0 left-0'>
      <ReactPlayer 
      
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`} 
        controls 
        playing
      />
    </div>
  )
}

export default Trailer
