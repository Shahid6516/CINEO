import React, { useEffect, useState } from 'react'
import Sidenav from '../partials/Sidenav';
import Topnav from '../partials/Topnav';
import axios from "../utils/Axios";
import Header from '../partials/Header';
import HorizantalCard from '../partials/HorizantalCard';


const Home = () => {
    document.title = "CINEO | HOMEPAGE";

    const [wallpaper, setwallpaper] = useState(null);

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

    useEffect(() => {
        !wallpaper && getHeaderWallpaper()
    }, [])

    return wallpaper ? (

        <>
            <Sidenav />
            <div className='w-[80%] h-full '>
                <Topnav />
                <Header data={wallpaper} />
                <HorizantalCard/>
            </div>
        </>
    ) : <h1>Loading</h1>
}

export default Home