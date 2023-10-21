import React from "react";
import ConversationSidebar from "../conversations/ConversationsSidebar";

const Home = () => {
   return (
      <div className="grid grid-cols-4 w-full bg-gray-100 h-full">
         <div className="col-span-1 border-2 border-green-500 p-4 h-full">
            <ConversationSidebar />
         </div>
         <div className="col-span-2 border-2 border-blue-500 p-4">
            Middle Column
         </div>
         <div className="col-span-1 border-2 border-red-500 p-4">
            Right Column
         </div>
      </div>
   );
};

export default Home;
