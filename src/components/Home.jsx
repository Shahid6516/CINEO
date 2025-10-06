import React, { useEffect, useState } from 'react'
import Sidenav from '../partials/Sidenav';
import Topnav from '../partials/Topnav';
import axios from "../utils/Axios";
import Header from '../partials/Header';
import HorizantalCard from '../partials/HorizantalCard';
import Dropdown from '../partials/Dropdown';


const Home = () => {
    document.title = "CINEO | HOMEPAGE";

    const [wallpaper, setwallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setCategory] = useState("all");

    const getHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`);
            // setwallpaper(data.results);
            const randomData = data.results[Math.floor(Math.random() * data.results.length)]
            setwallpaper(randomData)
        } catch (error) {
            console.log("Error", error);
        }
    }



    const getTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`);
            setTrending(data.results)
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        !wallpaper && getHeaderWallpaper()
        getTrending()

    }, [category])


    console.log(trending)


    return wallpaper && trending ? (

        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden '>
                <Topnav />
                <Header data={wallpaper} />
                <div className='p-3 flex justify-between'>
                    <h1 className=' text-3xl  text-zinc-400 font-semibold '>Trending</h1>
                <Dropdown title="filter" options={["tv", "movie", "all"]} func={(e)=>setCategory(e.target.value)}/>
                </div>
                <HorizantalCard data={trending} />
            </div>
        </>
    ) : <h1>Loading</h1>
}

export default Home