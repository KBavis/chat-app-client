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
} from "./types";
import { DELETE_CONVERSATION } from "../conversations/types";

const MessageState = (props) => {
   //@TODO: Consider Making a SentMessages and Recieved Messages as apart of state
   const initalState = {
      // messages: [
      //    {
      //       id: 1,
      //       sender: {
      //          id: 1,
      //          name: "Sam Smith",
      //       },
      //       content: "I'll have to see if I can make it!",
      //       sendDate: new Date(),
      //    },
      //    {
      //       id: 2,
      //       sender: {
      //          id: 2,
      //          name: "Jeremy Grant",
      //       },
      //       content: "Maybe, I have soccer practice that day!",
      //       sendDate: new Date(),
      //    },
      //    {
      //       id: 3,
      //       sender: {
      //          id: 4,
      //          name: "Kellen Bavis",
      //       },
      //       content: "I'll be there!",
      //       sendDate: new Date(),
      //    },
      // ],
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
         }}
      >
         {props.children}
      </MessageContext.Provider>
   );
};

export default MessageState;
