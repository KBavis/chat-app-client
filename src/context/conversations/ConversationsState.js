import { useContext, useReducer } from "react";
import conversationReducer from "./conversationReducer";
import ConversationsContext from "./conversationContext";
import React from "react";
import one from "../../images/1.jpg";
import two from "../../images/2.jpg";
import three from "../../images/3.jpg";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
   CLEAR_CURRENT,
   CLEAR_FILTER,
   FILTER_CONVERSATIONS,
   SET_CURRENT,
   GET_USER_CONVERSATIONS,
   SET_LOADING,
   CONVERSATION_ERROR,
   CLEAR_CONVERSATIONS,
} from "./types";
const ConversationsState = (props) => {
   //@TODO Add property 'image' to the conversation.users object, and set this image to be conversation image based on sender of recent message
   const initalState = {
      conversations: null,
      current: null,
      filtered: null,
      loading: false,
   };

   const [state, dispatch] = useReducer(conversationReducer, initalState);

   //Add Conversation

   //Delete/Leave Conversation

   //Get Conversations
   const getUserConversations = async () => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.get("/userConversations");
         console.log(res.data._embedded);

         if (res.data._embedded) {
            console.log(res.data._embedded.conversationResponseDTOes);
            dispatch({
               type: GET_USER_CONVERSATIONS,
               payload: res.data._embedded.conversationResponseDTOes,
            });
         } else {
            dispatch({
               type: GET_USER_CONVERSATIONS,
               payload: null,
            });
         }
      } catch (err) {
         console.error(err);
         dispatch({
            type: CONVERSATION_ERROR,
            payload: err.response,
         });
      }
   };

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

   //Set Loading
   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   };

   //Clear Conversations
   const clearConversations = () => {
      dispatch({ type: CLEAR_CONVERSATIONS });
   };

   return (
      <ConversationsContext.Provider
         value={{
            //state
            conversations: state.conversations,
            current: state.current,
            filtered: state.filtered,
            //functions
            filterConversations,
            clearFilter,
            setCurrent,
            clearCurrent,
            setLoading,
            getUserConversations,
            clearConversations,
         }}
      >
         {props.children};
      </ConversationsContext.Provider>
   );
};

export default ConversationsState;
