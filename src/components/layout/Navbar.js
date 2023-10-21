import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <div className="bg-sky-500 flex justify-between items-center p-3 z-999 w-full text-white font-roboto">
         <h1 className="text-4xl ml-5 font-bold">
            <i className="fa-solid fa-comment" /> Chit-Chat
         </h1>
         <ul className="flex space-x-6 text-lg">
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80 "
                  to="/"
               >
                  Home
               </Link>
            </li>
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80"
                  to="/about"
               >
                  About
               </Link>
            </li>
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80"
                  to="profile"
               >
                  Profile
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Navbar;
