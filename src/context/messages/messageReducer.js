import {
   SEND_MESSAGE,
   GET_MESSAGES,
   CLEAR_MESSAGES,
   MESSAGE_ERROR,
   SET_LOADING,
   RECIEVE_MESSAGE,
} from "./types";

/**
 * Message Reducer for State Updates
 */
export default (state, action) => {
   switch (action.type) {
      case SEND_MESSAGE: //sending a speicifc message
         if (state.messages) {
            //determine if messages have been sent previously
            return {
               ...state,
               messages: [...state.messages, action.payload],
            };
         } else {
            return {
               ...state,
               messages: [action.payload],
            };
         }
      case GET_MESSAGES: //fetch user specific message
         return {
            ...state,
            messages: action.payload,
            loading: false,
         };
      case CLEAR_MESSAGES:
         return {
            ...state,
            filtered: null,
            current: null,
            messages: null,
         };
      case RECIEVE_MESSAGE: //recieving a new message
         return {
            ...state,
            messages: [...state.messages, action.payload],
         };
      case MESSAGE_ERROR:
         return {
            ...state,
            error: action.payload,
         };
      case SET_LOADING:
         return {
            ...state,
            loading: true,
         };
      default:
         return state;
   }
};
