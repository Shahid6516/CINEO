import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv } from "../store/actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removetv } from "../store/reducers/tvSlice";
import Loading from "../components/Loading";
import HorizantalCard from "../partials/HorizantalCard";
import ReactPlayer from "react-player";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  const [showPlayer, setShowPlayer] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  // ✅ Show loader while data is loading
  if (!info || !info.detail) {
    return <Loading />;
  }

  const imageUrl = info.detail.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : "";

  const video = info?.videos;
  const youtubeUrl = video?.key
    ? `https://www.youtube.com/watch?v=${video.key}`
    : null;

  const handleOpenTrailer = () => {
    if (youtubeUrl) {
      setShowPlayer(true);
    } else {
      alert("Trailer not available.");
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${imageUrl})`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-[100%] h-fit px-[10%]"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line text-xl"
        ></Link>

        {info.detail.homepage && (
          <a target="_blank" href={info.detail.homepage} className="hover:text-white">
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="hover:text-white"
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="hover:text-white"
          >
            IMDB
          </a>
        )}
      </nav>

      {/* Poster and details */}
      <div className="w-full flex flex-col md:flex-row">
        <img
          className="h-[55vh] rounded-xl object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path
            }`}
          alt=""
        />

        <div className="content ml-0 md:ml-10 text-white mt-6 md:mt-0">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            {info.detail.first_air_date && (
              <span className="text-2xl font-bold text-zinc-300 ">
                {" "}
                ({info.detail.first_air_date.split("-")[0]})
              </span>
            )}
          </h1>

          <div className="flex mt-2 text-white items-center gap-5 relative flex-wrap">
            <span className="absolute text-white text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center bg-yellow-600">
              {Math.floor(info.detail.vote_average * 10)}
              <sup>%</sup>
            </span>

            <h1 className="ml-12 font-semibold text-2xl leading-5">User Score</h1>
            {info.detail.first_air_date && <h1>{info.detail.first_air_date}</h1>}
            {info.detail.genres && (
              <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            )}
            {info.detail.runtime && <h1>{info.detail.runtime} min</h1>}
          </div>

          {info.detail.tagline && (
            <h1 className="text-xl font-semibold italic mt-3 text-zinc-200">
              {info.detail.tagline}
            </h1>
          )}

          <h1 className="text-2xl mt-5 font-semibold">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-5 font-semibold">TV Translations</h1>
          <p className="text-sm mb-8">
            {info.translations?.length ? info.translations.join(", ") : "N/A"}
          </p>

          {youtubeUrl ? (
            <button
              onClick={handleOpenTrailer}
              className="mt-10 py-2 px-3 bg-[#6556cd] rounded-lg hover:bg-[#5648b3]"
            >
              <i className="text-xl mr-2 ri-play-fill"></i>
              Play Trailer
            </button>
          ) : (
            <p className="mt-10 text-zinc-400 italic">Trailer not available</p>
          )}
        </div>
      </div>

      {/* Watch Providers */}
      <div className="w-fit mb-10 mt-6">
        {info.watchproviders?.flatrate && (
          <div className="flex gap-3 items-center text-white">
            <h1>Available on platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders?.rent && (
          <div className="flex gap-3 mt-3 items-center text-white">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders?.buy && (
          <div className="flex gap-4 mt-3 items-center text-white">
            <h1>Available to buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* #################### */}
      <hr className="border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl mt-3 font-bold text-white">
        Seasons
      </h1>

      <div className="w-[100%] flex flex-nowrap overflow-y-hidden mb-5 p-5 ">
        {info.detail.seasons.map((s, i) => (
          <div className="w-[vw] mr-[5%]">
            <img
              className='h-[40vh] min-h-[30vh] min-w-[15vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
            <h1 className='text-lg text-zinc-300 mt-3 font-semibold'>
              {(s.name || s.title || s.original_title)?.slice(0, 15)}
            </h1>
          </div>
        ))}


      </div>


      {/* #################### */}
      <hr className="border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl mt-3 font-bold text-white">
        Recommendations & Similar
      </h1>

      <HorizantalCard
        data={
          info?.recommendation?.length > 0 ? info.recommendation : info?.similar
        }
      />

      <Outlet />

      {/* Trailer Modal */}
      {showPlayer && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-50">
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-10 right-10 text-white text-3xl"
          >
            ✖
          </button>

          {/* Show loader while video buffers */}
          {isVideoLoading && <Loading />}

          <ReactPlayer
            url={youtubeUrl}
            playing
            controls
            width="80%"
            height="80%"
            onBuffer={() => setIsVideoLoading(true)}
            onBufferEnd={() => setIsVideoLoading(false)}
            onEnded={() => setShowPlayer(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TvDetails;
