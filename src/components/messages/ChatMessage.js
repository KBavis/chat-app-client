import ConversationsContext from "../../context/conversations/conversationContext";
import MessageContext from "../../context/messages/messageContext";
import dayDifference from "../../utils/dateUtil";
import { useContext, useEffect, useState } from "react";

const ChatMessage = ({ text, sentByUser, message }) => {
   const { messages } = useContext(MessageContext);
   const { conversations, recent } = useContext(ConversationsContext);
   const [displayDate, setDisplayDate] = useState(false);

   useEffect(() => {
      setDisplayDate(showDateMessages() || showDateConversations());
   }, [message]);

   const showDateConversations = () => {
      if (recent.message_id === message.message_id) {
         console.log("THIS IS INDEED TRUE!!!");

         //Determine If This Is The First Message Sent, If So, Return True
         //@TODO : Update this logic as follows
         /**
          *  1) It Needs To Return True If First Message Sent
          *  2) It Needs To Return True If The Message Prior (Either In MessageContext or Currently) Occured More Than A Day Agop
          */
         if (!messages || messages.length === 0) {
            return true;
         }
         return false;
      }
   };
   const showDateMessages = () => {
      if (!messages || messages.length == 0) {
         return false;
      } else if (
         messages.length === 1 ||
         messages[0].message_id === message.message_id
      ) {
         //First Message, Always Show Date
         return true;
      } else {
         const lastMessageSent = messages[messages.length - 2];
         const lastMessageDate = new Date(lastMessageSent.sendDate);
         const currentDate = new Date(message.sendDate);
         return dayDifference(lastMessageDate, currentDate);
      }
   };

   return (
      <div className="flex flex-col">
         {/* Display Date Only If First Message Sent Or Difference In Last Message Sent Is A Day */}
         {displayDate && (
            <div className="flex">
               {message.sendDate && (
                  <p className="text-xs m-auto justify-center items-center">
                     {new Date(message.sendDate).toLocaleDateString() +
                        " " +
                        new Date(message.sendDate).toLocaleTimeString()}
                  </p>
               )}
            </div>
         )}
         <div className="flex justify-between">
            {!sentByUser && (
               <img
                  src={message?.sender?.profileImage}
                  className="w-12 h-12 rounded-full object-cover object-top border-sky-500 border-2 mr-4"
                  alt="profileImage"
               />
            )}
            <div
               className={`${
                  sentByUser
                     ? "ml-auto bg-blue-500 text-white"
                     : "mr-auto bg-gray-200"
               } p-3 rounded-lg mb-2 max-w-xs`}
            >
               {text}
            </div>
         </div>
      </div>
   );
};

export default ChatMessage;
