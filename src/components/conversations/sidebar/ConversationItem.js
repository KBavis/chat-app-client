import React, { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import def from "../../../images/default.jpg";
import MessageContext from "../../../context/messages/messageContext";

const ConversationItem = ({ conversation }) => {
   const {
      deleteConversation,
      setCurrent,
      clearCurrent,
      current,
      conversations,
      pinned,
   } = useContext(ConversationsContext);

   const messageContext = useContext(MessageContext);

   const { user } = useContext(AuthContext);

   const [conversationUsers, setConversationUsers] = useState([]);
   const [recentMessageContent, setRecentMessageContent] = useState("");
   const [recentMessage, setRecentMessage] = useState({});
   const [currImg, setCurrImage] = useState(def);

   const { conversation_id, users, messages, conversationStart } = conversation;

   const onClick = () => {
      setCurrent(conversation);
   };

   //Set Recent Message, Conversation Users, And Conversation Image
   useEffect(() => {
      //Fetch Conversation Messages

      //Set Recent Message
      if (messages && messages.length > 0) {
         setRecentMessage(messages[messages.length - 1]);
      }

      //Set Image
      if (messages && messages.length > 0) {
         let mostRecentMessageSent = findRecentMessage();
         if (mostRecentMessageSent) {
            setCurrImage(mostRecentMessageSent.sender.profileImage);
         } else {
            //Set To Earliest User That Isn't Auth User
            let convoUsers = users.filter((u) => u?.user_id !== user?.user_id);
            setCurrImage(convoUsers[0].profileImage);
         }
      } else {
         //Set To Earliest User That Isn't Auth User
         let convoUsers = users.filter((u) => u?.user_id !== user?.user_id);
         setCurrImage(convoUsers[0].profileImage);
      }
   }, []);

   useEffect(() => {
      //Set Conversation Users
      if (users && users.length > 0) {
         let convoUsers = users?.filter(
            (currUser) => currUser?.user_id !== user?.user_id
         );
         console.log(convoUsers);
         if (convoUsers.length > 3) {
            let firstThree = convoUsers.splice(0, 3);
            convoUsers = [...firstThree, { name: "..." }];
         }
         setConversationUsers(convoUsers);
      }
   }, [users]);

   //Update Recent Message When Another Is Sent
   useEffect(() => {
      if (current && conversation) {
         if (current.conversation_id === conversation.conversation_id) {
            if (
               messageContext.messages !== null &&
               messageContext.messages.length > 0
            ) {
               //Set Recent Message To Most Recently Sent Message
               setRecentMessage(messages[messages.length - 1]);
            }
         }
      }
   }, [messageContext.messages]);

   //Update List of Conversation Users When a User Added
   useEffect(() => {
      //If This Is The Current Conversation, Update With Corresponding
      if (current?.conversation_id === conversation?.conversation_id) {
         let convoUsers = current.users?.filter(
            (currUser) => currUser?.user_id !== user?.user_id
         );
         if (convoUsers.length > 3) {
            let firstThree = convoUsers.splice(0, 3);
            convoUsers = [...firstThree, { name: "..." }];
         }
         setConversationUsers(convoUsers);
      }
   }, [current?.users]);

   //Helper Function To Find Most Recent Message That Wasn't Sent By You
   const findRecentMessage = () => {
      if (messages) {
         for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i]?.sender.user_id !== user?.user_id) {
               return messages[i];
            }
         }
      }
      return null;
   };

   return (
      <div
         onClick={onClick}
         className="w-full flex mt-6 py-2 hover:cursor-pointer hover:scale-105 hover:bg-slate-200 "
      >
         <div className="flex items-center mr-6">
            <img
               className="w-16 h-16 rounded-full object-cover object-top transform scale-100 transition-transform duration-1000 ease-in"
               src={currImg}
               alt="Conversation Pic"
            />
         </div>
         <div className="flex-1">
            <div className="flex justify-between">
               <div>
                  <h3 className="text-sky-500 text-base text-semibold transition-transform duration-1000 ease-in">
                     {conversationUsers.map(
                        (conversation, index) =>
                           `${
                              conversation.firstName +
                              " " +
                              conversation.lastName
                           }${
                              index === conversationUsers.length - 1 ? "" : ", "
                           }`
                     )}
                  </h3>
                  <p className="text-gray-600 text-s transition-transform duration-1000 ease-in">
                     {recentMessage.content && recentMessage.content.length > 50
                        ? recentMessage.content.substring(0, 50) + "..."
                        : recentMessage.content}
                  </p>
               </div>
               <p className="text-gray-600 text-xs transition-transform duration-1000 ease-in ">
                  {console.log(recentMessage)}
                  {recentMessage.sendDate &&
                     new Date(recentMessage.sendDate).toLocaleDateString() +
                        " " +
                        new Date(recentMessage.sendDate).toLocaleTimeString()}
                  {pinned === conversation_id && (
                     <i className="fa-solid fa-star text-lg ml-2 text-yellow-400"></i>
                  )}
               </p>
            </div>
         </div>
      </div>
   );
};

export default ConversationItem;
