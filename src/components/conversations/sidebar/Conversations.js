import React, { Fragment, useContext } from "react";
import ConversationsContext from "../../../context/conversations/conversationContext";
import ConversationItem from "./ConversationItem";

const Conversation = () => {
   const { filtered, conversations } = useContext(ConversationsContext);
   return (
      <div>
         <Fragment>
            {filtered !== null
               ? filtered.map((conversation) => (
                    <ConversationItem
                       key={conversation.id}
                       conversation={conversation}
                    />
                 ))
               : conversations.map((conversation) => (
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
