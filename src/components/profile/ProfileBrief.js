import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
const ProfileBrief = (props) => {
   {
      /* @TODO Change This To Extract The Current Authenticated Users Credentials 
         @TODO Add On Click For Icon To Go To Edit Profile Page 
      */
   }
   const { user } = useContext(AuthContext);
   return (
      <div className="flex space-x-6">
         <img
            className="w-24 h-24 rounded-full object-cover object-top border-sky-500 border-2"
            src={user.profileImage}
            alt="User Image"
         />
         <div className="flex-1">
            <div className="flex justify-between items-center">
               <h1 className="text-sky-500 text-2xl font-bold">{user.name}</h1>{" "}
               <i className="fa-solid fa-pen text-gray-500 transition-opacity hover:opacity-70 cursor-pointer"></i>
            </div>
            <h2 className="font-light text-md text-gray-500">{user.title}</h2>
         </div>
      </div>
   );
};

export default ProfileBrief;
