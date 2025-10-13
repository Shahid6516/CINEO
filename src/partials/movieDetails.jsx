import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../store/actions/moiveActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removemovie } from "../store/reducers/movieSlice";
import Loading from "../components/Loading";
import HorizantalCard from "../partials/HorizantalCard";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info || !info.detail) {
    return <Loading />;
  }

  const imageUrl = info.detail.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : "";

  // ✅ Safe access to trailer
  const trailer = info.videos?.key ? info.videos : null;
  const youtubeUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  const handleOpenTrailer = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, "_blank");
    } else {
      alert("Trailer not available");
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
      className="relative w-full h-fit px-[10%]"
    >
      {/* Part 1 navigation */}
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

      {/* Part 2 Poster and details */}
      <div className="w-full flex">
        <img
          className="h-[55vh] rounded-xl object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.title || info.detail.name}
        />

        <div className="content ml-15 text-white">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            {info.detail.release_date && (
              <span className="text-2xl font-bold text-zinc-300">
                {" "}({info.detail.release_date.split("-")[0]})
              </span>
            )}
          </h1>

          <div className="flex mt-2 text-white items-center gap-5 relative">
            <span className="absolute text-white text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center bg-yellow-600">
              {Math.floor(info.detail.vote_average * 10)}
              <sup>%</sup>
            </span>

            <h1 className="ml-10 font-semibold text-2xl w-[60px] leading-5">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl font-semibold italic mt-3 text-zinc-200">{info.detail.tagline}</h1>
          <h1 className="text-2xl mt-5 font-semibold">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mt-5 font-semibold">Movie Translations</h1>
          <p className="text-sm mb-8">{info.translations?.join(", ") || "N/A"}</p>

          {youtubeUrl ? (
            <Link onClick={handleOpenTrailer} className="mt-10 py-2 px-3 bg-[#6556cd] rounded-lg">
              <i className="text-xl mr-2 ri-play-fill"></i>Play Trailer
            </Link>
          ) : (
            <p className="mt-10 text-zinc-400 italic">Trailer not available</p>
          )}
        </div>
      </div>

      {/* Part 3 available on platform */}
      {info.watchproviders?.flatrate && (
        <div className="flex gap-3 items-center text-white mt-5">
          <h1>Available on platforms</h1>
          {info.watchproviders.flatrate.map((w, i) => (
            <img
              key={i}
              title={w.provider_name}
              className="w-[5vh] h-[5vh] object-fit rounded-md"
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt={w.provider_name}
            />
          ))}
        </div>
      )}

      <HorizantalCard
        data={info?.recommendations?.length > 0 ? info.recommendations : info?.similar}
      />

      <Outlet />
    </div>
  );
};

export default MovieDetails;
