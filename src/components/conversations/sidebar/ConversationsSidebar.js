import React, { useEffect, useContext } from "react";
import ProfileBrief from "../../profile/ProfileBrief";
import FilterConversations from "./FilterConversations";
import Conversations from "./Conversations";
import ConversationsContext from "../../../context/conversations/conversationContext";

const ConversationsSidebar = () => {
   const { getUserConversations, conversations } =
      useContext(ConversationsContext);

   //Fetch Conversations Any Time Conversations Is Updated
   useEffect(() => {
      getUserConversations();
   }, []);
   return (
      <div className="m-auto pt-10 min-h-screen">
         <ProfileBrief />
         {conversations != null ? <FilterConversations /> : ""}
         <Conversations />
      </div>
   );
};

export default ConversationsSidebar;
