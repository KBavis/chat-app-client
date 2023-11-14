import {
   GET_USER,
   GET_USERS,
   USER_ERROR,
   FILTER_USERS,
   CLEAR_FILTER,
} from "./types";

export default (state, action) => {
   switch (action.type) {
      case GET_USERS:
         return {
            ...state,
            users: action.payload,
            loading: false,
         };
      case USER_ERROR:
         return {
            ...state,
            error: action.payload,
         };
      case CLEAR_FILTER:
         return {
            ...state,
            filtered: null,
         };
      case FILTER_USERS:
         return {
            ...state,
            filtered: state.users.filter((user) => {
               const regex = new RegExp(`${action.payload}`, "gi");
               // Filter Based On Users In Convo
               if (
                  user?.userName?.match(regex) ||
                  (user?.firstName + " " + user?.lastName).match(regex)
               ) {
                  return true;
               }
               return false;
            }),
         };
      default:
         return state;
   }
};
