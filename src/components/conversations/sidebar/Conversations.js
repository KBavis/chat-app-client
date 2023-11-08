import React, { Fragment, useContext, useEffect } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";
import AuthContext from "../../../context/auth/authContext";
import Loading from "../../layout/Loading";

const Conversations = () => {
   const { filtered, conversations, loading, setLoading, setCurrent, current } =
      useContext(ConversationsContext);

   const { user } = useContext(AuthContext);

   useEffect(() => {
      setLoading();
      if (conversations && !current) setCurrent(conversations[0]);
   }, []);

   useEffect(() => {
      if (current == null) {
         if (conversations?.length > 1) {
            setCurrent(conversations[0]);
         }
      }
   }, [current]);

   if (conversations === null) return <h1>Please Add A Conversation</h1>;

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
