import { useContext, useReducer } from "react";
import conversationReducer from "./conversationReducer";
import ConversationsContext from "./conversationContext";
import React from "react";
import one from "../../images/1.jpg";
import two from "../../images/2.jpg";
import three from "../../images/3.jpg";
import {
   CLEAR_CURRENT,
   CLEAR_FILTER,
   FILTER_CONVERSATIONS,
   SET_CURRENT,
} from "./types";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";
const ConversationsState = (props) => {
   //@TODO Add property 'image' to the conversation.users object, and set this image to be conversation image based on sender of recent message
   const initalState = {
      conversations: [
         {
            id: 1,
            users: [
               {
                  id: 1,
                  name: "Sam Smith",
               },
               {
                  id: 2,
                  name: "Jeremy Grant",
               },
               {
                  id: 3,
                  name: "Shadown Knight",
               },
               {
                  id: 4,
                  name: "Kellen Bavis",
               },
            ],
            recentMessage: {
               content: "How are you guys doing?",
               sendDate: new Date(),
               sender: "Sam Smith",
            },
            image: one,
         },
         {
            id: 2,
            users: [
               {
                  id: 5,
                  name: "Freddie Tuck",
               },
               {
                  id: 6,
                  name: "Skip Baily",
               },
               {
                  id: 4,
                  name: "Kellen Bavis",
               },
            ],
            recentMessage: {
               content: "I wont be there until 3PM.",
               sendDate: new Date(),
               sender: "Freddie Tuck",
            },
            image: two,
         },
         {
            id: 3,
            users: [
               {
                  name: "Ericka Vacaflores",
                  id: 7,
               },
               {
                  name: "Kellen Bavis",
                  id: 4,
               },
            ],
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
   const setCurrent = (conversation) => {
      dispatch({ type: SET_CURRENT, payload: conversation });
   };

   //Clear Current Conversation
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT });
   };

   //Update Conversation

   //Filter Conversations
   const filterConversations = (text) => {
      dispatch({ type: FILTER_CONVERSATIONS, payload: text });
   };

   //Clear Filter
   const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
   };

   return (
      <ConversationsContext.Provider
         value={{
            conversations: state.conversations,
            current: state.current,
            filtered: state.filtered,
            filterConversations,
            clearFilter,
            setCurrent,
            clearCurrent,
         }}
      >
         {props.children};
      </ConversationsContext.Provider>
   );
};

export default ConversationsState;
