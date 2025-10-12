import React from "react";
import { Link } from "react-router-dom";

const HorizantalCard = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto p-3 gap-5">
      {data.length > 0 ? data?.map((d, i) => (
        <div
          key={i}
          className="min-w-[15%] h-[40vh] bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300"
        >
          <Link to={`/movies/details/${d.id}`}>
            <img
              className="w-full h-[45%] object-cover bg-center"
              src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`}
              alt={d.title || d.name}
            />
          </Link>

          <div className="text-white p-2 h-[45%]">
            <h1 className="text-md font-semibold">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>

            <p className="mt-1 font-light text-sm">
              {d.overview?.slice(0, 70)}...{" "}
              <Link
                to={`/movies/details/${d.id}`}
                className="text-blue-400 hover:text-blue-500"
              >
                more
              </Link>
            </p>
          </div>
        </div>
      )):<h1 className="text-3xl text-white font-black text-center mt-5">Nothing to show</h1>}
    </div>
  );
};

export default HorizantalCard;
