import React from "react";

import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineMessage,
} from "react-icons/ai";

import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-4/5 m-auto cursor-default">
      <div className="md:flex md:justify-between sm:grid sm:grid-cols-2 sm:justify-center items-center my-10">
        <div className="space-y-5 py-5 border-b">
          <h1 className="text-3xl font-bold cursor-pointer">MyTinerary</h1>
          <div className="flex space-x-5">
            <AiFillFacebook size={"1.5rem"} className="cursor-pointer" />
            <AiFillInstagram size={"1.5rem"} className="cursor-pointer" />
            <AiFillTwitterSquare size={"1.5rem"} className="cursor-pointer" />
            <AiOutlineWhatsApp size={"1.5rem"} className="cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlinePhone />
            <p className="text-gray-900">+57 (602) 3242566</p>
          </div>
          <div className="flex items-center space-x-2">
            <AiOutlineMessage />
            <p className="text-gray-900">(+57) 300 64450264</p>
          </div>
          <div className="flex items-center space-x-2">
            <CiLocationOn />
            <p className="text-gray-900">Cr 73 2C - 98, Cali - Valle, Colombia</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <h1 className="font-bold">Travel</h1>
          <a className="text-xs text-gray-900" href="/">
            About Us
          </a>
          <a className="text-xs text-gray-900" href="/">
            Services
          </a>
          <a className="text-xs text-gray-900" href="/">
            Blog
          </a>
          <a className="text-xs text-gray-900" href="/">
            Contact Us
          </a>
          <a className="text-xs text-gray-900" href="/">
            About Us
          </a>
        </div>

        <div className="flex flex-col space-y-3">
          <h1 className="font-bold">Acount</h1>
          <a className="text-xs text-gray-900" href="/">
            Signup
          </a>
          <a className="text-xs text-gray-900" href="/">
            Login
          </a>
          <a className="text-xs text-gray-900" href="/">
            View Trips
          </a>
          <a className="text-xs text-gray-900" href="/">
            Contact
          </a>
          <a className="text-xs text-gray-900" href="/">
            About
          </a>
        </div>

        <div className="flex flex-col space-y-3">
          <h1 className="font-bold">Find Us!</h1>
          <div className="flex justify-center mx-2 items-center">
            <iframe
              title="google map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.830822341064!2d-76.55407371541395!3d3.391449242822469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a3e271340e0b%3A0x27872f4026787fca!2sCra.%2073%20%232c98%2C%20Las%20Farallones%2C%20Cali%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1sen!2sma!4v1728338965007!5m2!1sen!2sma"
              width="300"
              height="200"
              className="border border-gray-300 rounded-lg shadow-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;