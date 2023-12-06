import { useReducer } from "react";
import messageReducer from "./messageReducer";
import MessageContext from "./messageContext";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import {
   SEND_MESSAGE,
   DELETE_MESSAGE,
   FILTER_MESSAGES,
   CLEAR_MESSAGES,
   GET_MESSAGES,
   MESSAGE_ERROR,
   SET_LOADING,
   RECIEVE_MESSAGE,
} from "./types";
import { DELETE_CONVERSATION } from "../conversations/types";

const MessageState = (props) => {
   const initalState = {
      messages: [],
      loading: false,
      filtered: null,
   };

   const [state, dispatch] = useReducer(messageReducer, initalState);

   //Send Message
   const sendMessage = async (message, convoId) => {
      console.log("In Send Message() In MessageState");
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.post(`/messages/${convoId}`, message, config);
         dispatch({
            type: SEND_MESSAGE,
            payload: res.data,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: MESSAGE_ERROR,
            payload: err.response,
         });
      }
   };

   //Get Messages
   const getMessages = async (convoId) => {
      try {
         if (localStorage.token) {
            setAuthToken(localStorage.token);
         }
         const res = await axios.get(`/messages/conversations/${convoId}`);
         const payloadData = res.data._embedded
            ? res.data._embedded.messageResponseDTOes
            : null;
         dispatch({
            type: GET_MESSAGES,
            payload: payloadData,
            loading: false,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: MESSAGE_ERROR,
            payload: err.response,
         });
      }
   };

   //Message Recieved
   //@TODO: Ensure This Logic Is Updated In Backend So Its a MessageResponseDTO rather than MessageDTO
   //@TODO: Remove The Logic of Fetching Recent Message Of Conversation In Backend If Not Used Here
   const recieveMessage = async (message) => {
      dispatch({
         type: RECIEVE_MESSAGE,
         payload: message,
      });
   };

   //Delete Message

   //Edit Message

   //Filter Messages

   //Clear Filter

   //Set Current

   //Clear Curent

   //Clear Messages
   const clearMessages = () => {
      dispatch({ type: CLEAR_MESSAGES });
   };

   //Set Loading
   const setLoading = () => {
      dispatch({
         type: SET_LOADING,
      });
   };

   return (
      <MessageContext.Provider
         value={{
            //State
            messages: state.messages,
            current: state.current,
            filtered: state.filtered,
            loading: state.loading,
            //Functions
            getMessages,
            sendMessage,
            clearMessages,
            setLoading,
            recieveMessage,
         }}
      >
         {props.children}
      </MessageContext.Provider>
   );
};

export default MessageState;
