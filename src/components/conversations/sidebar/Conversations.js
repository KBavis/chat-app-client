import React, { Fragment, useContext, useEffect } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";
import AuthContext from "../../../context/auth/authContext";
import Loading from "../../layout/Loading";

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

   const { user } = useContext(AuthContext);

   //Fetch Conversations Any Time Conversations Is Updated
   useEffect(() => {
      getUserConversations();
   }, [current]);

   useEffect(() => {
      if (!current && conversations) {
         setCurrent(conversations[0]);
      }
   }, [conversations]);

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
