import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {asyncloadperson} from ".././store/actions/personAction"
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "../components/Loading";
// import HorizantalCard from "../partials/HorizantalCard"

const personDetails = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  const imageUrl = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : "";

  if (!info || !info.detail) {
    return <Loading />;
  }
  const video = info?.videos;

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;

  const handleOpenTrailer = () => {
    window.open(youtubeUrl, "_blank");
  };
  return (
    <div>personDetails</div>
  )
}

export default personDetails