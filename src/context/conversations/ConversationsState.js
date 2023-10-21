import { useContext, useReducer } from "react";
import conversationReducer from "./conversationReducer";
import ConversationsContext from "./conversationContext";
import React from "react";
import one from "../../images/1.jpg";
import two from "../../images/2.jpg";
import three from "../../images/3.jpg";
const ConversationsState = (props) => {
   const initalState = {
      conversations: [
         {
            id: 1,
            users: ["Sam Smith", "Jeremy Grant", "Shadow Knight"],
            recentMessage: {
               content: "How are you guys doing?",
               sendDate: new Date(),
               sender: "Sam Smith",
            },
            image: one,
         },
         {
            id: 2,
            users: ["Freddie Tuck", "Skip Baily"],
            recentMessage: {
               content: "I wont be there until 3PM.",
               sendDate: new Date(),
               sender: "Freddie Tuck",
            },
            image: two,
         },
         {
            id: 3,
            users: ["Ericka Vacaflores", "Kellen Bavis"],
            recentMessage: {
               content: "I don't know if I will make it!",
               sendDate: new Date(),
               sender: "Ericka Vacaflores",
            },
            image: three,
         },
      ],
      current: null,
      filtered: null,
   };

   const [state, dispatch] = useReducer(conversationReducer, initalState);

   //Add Conversation

   //Delete/Leave Conversation

   //Set Current Conversation

   //Clear Current Conversation

   //Update Conversation

   //Filter Conversations

   //Clear Filter

   return (
      <ConversationsContext.Provider
         value={{
            conversations: state.conversations,
            current: state.current,
            filtered: state.filtered,
         }}
      >
         {props.children};
      </ConversationsContext.Provider>
   );
};

export default ConversationsState;
