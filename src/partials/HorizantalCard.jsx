import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const HorizantalCard = ({ data }) => {
    return (

        <div className='w-[100%] flex overflow-x-auto overflow p-3 '>
            {data.map((d, i) => (

                <div key={i} className='min-w-[15%]  mr-5 bg-zinc-900 overflow-y-hidden rounded'>

                    <img className='w-full h-[45%] mb-3 object-cover bg-center ' src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`} alt="" />

                    <div className='text-white p-2 h-[45%]'>
                        <h1 className=" text-md font-semibold text-white">{d.name || d.title.slice(0, 15) || d.original_name.slice(0, 2) || d.original_title.slice(0, 2)}</h1>

                        <p className=" w-[100%] mt-1 font-light text-white text-sm ">{d.overview.slice(0, 30)} ...<Link className="text-blue-700">more</Link> </p>
                    </div>
                </div>
            ))}
        </div>



    )
}

export default HorizantalCard