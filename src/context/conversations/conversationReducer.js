import { act } from "react-dom/test-utils";
import {
   CLEAR_FILTER,
   FILTER_CONVERSATIONS,
   SET_CURRENT,
   CLEAR_CURRENT,
   ADD_CONVERSATION,
   SET_LOADING,
   GET_USER_CONVERSATIONS,
   CLEAR_CONVERSATIONS,
   CONVERSATION_ERROR,
   LEAVE_CONVERSATION,
   ADD_USER,
} from "./types";

export default (state, action) => {
   switch (action.type) {
      //@TODO Filter Based On Message Content Or Other Parameters
      case FILTER_CONVERSATIONS:
         return {
            ...state,
            filtered: state.conversations.filter((convo) => {
               const regex = new RegExp(`${action.payload}`, "gi");
               // Filter Based On Users In Convo
               for (let i = 0; i < convo.users.length; i++) {
                  if (
                     convo.users[i]?.firstName?.match(regex) ||
                     convo.users[i]?.lastName?.match(regex)
                  ) {
                     return true;
                  }
               }
               return false;
            }),
         };
      case LEAVE_CONVERSATION:
         return {
            ...state,
            conversations: state.conversations.filter(
               (convo) => convo.conversation_id !== action.payload
            ),
            filtered: null,
            loading: false,
            current: null,
         };
      case ADD_CONVERSATION:
         if (state.conversations) {
            return {
               ...state,
               conversations: [...state.conversations, action.payload],
               loading: false,
            };
         } else {
            return {
               ...state,
               conversations: [action.payload],
               loading: false,
            };
         }
      case GET_USER_CONVERSATIONS:
         return {
            ...state,
            conversations: action.payload,
            loading: false,
         };
      case ADD_USER:
         return {
            ...state,
            current: action.payload,
            loading: false,
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null,
         };
      case SET_CURRENT:
         return {
            ...state,
            current: action.payload,
         };
      case CLEAR_CURRENT:
         return {
            ...state,
            current: null,
         };
      case SET_LOADING:
         return {
            ...state,
            loading: true,
         };
      case CLEAR_CONVERSATIONS:
         return {
            ...state,
            conversations: null,
            current: null,
            filtered: null,
         };
      case CONVERSATION_ERROR:
         return {
            ...state,
            error: action.payload,
         };
      default:
         return state;
   }
};
