import React from 'react'
import { Link } from 'react-router-dom'






const Cards = ({ data, title }) => {
    return (
        <div className='flex flex-wrap w-full h-full  items-center justify-center'>
            {data.map((data, i) => (
                <Link className='relative w-[30vh] mr-[3%] mb-[2%]' key={i}>
                    <img className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path || data.profile_path}`} alt="" />
                    <h1 className='text-lg text-zinc-300 mt-3 font-semibold'>
                        {(data.name || data.title || data.original_name || data.original_title).slice(0, 15)}
                    </h1>
                    {data.vote_average && (
                        <div className='absolute right-[3%] bottom-[30%] text-white text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center bg-yellow-600 '>{Math.floor(data.vote_average + 1 * 10)}<sup>%</sup></div>
                    )}



                </Link>
            ))}
        </div>
    )
}

export default Cards