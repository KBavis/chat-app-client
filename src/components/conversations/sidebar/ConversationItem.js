import React, { useContext, useEffect, useState } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import AuthContext from "../../../context/auth/authContext";
import def from "../../../images/default.jpg";
import MessageContext from "../../../context/messages/messageContext";
import subsribeToConversation from "../../../utils/websocket-client";

const ConversationItem = ({ conversation }) => {
   const {
      deleteConversation,
      setCurrent,
      clearCurrent,
      current,
      conversations,
      recentConversation,
      pinned,
      recieveMessage,
      recent,
   } = useContext(ConversationsContext);

   const { user } = useContext(AuthContext);

   const [conversationUsers, setConversationUsers] = useState([]);
   const [recentMessageContent, setRecentMessageContent] = useState("");
   const [recentMessage, setRecentMessage] = useState({});
   const [currImg, setCurrImage] = useState(def);
   const messageContext = useContext(MessageContext);
   const [currentConversation, setCurrentConversation] = useState({});
   const [isRecentConversation, setIsRecentConversation] = useState({});

   const { conversation_id, users, messages, conversationStart } = conversation;

   const onClick = () => {
      setCurrent(conversation);
   };

   /**
    *  1) we need to update the conversation item recent message when one
    *       - Logic has shifted so that a RECIEVED MESSAGE will be put into the CONVERSATION STATE that has SAME CONVERSATION ID as Message Recieved
    *       - Due to this, we need to find the associated Conversation in Conversation State, And Update Our Profile Image and Our Recent Message Based On These Updates
    *       - We Need To Steal Logic From Messages To Updates The Profile Image, Since This Wont Be In State
    *
    **/

   /**
    * Determine If This Conversation Is The Recently Updated Conversation
    */

   /**
    *  Set Current Conversation Based on Newly Clicked Conversation
    */
   useEffect(() => {
      setCurrentConversation(current);
   }, [current]);

   useEffect(() => {
      console.log(
         "//////////////// ----- RECENT MESSAGE UPDATED ----- ///////////"
      );
      console.log("FOR CONVERSATION: ");
      console.log(conversation);
      console.log(recentMessage);
   }, [recentMessage]);

   useEffect(() => {
      setRecentMessage(recent);
   }, [recent]);

   //Set Recent Message, Conversation Users, And Conversation Image
   useEffect(() => {
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

      //Subscribe to each conversation for real-time functionality
      //@TODO: Move this logic to seperate user effect that only executes when more conversations are created
      const subscribe = async () => {
         console.log(
            "Attemtping To Subsribe To Conversation: " + conversation_id
         );
         await subsribeToConversation(conversation_id, handleRecievedMessage);
      };
      subscribe();
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

   //Update Recent Message When Another Is Sent
   useEffect(() => {
      let mostRecent = null;
      if (current && conversation) {
         if (current.conversation_id === conversation.conversation_id) {
            if (
               messageContext.messages !== null &&
               messageContext.messages.length > 0
            ) {
               //Extract Recent Message From MessageContext
               let recentMessageMsgContext =
                  messageContext.messages[messageContext.messages.length - 1];

               console.log("----MOST RECENT MESSAGE SENT-----");
               console.log(recentMessageMsgContext);
               console.log("----RECENT CONVERSATION---");
               console.log(recentConversation);
               console.log("----RECENT CONVERSATION ID -----");
               console.log(recentConversation?.conversation_id);
               console.log("-----CONVERSATION IN THIS ITEM ID----");
               console.log(conversation.conversation_id);
               if (
                  recentConversation &&
                  recentConversation.messages &&
                  recentConversation.conversation_id ===
                     conversation.conversation_id &&
                  recentConversation.messages.length > 0
               ) {
                  //Extract Recent Message From Recent Conversation
                  let recentConvoMessage =
                     recentConversation.messages[
                        recentConversation.messages.length - 1
                     ];
                  console.log("----RECENT CONVO MESSAGE---");
                  console.log(recentConvoMessage);
                  const messageDate =
                     recentMessageMsgContext && recentMessageMsgContext.sendDate
                        ? new Date(recentMessageMsgContext.sendDate)
                        : new Date("2000-01-01");
                  console.log("---RECENT MESSAGE DATE----");
                  console.log(messageDate);

                  const convoDate =
                     recentConvoMessage && recentConvoMessage.sendDate
                        ? new Date(recentConvoMessage.sendDate)
                        : new Date("2000-01-01");
                  console.log("---RECENT CONVERSATION DATE----");
                  console.log(convoDate);

                  mostRecent =
                     messageDate >= convoDate
                        ? recentMessageMsgContext
                        : recentConvoMessage;
                  console.log("RECENT MESSAGE");
                  console.log(mostRecent);
               }

               mostRecent =
                  mostRecent === null ? recentMessageMsgContext : mostRecent;
               console.log("-------MOST RECENT-------");
               console.log(mostRecent);
               setRecentMessage(mostRecent);
            }
         }
      }
   }, [
      messageContext.messages?.length,
      recentConversation,
      conversation.conversation_id,
   ]);

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

   //Callback Function To Handle Recieved Messages
   //@TODO Change this logic to be by Conversation
   const handleRecievedMessage = (message, conversation_id) => {
      recieveMessage(message, conversation_id);
   };

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
