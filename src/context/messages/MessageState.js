import { useContext, useReducer } from "react";
import messageReducer from "./messageReducer";
import MessageContext from "./messageContext";
import { SEND_MESSAGE, DELETE_MESSAGE, FILTER_MESSAGES } from "./types";
import { DELETE_CONVERSATION } from "../conversations/types";

const MessageState = (props) => {
   //@TODO: Consider Making a SentMessages and Recieved Messages as apart of state
   const initalState = {
      messages: [
         {
            id: 1,
            sender: {
               id: 1,
               name: "Sam Smith",
            },
            content: "I'll have to see if I can make it!",
            sendDate: new Date(),
         },
         {
            id: 2,
            sender: {
               id: 2,
               name: "Jeremy Grant",
            },
            content: "Maybe, I have soccer practice that day!",
            sendDate: new Date(),
         },
         {
            id: 3,
            sender: {
               id: 4,
               name: "Kellen Bavis",
            },
            content: "I'll be there!",
            sendDate: new Date(),
         },
      ],
      loading: false,
      filtered: null,
   };

   const [state, dispatch] = useReducer(messageReducer, initalState);

   //Send Message
   const sendMessage = async (message) => {
      dispatch({
         type: SEND_MESSAGE,
         payload: message,
      });
   };

   //Get Messages
   const getMessages = async () => {
      console.log("Get Messages");
   };

   //Delete Message

   //Edit Message

   //Filter Messages

   //Clear Filter

   //Set Current

   //Clear Curent

   return (
      <MessageContext.Provider
         value={{
            //State
            messages: state.messages,
            current: state.current,
            filtered: state.filtered,
            //Functions
            getMessages,
            sendMessage,
         }}
      >
         {props.children}
      </MessageContext.Provider>
   );
};

export default MessageState;
