import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie } from '../store/actions/moiveActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removemovie } from '../store/reducers/movieSlice';
import Loading from '../components/Loading';

const MovieDetails = () => {
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
    : '';

  if (!info || !info.detail) {
    return <Loading />;
  }

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${imageUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%]"
    >

      <nav className="h-[10vh] w-full text-zinc-100  flex items-center gap-10 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line text-xl"
        ></Link>

        <a target='_blank' href={info.detail.homepage} className="hover:text-white">
          <i className="ri-external-link-fill"></i>
        </a>
        <a target='_blank' href="#" className="hover:text-white">
          <i className="ri-earth-fill"></i>
        </a>
        <a target='_blank' href="#" className="hover:text-white">
          IMDB
        </a>
      </nav>

      {/* Movie Info */}
      {/* <div className="text-white mt-10">
        <h1 className="text-4xl font-bold">{info.detail.title}</h1>
        <p className="mt-4 text-zinc-300 max-w-2xl">{info.detail.overview}</p>
      </div> */}
    </div>
  );
};

export default MovieDetails;
