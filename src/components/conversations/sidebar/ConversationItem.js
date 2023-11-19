import React, { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import img from "../../../images/1.jpg";
import MessageContext from "../../../context/messages/messageContext";

const ConversationItem = ({ conversation }) => {
   const { deleteConversation, setCurrent, clearCurrent, current, image } =
      useContext(ConversationsContext);

   const messageContext = useContext(MessageContext);

   const { user } = useContext(AuthContext);

   const [conversationUsers, setConversationUsers] = useState([]);
   const [recentMessage, setRecentMessage] = useState({});
   const [currImage, setCurrImage] = useState("");

   const { conversation_id, users, messages, conversationStart } = conversation;

   const onDelete = () => {
      deleteConversation(conversation_id);
   };

   const onClick = () => {
      setCurrent(conversation);
   };

   useEffect(() => {
      if (users !== null || users.length > 0) {
         var convoUsers = users?.filter(
            (currUser) => currUser?.user_id !== user?.user_id
         );
         if (convoUsers.length > 3) {
            let firstThree = convoUsers.splice(0, 3);
            convoUsers = [...firstThree, { name: "..." }];
         }
         setConversationUsers(convoUsers);
      }
   }, [conversation.users]);

   //Update Recent Message and Recent User Profile Image
   useEffect(() => {
      if (current && conversation) {
         if (current.conversation_id === conversation.conversation_id) {
            if (
               messageContext.messages !== null &&
               messageContext.messages.length > 0
            ) {
               //Set Recent Message To Most Recently Sent Message
               setRecentMessage(
                  messageContext.messages[messageContext.messages.length - 1]
               );
               //Set Conversation Item Image To Recent User's Profile Image (AS LONG AS IT ISN'T YOU)
               if (
                  messageContext.messages[messageContext.messages.length - 1]
                     .sender.user_id !== user.user_id
               ) {
                  setCurrImage(
                     messageContext.messages[messageContext.messages.length - 1]
                        .sender?.profileImage
                  );
               }
            }
         }
      }
   }, [messageContext.messages]);

   useEffect(() => {
      //Set Most Recent Message On Component Load
      if (messages) {
         setRecentMessage(messages[messages.length - 1]);
      }

      //Set Conversation Image On Component Load
      if (image == null) {
         setCurrImage(img);
      } else {
         setCurrImage(image);
      }
   }, []);

   //Set The Most Recent Image To Be Used For The Conversation Item
   // useEffect(() => {}, [recentMessage]);

   {
      /* @TODO Update The Profile Image Shown Based On Most Recent Sent Messge 
         i.e Whichever user sends most recent message, make it their image

      */
   }

   return (
      <div
         onClick={onClick}
         className="w-full flex mt-6 py-2 hover:cursor-pointer hover:scale-105 hover:bg-slate-200"
      >
         <div className="flex items-center mr-6">
            <img
               className="w-16 h-16 rounded-full object-cover object-top transform scale-100 transition-transform duration-1000 ease-in"
               src={currImage}
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
                     {recentMessage != null ? recentMessage.content : ""}
                  </p>
               </div>
               {/* @TODO Consider Using a React Moment To Format Date AND Time */}
               <p className="text-gray-600 text-xs transition-transform duration-1000 ease-in">
                  {recentMessage?.sendDate
                     ? new Date(recentMessage.sendDate).toLocaleDateString() +
                       " " +
                       new Date(recentMessage.sendDate).toLocaleTimeString()
                     : ""}
               </p>
            </div>
         </div>
      </div>
   );
};

export default ConversationItem;
