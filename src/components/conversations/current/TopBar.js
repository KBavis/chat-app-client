import React from "react";
import { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import img from "../../../images/1.jpg";
import DropDownMenu from "../../layout/DropDownMenu";
const TopBar = () => {
   const { current } = useContext(ConversationsContext);
   const { user } = useContext(AuthContext);
   const [currUsers, setCurrUsers] = useState("");
   const [currImage, setCurrImage] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);

   useEffect(() => {
      let users = "";
      if (current) {
         for (let i = 0; i < current?.users?.length; i++) {
            users +=
               current.users[i].userName === user.userName
                  ? ""
                  : current.users[i].firstName +
                    " " +
                    current.users[i].lastName +
                    ", ";
         }
         setCurrUsers(users.substring(0, users.length - 2));
      }
   }, [current]);

   useEffect(() => {
      if (current?.image) {
         setCurrImage(current.image);
      } else {
         setCurrImage(img);
      }
   }, [current]);

   //@TODO: Open Menu Modal That Gives User Option To Add A User To The Conversaiton, Leave The Conversation, Pin The Conversation, Etc.
   const onClick = () => {
      setMenuOpen(!menuOpen);
   };

   //@TODO: Make It So Each Users Name Is Clickable (i.e Click That User Will Bring You To That User's Profile)
   return (
      <div className="relative">
         <div className="flex items-center">
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
            <div className="text-3xl mr-5">
               <i
                  onClick={onClick}
                  className="fa-solid fa-ellipsis cursor-pointer text-slate-800 hover:scale-105"
               ></i>
            </div>
            <DropDownMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
         </div>

         {current !== null && (
            <div className="w-full border-[1px] mt-10 border-slate-800"></div>
         )}
      </div>
   );
};

export default TopBar;
