import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/Axios";
import noimage from "../../public/no-image.avif"

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches, setsearches] = useState([]);

    console.log(query);

    const getSearch = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setsearches(data.results);
        } catch (error) {
            console.log("Error", error);
        }
    };

    useEffect(() => {
        getSearch();
    }, [query]);

    return (
        <div className="w-full h-[10vh] relative flex justify-start items-center mt-3 ml-[18%] ">
            <i className="ri-search-2-line text-zinc-400 text-2xl "></i>
            <input
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                className="w-[50%] mx-10 p-2.5 text-xl outline-none border-none text-white"
                type="text"
                placeholder="Search Anything"
            />

            {query.length > 0 && (
                <i
                    className="ri-close-fill text-2xl text-zinc-400"
                    onClick={() => setQuery(" ")}
                ></i>
            )}

            <div className="absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded-lg">
                {searches.map((s, i) => (
                    <Link
                        key={i}
                        className="hover:text-black w-[100%] p-10 font-semibold flex text-zinc-600 justify-start hover:bg-zinc-300 border-b-zinc-100 items-center border-b-2 "
                    >
                        <img className="w-[15vh] h-[15vh] object-cover rounded mr-5 shadow-lg "
                            src={
                                s.backdrop_path || s.profile_path ?
                                    `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path
                                    }`:noimage} alt="" />


                        <span>
                            {s.name || s.title || s.original_name || s.original_title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Topnav;
