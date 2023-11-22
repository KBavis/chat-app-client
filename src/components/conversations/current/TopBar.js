import React from "react";
import { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import img from "../../../images/default.jpg";
import DropDownMenu from "../../layout/DropDownMenu";
import messageContext from "../../../context/messages/messageContext";
const TopBar = () => {
   const { current } = useContext(ConversationsContext);
   const { user } = useContext(AuthContext);
   const { messages } = useContext(messageContext);
   const [currUsers, setCurrUsers] = useState("");
   const [currImage, setCurrImage] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const [recentMessage, setRecentMessage] = useState(null);

   useEffect(() => {
      let convoUsers = current?.users?.filter(
         (u) => u?.user_id !== user?.user_id
      );
      let users = "";
      if (convoUsers) {
         for (let i = 0; i < convoUsers.length; i++) {
            users +=
               convoUsers[i].firstName + " " + convoUsers[i].lastName + ", ";
         }
         setCurrUsers(users.substring(0, users.length - 2));
      }
   }, [current, user]);

   //Update Conversation Image When New Messages Sent
   useEffect(() => {
      if (current?.users.length >= 2) {
         if (messages && messageContext.length > 0) {
            //Ensure That Auth User Is Not Sender
            if (messages[messages.length - 1].sender !== user.user_id) {
               setCurrImage(messages[messages.length - 1].sender.profileImage);
               console.log("1");
            }
         } else {
            //Set Image To NON-AUTH User Profile Image That Sent Most Recent Message
            if (
               messages &&
               messages.length > 0 &&
               messages[messages.length - 1].sender.user_id !== user.user_id
            ) {
               setCurrImage(messages[messages.length - 1].sender.profileImage);
               console.log("2");
            } else {
               //Set Image To Most Recent Message That Was Not Sent By You
               let message = findRecentMessage();
               if (message !== null) {
                  setCurrImage(message.sender.profileImage);
               } else {
                  //Set Image To First User Added That Isn't You
                  let nonAuthUsers = current.users.filter(
                     (u) => u?.user_id !== user?.user_id
                  );
                  setCurrImage(nonAuthUsers[0].profileImage);
               }
            }
         }
      }
   }, [messages, current]);

   const onClick = () => {
      setMenuOpen(!menuOpen);
   };

   //Helper Function To Find Most Recent Message That Wasn't Sent By You
   const findRecentMessage = () => {
      if (messages) {
         for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].sender.user_id !== user.user_id) {
               return messages[i];
            }
         }
      }
      return null;
   };

   //@TODO: Make It So Each Users Name Is Clickable (i.e Click That User Will Bring You To That User's Profile)
   return current ? (
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
   ) : (
      ""
   );
};

export default TopBar;
