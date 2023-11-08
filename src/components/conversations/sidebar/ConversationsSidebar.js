import React, { useEffect, useContext, useState } from "react";
import ProfileBrief from "../../profile/ProfileBrief";
import FilterConversations from "./FilterConversations";
import Conversations from "./Conversations";
import ConversationsContext from "../../../context/conversations/conversationContext";
import CreateConversation from "./CreateConversation";
import UserContext from "../../../context/users/userContext";

const ConversationsSidebar = () => {
   const { getUserConversations, conversations } =
      useContext(ConversationsContext);

   const [modalOpen, setModalOpen] = useState(false);

   //Fetch Conversations Any Time Conversations Is Updated
   useEffect(() => {
      getUserConversations();
   }, [conversations]);

   const { users, getUsers, loading, filtered } = useContext(UserContext);
   useEffect(() => {
      getUsers();
   }, []);

   //Open Modal For User To Create Conversation
   const onClick = () => {
      setModalOpen(true);
   };
   return (
      <div className="m-auto pt-10 min-h-screen">
         <ProfileBrief />
         <div className="flex">
            <button
               onClick={onClick}
               className="px-4 py-2 rounded-full text-white justify-center font-medium items-center border-[1px] border-sky-500 m-auto bg-sky-500 mt-3 transition-colors duration-300 ease-in hover:bg-transparent hover:text-sky-500 "
            >
               Create Conversation
            </button>
         </div>
         {conversations != null ? <FilterConversations /> : ""}
         <Conversations />
         <CreateConversation
            modalOpen={modalOpen}
            onClose={() => setModalOpen(false)}
         />
      </div>
   );
};

export default ConversationsSidebar;
