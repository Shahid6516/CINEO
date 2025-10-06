import { Link } from "react-router-dom";

const Header = ({ data }) => {
    if (!data) return null; // safeguard

    const imageUrl = `https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`;

    return (
        <div
            style={{
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${imageUrl})`,
                backgroundPosition: "center",
                backgroundPosition: "top-5%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className='w-full h-[55vh] flex flex-col justify-end items-start p-[5%]'
        >
            <h1 className="text-5xl w-[70%] font-black text-white">{data.name || data.title || data.original_name || data.original_title}</h1>
            <p className="w-[70%] text-white mt-3 ">{data.overview.slice(0, 200)} ...<Link className="text-blue-700">more</Link> </p>

            <p className="text-white flex gap-2">
                <i className="text-yellow-500 ri-megaphone-fill"></i>{data.release_date || "no information"}
                <i className="text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
            </p>
            <Link className="bg-[#6556cd] p-3 mt-3 rounded text-white font-semibold">Watch trailer
            </Link>



        </div>
    )
}

export default Header;
