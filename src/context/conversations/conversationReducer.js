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
                  if (convo.users[i].name.match(regex)) {
                     return true;
                  }
               }
               return false;
            }),
         };
      case ADD_CONVERSATION:
         return {
            ...state,
            conversations: [...state.conversations, action.payload],
            loading: false,
         };
      case GET_USER_CONVERSATIONS:
         return {
            ...state,
            conversations: action.payload,
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
   }
};
