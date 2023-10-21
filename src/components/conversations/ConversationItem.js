import React, { useContext } from "react";
import ConversationsContext from "../../context/conversations/conversationContext";

const ConversationItem = ({ conversation }) => {
   const { deleteConversation, setCurrent, clearCurrent } =
      useContext(ConversationsContext);

   const { id, users, recentMessage, image } = conversation;

   const onDelete = () => {
      deleteConversation(id);
      clearCurrent();
   };

   const setCurrentConversation = () => {
      setCurrent(conversation);
   };

   {
      /* @TODO Update The Profile Image Shown Based On Most Recent Sent Messge 
         i.e Whichever user sends most recent message, make it their image

         @TODO Make it so instead of just listing the recent sender of the message, 
         you list all Conversation Users Except Current Authenticated User 
         (no need to list yourself in a Conversation)

         @TODO Make it so when you hover a Conversation, it will make it the some sort of transition 
         such as making the text/img bigger or something like that

         @TODO Make it so when you click on a Conversation, it will update the Conversation Context and 
         set the Current Conversation to the Conversation that you selected

         @TODO Add Filtering Capabilities

      */
   }

   return (
      <div className="w-full flex mt-10 py-1 hover:cursor-pointer ">
         <div className="flex items-center mr-6">
            <img
               className="w-16 h-16 rounded-full object-cover object-top"
               src={image}
               alt="Conversation Pic"
            />
         </div>
         <div className="flex-1">
            <div className="flex justify-between">
               <div>
                  <h3 className="text-sky-500 text-lg text-semibold">
                     {recentMessage.sender}
                  </h3>
                  <p className="text-gray-600 text-s">
                     {recentMessage.content}
                  </p>
               </div>
               <p className="text-gray-400 text-xs">
                  {recentMessage.sendDate.toLocaleTimeString()}
               </p>
            </div>
         </div>
      </div>
   );
};

export default ConversationItem;
