import {
   SEND_MESSAGE,
   FILTER_MESSAGES,
   DELETE_MESSAGE,
   GET_MESSAGES,
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
   }
};
