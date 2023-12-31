import React, { Fragment, useContext, useEffect } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";
import Loading from "../../layout/Loading";
import MessageContext from "../../../context/messages/messageContext";
import AuthContext from "../../../context/auth/authContext";
import subscribeToConversation from "../../../utils/websocket-client";

/**
 *
 * @returns List of Conversation Items For Sidebar Display
 */
const Conversations = () => {
   /**
    * ==========================
    * CONTEXT AND GLOBAL STATES
    * ==========================
    */
   const {
      filtered,
      conversations,
      loading,
      setCurrent,
      current,
      getUserConversations,
      recieveMessage,
   } = useContext(ConversationsContext);

   const { messages } = useContext(MessageContext);

   const { isAuthenticated } = useContext(AuthContext);

   //Fetch Authenticated Users Conversations
   useEffect(() => {
      if (isAuthenticated) {
         getUserConversations();
      }
   }, [isAuthenticated]);

   //Set Curent Conversation Any Time Conversations Is Updated (Leaving/Adding Conversation)
   useEffect(() => {
      if (conversations !== null && current === null) {
         setCurrent(conversations[0]);
      }
   }, [conversations, messages]);

   //Subscribe To Each Conversation's Corresponding Web-Socket
   useEffect(() => {
      if (conversations) {
         conversations.forEach((conversation) => {
            subscribeToConversation(
               conversation.conversation_id,
               handleRecievedMessage
            );
         });
      }
   }, [conversations]);
   /**
    * Callback function for newly received messages
    *
    * @param {MessageDTO} message
    * @param {Long} conversation_id
    */
   const handleRecievedMessage = (message, conversation_id) => {
      recieveMessage(message, conversation_id);
   };

   //Return Rendered JSX
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
