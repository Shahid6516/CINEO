import React, { useEffect, useState } from 'react'
import Sidenav from '../partials/Sidenav';
import Topnav from '../partials/Topnav';
import axios from "../utils/Axios";
import Header from '../partials/Header';
import HorizantalCard from '../partials/HorizantalCard';


const Home = () => {
    document.title = "CINEO | HOMEPAGE";

    const [wallpaper, setwallpaper] = useState(null);
    const [trending, setTrending] = useState(null);

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
            const { data } = await axios.get(`/trending/all/day`);
            setTrending(data.results)
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        !wallpaper && getHeaderWallpaper()
        !trending && getTrending()
    }, [])


    console.log(trending)


    return wallpaper && trending ? (

        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-auto overflow-x-hidden '>
                <Topnav />
                <Header data={wallpaper} />
                <HorizantalCard data={trending} />
            </div>
        </>
    ) : <h1>Loading</h1>
}

export default Home