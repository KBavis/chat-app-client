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
   LEAVE_CONVERSATION,
   ADD_CONVERSATION,
   PIN_CONVERSATION,
} from "./types";
import { ADD_USER } from "../users/types";
import { RECIEVE_MESSAGE } from "../messages/types";
const ConversationsState = (props) => {
   const initalState = {
      conversations: null,
      current: null,
      filtered: null,
      loading: false,
      pinned: null,
   };

   const [state, dispatch] = useReducer(conversationReducer, initalState);

   //Add Conversation

   //Delete/Leave Conversation
   const leaveConversation = async (id) => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         await axios.delete(`/conversation/leave/${id}`);
         dispatch({
            type: LEAVE_CONVERSATION,
            payload: id,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: CONVERSATION_ERROR,
            payload: err.response,
         });
      }
   };

   //Add User To Conversation
   const addUser = async (conversation_id, user_id) => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.put(
            `/conversations/${conversation_id}/${user_id}`
         );
         dispatch({
            type: ADD_USER,
            payload: res.data,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: CONVERSATION_ERROR,
            payload: err.response,
         });
      }
   };

   //Get Conversations
   const getUserConversations = async () => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.get("/userConversations");
         const payloadData = res.data._embedded
            ? res.data._embedded.conversationResponseDTOes
            : null;
         dispatch({
            type: GET_USER_CONVERSATIONS,
            payload: payloadData,
         });
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

   //Create Conversation
   const createConversation = async (id) => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.post(`/conversations/${id}`);
         dispatch({
            type: ADD_CONVERSATION,
            payload: res.data,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: CONVERSATION_ERROR,
            payload: err.response,
         });
      }
   };

   //Pin Conversation
   const pinConversation = (id) => {
      dispatch({
         type: PIN_CONVERSATION,

         payload: id,
      });
   };

   return (
      <ConversationsContext.Provider
         value={{
            //state
            conversations: state.conversations,
            current: state.current,
            filtered: state.filtered,
            pinned: state.pinned,
            //functions
            filterConversations,
            clearFilter,
            setCurrent,
            clearCurrent,
            setLoading,
            getUserConversations,
            clearConversations,
            leaveConversation,
            createConversation,
            addUser,
            pinConversation,
         }}
      >
         {props.children};
      </ConversationsContext.Provider>
   );
};

export default ConversationsState;
