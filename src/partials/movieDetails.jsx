import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../store/actions/moiveActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removemovie } from "../store/reducers/movieSlice";
import Loading from "../components/Loading";
import HorizantalCard from "../partials/HorizantalCard"

const MovieDetails = () => {
  const { pathname } = useLocation()
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

  const imageUrl = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : "";

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${imageUrl})`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-[100%] h-[140vh] px-[10%]"
    >
      {/* Part 1 navigation */}

      <nav className="h-[10vh] w-full text-zinc-100  flex items-center gap-10 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line text-xl"
        ></Link>

        <a
          target="_blank"
          href={info.detail.homepage}
          className="hover:text-white"
        >
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-white"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          className="hover:text-white"
        >
          IMDB
        </a>
      </nav>

      {/* Part 2 Poster and details */}

      <div className="w-full flex">
        <img
          className="h-[55vh] rounded-xl object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path
            }`}
          alt=""
        />

        <div className="content ml-15 text-white">
          <h1 className=" text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <span className="text-2xl font-bold text-zinc-300 ">
              ( {info.detail.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="flex mt-2 text-white items-center gap-5 relative">
            <span className="absolute text-white text-md font-semibold rounded-full w-[5vh] h-[5vh] flex items-center justify-center bg-yellow-600 ">
              {Math.floor(info.detail.vote_average * 10)}
              <sup>%</sup>
            </span>

            <h1 className="ml-10 font-semibold text-2xl w-[60px] leading-5 ">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name)}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic mt-3 text-zinc-200 ">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-5 font-semibold">
            overview
          </h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mt-5 font-semibold">
            Movie Translated
          </h1>
          <p className="text-sm mb-8">{info.translations.join(", ")}</p>
          <Link className="mt-10 py-2 px-3 bg-[#6556cd] rounded-lg" to={`${pathname}/trailer`}>
            <i class="text-xl mr-2 ri-play-fill"></i>
            Play Trailer</Link>



        </div>
      </div>

      {/* Part 3 availble on platform */}

      <div className="w-80% mb-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-3 items-center text-white">
            <h1>Available on platforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-3 mt-3 items-center text-white">
            <h1>Available on rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-4 mt-3 items-center text-white">
            <h1>Available to buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>


      {/*Part 4 Recommendation and similar stuff */}
      <hr className="border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl mt-3 font-bold text-white">Recommendations & Similar</h1>
      <HorizantalCard
        data={
          info?.recommendations?.length > 0
            ? info.recommendations
            : info?.similar
        }

      />


      <Outlet />

    </div>
  );
};

export default MovieDetails;
