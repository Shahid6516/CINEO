import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../public/no-image.avif";

const Cards = ({ data, type }) => {
  const getLink = (item) => {
    const mediaType = type || item.media_type;

    if (mediaType === "movie") return `/movies/details/${item.id}`;
    if (mediaType === "tv") return `/tv/details/${item.id}`;
    if (mediaType === "people" || mediaType === "person") return `/people/details/${item.id}`;
    return "#"; // 
  };

  return (
    <div className="flex flex-wrap w-full h-full items-center justify-center">
      {data.map((item, i) => (
        <Link
          key={i}
          to={getLink(item)}
          className="relative w-[30vh] mr-[3%] mb-[2%]"
        >
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={
              item.poster_path || item.backdrop_path || item.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    item.poster_path || item.backdrop_path || item.profile_path
                  }`
                : noimage
            }
            alt={item.title || item.name || "No image available"}
            loading="lazy"
          />

          <h1 className="text-lg text-zinc-300 mt-3 font-semibold">
            {(item.name || item.title || item.original_name || item.original_title)?.slice(0, 15)}
          </h1>

          {item.vote_average && (
            <div className="absolute right-[3%] bottom-[30%] text-white text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center bg-yellow-600">
              {Math.floor(item.vote_average * 10)}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
