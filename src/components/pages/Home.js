import React from "react";
import ConversationSidebar from "../conversations/sidebar/ConversationsSidebar";
import Conversation from "../conversations/current/Conversation";
const Home = () => {
   return (
      <div className="grid grid-cols-4 w-full h-full">
         <div className="col-span-1  bg-slate-100  p-4 h-full">
            <ConversationSidebar />
         </div>
         <div className="col-span-2 border-2 bg-white border-blue-500 p-4">
            <Conversation />
         </div>
         <div className="col-span-1 border-2 border-red-500 p-4">
            Right Column
         </div>
      </div>
   );
};

export default Home;
