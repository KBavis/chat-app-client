import {
   CLEAR_FILTER,
   FILTER_CONVERSATIONS,
   SET_CURRENT,
   CLEAR_CURRENT,
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
   }
};
