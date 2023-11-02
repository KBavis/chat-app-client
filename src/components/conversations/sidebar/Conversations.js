import React, { Fragment, useContext, useEffect } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";
import AuthContext from "../../../context/auth/authContext";
import Loading from "../../layout/Loading";

const Conversation = () => {
   const { filtered, conversations, loading, setLoading } =
      useContext(ConversationsContext);

   const { user } = useContext(AuthContext);

   useEffect(() => {
      setLoading();
   }, []);

   if (conversations === null) return <h1>Please Add A Conversation</h1>;

   return loading ? (
      <Loading />
   ) : (
      <div>
         <Fragment>
            {filtered !== null
               ? filtered.map((conversation) => (
                    <ConversationItem
                       key={conversation.id}
                       conversation={conversation}
                    />
                 ))
               : conversations?.map((conversation) => (
                    <ConversationItem
                       key={conversation.id}
                       conversation={conversation}
                    />
                 ))}
         </Fragment>
      </div>
   );
};

export default Conversation;
