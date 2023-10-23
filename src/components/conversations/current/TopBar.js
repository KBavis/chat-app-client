import React from "react";
import { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
const TopBar = () => {
   const { current } = useContext(ConversationsContext);
   const { user } = useContext(AuthContext);
   const [currUsers, setCurrUsers] = useState("");
   const [currImage, setCurrImage] = useState("");

   useEffect(() => {
      let users = "";
      for (let i = 0; i < current?.users?.length; i++) {
         users +=
            current.users[i].name === user.name
               ? ""
               : current.users[i].name + ", ";
      }
      setCurrUsers(users.substring(0, users.length - 2));
   }, [current]);

   useEffect(() => {
      setCurrImage(current?.image);
   }, [currImage, current]);

   //@TODO: Make It So Each Users Name Is Clickable (i.e Click That User Will Bring You To That User's Profile)
   return (
      <div className="w-full flex items-center">
         {currImage && (
            <img
               className="w-20 h-20 rounded-full object-cover object-top border-2 border-slate-800 mr-5"
               src={currImage}
            ></img>
         )}
         {currUsers && (
            <h1 className="text-2xl text-left font-semibold text-slate-800 cursor-pointer">
               {currUsers}
            </h1>
         )}
      </div>
   );
};

export default TopBar;
