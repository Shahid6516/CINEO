import React from 'react'
import { Link } from 'react-router-dom'






const Cards = ({ data, title }) => {
    return (
        <div className='flex flex-wrap w-full h-full  items-center justify-center'>
            {data.map((data, i) => (
                <Link className='w-[30vh] mr-[3%] mb-[2%]' key={i}>
                    <img className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]' src={`https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path}`} alt="" />
                    <h1 className='text-lg text-zinc-300 mt-3 font-semibold'>
                        {(data.name || data.title || data.original_name || data.original_title).slice(0,15)}
                    </h1>
                </Link>
            ))}
        </div>
    )
}

export default Cards