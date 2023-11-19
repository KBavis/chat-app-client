import React, { Fragment, useContext, useEffect } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";
import AuthContext from "../../../context/auth/authContext";
import Loading from "../../layout/Loading";
import MessageContext from "../../../context/messages/messageContext";

const Conversations = () => {
   const {
      filtered,
      conversations,
      loading,
      setLoading,
      setCurrent,
      current,
      getUserConversations,
   } = useContext(ConversationsContext);

   const { messages } = useContext(MessageContext);

   const { user } = useContext(AuthContext);

   //Fetch Authenticated Users Conversations
   useEffect(() => {
      getUserConversations();
   }, []);

   //Set Curent Conversation Any Time Conversations Is Updated (Leaving/Adding Conversation)
   useEffect(() => {
      if (conversations !== null && current === null) {
         setCurrent(conversations[0]);
      }
   }, [conversations, messages]);

   return loading ? (
      <Loading />
   ) : (
      <div>
         <Fragment>
            {filtered !== null
               ? filtered.map((conversation) => (
                    <ConversationItem
                       key={conversation.conversation_id}
                       conversation={conversation}
                    />
                 ))
               : conversations?.map((conversation) => (
                    <ConversationItem
                       key={conversation.conversation_id}
                       conversation={conversation}
                    />
                 ))}
         </Fragment>
      </div>
   );
};

export default Conversations;
