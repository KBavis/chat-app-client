import {
   SEND_MESSAGE,
   FILTER_MESSAGES,
   DELETE_MESSAGE,
   GET_MESSAGES,
   CLEAR_MESSAGES,
   MESSAGE_ERROR,
   SET_LOADING,
   RECIEVE_MESSAGE,
} from "./types";

export default (state, action) => {
   switch (action.type) {
      case SEND_MESSAGE:
         if (state.messages) {
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
      case GET_MESSAGES:
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
      case RECIEVE_MESSAGE:
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
