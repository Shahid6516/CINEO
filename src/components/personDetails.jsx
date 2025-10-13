import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from ".././store/actions/personAction"
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "../components/Loading";
import HorizantalCard from "../partials/HorizantalCard";
import Dropdown from "../partials/Dropdown"
// import HorizantalCard from "../partials/HorizantalCard"

const personDetails = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [category, setcategory] = useState("movie")

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

 




  return (
    <div className="w-screen h-[175vh] px-[8%] flex flex-col">
      {/* Part 1 navigation */}
      <nav className="h-[10vh] w-full   text-zinc-100  flex items-center gap-10 text-lg">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line text-xl"
        ></Link>


      </nav>

      {/* Part 2 left poster and details */}

      <div className="w-full flex">
        <div className="w-[20%]">
          <img
            className="h-[40vh] rounded-xl object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path
              }`}
            alt=""
          />
          <hr className="border-none w-[75%] mt-4 mb-5 h-[2px] bg-zinc-500" />

          {/* Social media links */}
          <div className="text-2xl text-white flex gap-x-5">


            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              className="hover:text-white"
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              className="hover:text-white"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              className="hover:text-white"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}`}
              className="hover:text-white"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>


          </div>

          {/* Personal information */}

          <h1 className="text-2xl text-zinc-400  font-semibold">Person Info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold  ">Known for</h1>
          <h1 className=" text-zinc-400  ">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-2">Gender</h1>
          <h1 className=" text-zinc-400  ">{info.detail.gender === 2 ? "Male" : "Female"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-2">Birthday</h1>
          <h1 className=" text-zinc-400  ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-2">Also known as</h1>
          <h1 className=" text-zinc-400  ">{info.detail.also_known_as.join(", ")}</h1>

        </div>

        {/* Part 3 right detail and information */}


        <div className="w-[80%] ml-3 ">
          <h1 className=" text-zinc-400 text-5xl font-black my-3  ">{info.detail.name}</h1>
          <h1 className="text-xl text-zinc-300 font-semibold mt-2">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-xl text-zinc-300 font-semibold mt-2"> Known For</h1>
          <HorizantalCard data={info.combined_credits.cast} />


          <div className="w-full flex justify-between">
            <h1 className="text-xl text-zinc-300 font-semibold mt-2"> Acting</h1>
            <Dropdown title="Catgory" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />

          </div>


          <div className="list-disk text-zinc-400 w-full mt-5 h-[60vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">



            {info?.[category + "_credits"]?.cast?.map((c, i) => (
              <li key={i} className="list-disk hover:text-white duration-300 cursor-pointer p-5 ml-5">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="block">Character Name: {c.character || "Character Name"}</span>
                </Link>
                <span className="mt-2">Movie Name: {c.title || c.original_title || "Movie/Show Name"}</span>
              </li>
            ))}







        </div>


      </div>
    </div>













    </div >
  )
}

export default personDetails