import React, { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import defaultImage from "../../../images/default.jpg";
import MessageContext from "../../../context/messages/messageContext";
import subsribeToConversation from "../../../utils/websocket-client";

/**
 * Individual Conversation Item Listed In Our Sidebar
 *
 * @param {ConversationResponseDTO} conversation
 * @returns
 */
const ConversationItem = ({ conversation }) => {
   /**
    * ===================
    * Contexts and Global States
    * ===================
    */

   const {
      //state functions
      deleteConversation,
      setCurrent,
      clearCurrent,
      recieveMessage,
      //state variables
      current,
      conversations,
      recentConversation,
      pinned,
      recent,
   } = useContext(ConversationsContext);

   const { user } = useContext(AuthContext);

   /**
    *  ==========================
    *  Local States
    *  ========================
    */
   const [conversationUsers, setConversationUsers] = useState([]);
   const [recentMessage, setRecentMessage] = useState({});
   const [currImg, setCurrImage] = useState(defaultImage);
   const messageContext = useContext(MessageContext);

   /**
    * ======================
    * Destructuring Of Props
    * ======================
    */
   const { conversation_id, users, messages, conversationStart } = conversation;

   /**
    * ==========================
    * Use Effect (For Re-Renders)
    * ===========================
    */

   /**
    * Update Recent Message When Recieved From Another User
    */
   useEffect(() => {
      //ensure conversation & recent conversation exists
      if (conversation && recentConversation) {
         if (
            conversation.conversation_id === recentConversation.conversation_id
         )
            setRecentMessage(recent);
      }
   }, [recent, recentMessage]);

   //Updates On Inital Mounting (Converastion Image, Converastion Users, WebSocket Init)
   useEffect(() => {
      //Set Lates Message On Inital Load (As All Messages Will Be Context)
      if (messages && messages.length > 0) {
         setRecentMessage(messages[messages.length - 1]);
      }

      //Set Converastion Image To Most Recent Message Sent Users Profile Image (If User Isn't Auth User)
      if (messages && messages.length > 0) {
         let mostRecentMessageSent = findRecentMessage();
         if (mostRecentMessageSent) {
            let imageToSet = mostRecentMessageSent.sender.profileImage
               ? mostRecentMessageSent.sender.profileImage
               : defaultImage;
            setCurrImage(imageToSet);
         } else {
            //Set To Earliest User That Isn't Auth User
            let convoUsers = users.filter((u) => u?.user_id !== user?.user_id);

            let imageToSet = convoUsers[0].profileImage
               ? convoUsers[0].profileImage
               : defaultImage;
            setCurrImage(imageToSet);
         }
      } else {
         //Set To Earliest User That Isn't Auth User
         let convoUsers = users.filter((u) => u?.user_id !== user?.user_id);

         let imageToSet = convoUsers[0].profileImage
            ? convoUsers[0].profileImage
            : defaultImage;
         setCurrImage(imageToSet);
      }
   }, []);

   useEffect(() => {
      //Set Conversation Users
      if (users && users.length > 0) {
         let convoUsers = users?.filter(
            (currUser) => currUser?.user_id !== user?.user_id
         );
         if (convoUsers.length > 3) {
            let firstThree = convoUsers.splice(0, 3);
            convoUsers = [...firstThree, { name: "..." }];
         }
         setConversationUsers(convoUsers);
      }
   }, [users]);

   /**
    * Update Recent Message Sent Upon Recieving New Messages / Sending New Messages
    */
   useEffect(() => {
      let mostRecent = null;
      //Ensure That Current && Converastion Are Equal
      if (current && conversation) {
         if (current.conversation_id === conversation.conversation_id) {
            if (
               messageContext.messages !== null &&
               messageContext.messages.length > 0
            ) {
               //Extract Recent Message From MessageContext
               let recentMessageMsgContext =
                  messageContext.messages[messageContext.messages.length - 1];

               //Check If There Is a Newly Received Message
               if (
                  recentConversation &&
                  recentConversation.messages &&
                  recentConversation.conversation_id ===
                     conversation.conversation_id &&
                  recentConversation.messages.length > 0
               ) {
                  //Extract Newly Received Message If Existent
                  let recentConvoMessage =
                     recentConversation.messages[
                        recentConversation.messages.length - 1
                     ];

                  //Most Recent Date Associated With Messages In MessageContext
                  const messageDate =
                     recentMessageMsgContext && recentMessageMsgContext.sendDate
                        ? new Date(recentMessageMsgContext.sendDate)
                        : new Date("2000-01-01");

                  //Most Recent Date Assocaited With Recent Conversation (MessagesRecieved)
                  const convoDate =
                     recentConvoMessage && recentConvoMessage.sendDate
                        ? new Date(recentConvoMessage.sendDate)
                        : new Date("2000-01-01");

                  //Set Most Recent Messages To Earlier of The Two
                  mostRecent =
                     messageDate >= convoDate
                        ? recentMessageMsgContext
                        : recentConvoMessage;
               }

               //Update Recent Message To Be The Later Of The Two
               mostRecent =
                  mostRecent === null ? recentMessageMsgContext : mostRecent;
               setRecentMessage(mostRecent);
            }
         }
      }
   }, [
      messageContext.messages?.length,
      recentConversation,
      conversation.conversation_id,
   ]);

   /**
    * Updates Users Lsited
    */
   useEffect(() => {
      if (current?.conversation_id === conversation?.conversation_id) {
         //Filter Convo Users
         let convoUsers = current.users?.filter(
            (currUser) => currUser?.user_id !== user?.user_id
         );
         //Cut-Off Names If Length Exceeds 3
         if (convoUsers.length > 3) {
            let firstThree = convoUsers.splice(0, 3);
            convoUsers = [...firstThree, { name: "..." }];
         }
         setConversationUsers(convoUsers);
      }
   }, [current?.users]);

   /**
    * Helper Function To Find Most Recent Message Not Sent By You
    *
    * @returns most recent message
    */
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

   /**
    * Function to update the currently viewed conversation (Global State)
    */
   const onClick = () => {
      setCurrent(conversation);
   };

   /**
    * Callback function for newly received messages
    *
    * @param {MessageDTO} message
    * @param {Long} conversation_id
    */
   const handleRecievedMessage = (message, conversation_id) => {
      recieveMessage(message, conversation_id);
   };

   //Return Rendered JSX
   return (
      <div
         onClick={onClick}
         className="w-full flex mt-6 py-2 px-2 hover:cursor-pointer hover:scale-105 hover:bg-slate-200 "
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
                     {recentMessage?.content &&
                     recentMessage.content.length > 50
                        ? recentMessage.content.substring(0, 50) + "..."
                        : recentMessage.content}
                  </p>
               </div>
               <p className="text-gray-600 text-xs transition-transform duration-1000 ease-in ">
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
