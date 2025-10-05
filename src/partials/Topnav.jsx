import  { useState } from 'react'
import { Link } from 'react-router-dom'

const Topnav = () => {
    const [query, setQuery] = useState("")
    console.log(query)

    return (

        <div className='w-full h-[10vh] relative flex justify-center items-center '>
            <i class="ri-search-2-line text-zinc-400 text-3xl"></i>
            <input 
            onChange={(e)=>setQuery(e.target.value)}
            value={query}

            className='w-[50%] mx-10 p-2.5 text-xl outline-none border-none text-white' type="text" placeholder='Search Anything' />
            <i class="ri-close-fill text-3xl text-zinc-400"></i>

            <div className='absolute w-[50%] h-[50vh] bg-zinc-200 top-[90%] overflow-auto'>

                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
                <Link className='hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 '>
                    <img src="" alt="" />
                    <span>Hello everyone</span>
                </Link>
             
            </div>




        </div>
    )
}

export default Topnav