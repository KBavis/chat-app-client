import React from "react";
import { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import DropDownMenu from "../../layout/DropDownMenu";
import messageContext from "../../../context/messages/messageContext";

const TopBar = () => {
   /**
    * ========================
    * CONTEXT AND GLOBAL STATES
    * =========================
    */
   const { current } = useContext(ConversationsContext);
   const { user } = useContext(AuthContext);
   const { messages } = useContext(messageContext);

   /**
    * =================
    * LOCAL STATES
    * ================
    */

   const [currUsers, setCurrUsers] = useState("");
   const [currImage, setCurrImage] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);

   //Updates Listed Conversation Users
   useEffect(() => {
      //Filter Users To Ensure We Don't Include Auth User
      let convoUsers = current?.users?.filter(
         (u) => u?.user_id !== user?.user_id
      );

      //Construct String of Users Names
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
      //Ensure There Are Multiple Users In Conversation
      if (current?.users.length >= 2) {
         if (messages && messageContext.length > 0) {
            //Ensure That Auth User Is Not Sender
            if (messages[messages.length - 1].sender !== user.user_id) {
               setCurrImage(messages[messages.length - 1].sender?.profileImage);
            }
         } else {
            //Set Image To NON-AUTH User Profile Image That Sent Most Recent Message
            if (
               messages &&
               messages.length > 0 &&
               messages[messages.length - 1].sender?.user_id !== user.user_id
            ) {
               setCurrImage(messages[messages.length - 1].sender?.profileImage);
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

   //On-Click To Open Modal (Add User, Leave Conversation, Pin Conversation)
   const onClick = () => {
      setMenuOpen(!menuOpen);
   };

   //Helper Function To Find Most Recent Message That Wasn't Sent By You
   const findRecentMessage = () => {
      if (messages) {
         for (let i = messages.length - 1; i >= 0; i--) {
            const senderId = messages[i].senderId;
            const senderUserId = messages[i].sender?.user_id;

            // Check for existence of senderId or sender.user_id and return the message
            if (senderId !== undefined || senderUserId !== undefined) {
               if (senderId !== undefined && senderId !== user.user_id) {
                  return messages[i];
               } else if (
                  senderUserId !== undefined &&
                  senderUserId !== user.user_id
               ) {
                  return messages[i];
               }
            }
         }
      }
      return null;
   };

   //Return Renderable JSX
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
