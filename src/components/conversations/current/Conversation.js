import React, { useContext, useEffect } from "react";
import TopBar from "./TopBar";
import Messages from "../../messages/Messages";
import ConversationsContext from "../../../context/conversations/conversationContext";
const Conversation = () => {
   const { current, conversations, setCurrent } =
      useContext(ConversationsContext);

   return conversations && current ? (
      <div>
         <TopBar />
         <Messages />
      </div>
   ) : (
      <div className="flex justify-center text-center text-xl text-sky-500">
         <h1>Please Create Some Conversations</h1>
      </div>
   );
};

export default Conversation;
