import React, { useContext, useEffect } from "react";
import TopBar from "./TopBar";
import Messages from "../../messages/Messages";
import ConversationsContext from "../../../context/conversations/conversationContext";
const Conversation = () => {
   const { current, conversations, setCurrent } =
      useContext(ConversationsContext);
   useEffect(() => {
      if (!current) {
         if (conversations) {
            setCurrent(conversations[0]);
         } else {
            setCurrent(null);
         }
      }
   }, [current]);
   return (
      <div>
         <TopBar />
         <Messages />
      </div>
   );
};

export default Conversation;
