import {
   SEND_MESSAGE,
   FILTER_MESSAGES,
   DELETE_MESSAGE,
   GET_MESSAGES,
   CLEAR_MESSAGES,
   MESSAGE_ERROR,
   SET_LOADING,
} from "./types";

export default (state, action) => {
   switch (action.type) {
      case SEND_MESSAGE:
         return {
            ...state,
            messages: [...state.messages, action.payload],
         };
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
