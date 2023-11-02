import {
   SEND_MESSAGE,
   FILTER_MESSAGES,
   DELETE_MESSAGE,
   GET_MESSAGES,
   CLEAR_MESSAGES,
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
         };
      case CLEAR_MESSAGES:
         return {
            ...state,
            filtered: null,
            current: null,
            messages: null,
         };
   }
};
