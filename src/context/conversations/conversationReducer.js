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
   PIN_CONVERSATION,
   RECIEVE_MESSAGE,
   SET_RECENT_CONVERSATION,
   SET_RECENT_MESSAGE,
} from "./types";

export default (state, action) => {
   switch (action.type) {
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
               conversations: [action.payload, ...state.conversations],
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
      case RECIEVE_MESSAGE:
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
      case PIN_CONVERSATION:
         const pinnedConversation = state.conversations.find(
            (convo) => convo.conversation_id === action.payload
         );

         const filteredConversations = state.conversations.filter(
            (convo) => convo.conversation_id !== action.payload
         );

         return {
            ...state,
            conversations: [pinnedConversation, ...filteredConversations],
            pinned: action.payload,
         };
      case CLEAR_CONVERSATIONS:
         return {
            ...state,
            conversations: null,
            current: null,
            filtered: null,
         };
      case SET_RECENT_CONVERSATION:
         console.log("IN SET_RECENT_CONVERSATION WITH PAYLOAD:");
         console.log(action.payload);
         return {
            ...state,
            recentConversation: action.payload,
         };
      case SET_RECENT_MESSAGE:
         return {
            ...state,
            recent: action.payload,
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
