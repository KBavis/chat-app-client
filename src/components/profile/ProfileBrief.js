import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import img from "../../images/default.jpg";
import UserProfile from "./UserProfile";

/**
 *
 * @returns Displays Authenticated Users Information
 */
const ProfileBrief = () => {
   /**
    * ==========================
    * CONTEXT AND GLOBAL STATES
    * ==========================
    */
   const { user } = useContext(AuthContext);

   //Extract Necessary Attributes From Authenticated User
   let firstName, lastName, userName, profileImage;
   if (user) {
      ({ firstName, lastName, userName, profileImage } = user);
   }

   /**
    *  ==========================
    *  Local States
    *  ========================
    */
   const [currImage, setCurrImage] = useState(img);
   const [modalOpen, setModalOpen] = useState("");

   //Set Profile Image
   useEffect(() => {
      if (profileImage) {
         setCurrImage(profileImage);
      }
   }, [user]);

   //On-Click To Allow User To Edit Profile
   const onClick = () => {
      setModalOpen(true);
   };

   //Return Renderable JSX (if user truthy value)
   return user ? (
      <div className="flex space-x-6">
         {currImage && (
            <img
               className="w-24 h-24 rounded-full object-cover object-top border-sky-500 border-2"
               src={currImage}
               alt="User Image"
            />
         )}
         <div className="flex-1">
            <div className="flex justify-between items-center">
               <h1 className="text-sky-500 text-2xl font-bold">
                  {firstName + " " + lastName}
               </h1>{" "}
               <i
                  onClick={onClick}
                  className="fa-solid fa-pen text-gray-500 transition-opacity hover:opacity-70 cursor-pointer"
               ></i>
            </div>
            <h2 className="font-light text-md text-gray-500">{userName}</h2>
         </div>
         <UserProfile
            modalOpen={modalOpen}
            onClose={() => setModalOpen(false)} //edit user profile information
         />
      </div>
   ) : (
      "Please Sign In"
   );
};

export default ProfileBrief;
