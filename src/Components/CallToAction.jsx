import React from "react";
import { Link } from 'react-router-dom'; 
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

const CallToAction = () => {
  return (
    <div className="w-full absolute top-0 h-screen flex flex-col space-y-10 justify-center items-center mx-auto z-10">
      <div className="text-white text-center space-y-5">
        <h1 className="text-neutral-100 text-5xl font-bold cursor-default">MyTinerary</h1>
        <p className="text-neutral-100 cursor-default w-2/3 mx-auto">
          Find your perfect trip, designed by insiders who know and love their cities!
        </p>
      </div>

      <div className="space-x-4">
        <Link to="/cities">
          <button className="bg-white border rounded-md py-2 px-5 animate-pulse hover:bg-white hover:text-black hover:duration-300">
            Explore Now!
          </button>
        </Link>
      </div>

      <div className="text-white flex space-x-5">
        <AiFillFacebook size={"2rem"} className="cursor-pointer" />
        <AiFillInstagram size={"2rem"} className="cursor-pointer" />
        <AiFillTwitterSquare size={"2rem"} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CallToAction;