import React from "react";
import ProfileBrief from "../../profile/ProfileBrief";
import FilterConversations from "./FilterConversations";
import Conversations from "./Conversations";

const ConversationsSidebar = () => {
   return (
      <div className="m-auto pt-10 min-h-screen">
         <ProfileBrief />
         <FilterConversations />
         <Conversations />
      </div>
   );
};

export default ConversationsSidebar;
