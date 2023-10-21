import React from "react";
import ProfileBrief from "../profile/ProfileBrief";
import SearchConversation from "./SearchConversation";
import Conversations from "./Conversations";

const ConversationsSidebar = () => {
   return (
      <div className="m-auto pt-10">
         <ProfileBrief />
         <SearchConversation />
         <Conversations />
      </div>
   );
};

export default ConversationsSidebar;
