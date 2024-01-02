import { GET_USERS, USER_ERROR, FILTER_USERS, CLEAR_FILTER } from "./types";

/**
 * Reducer for Users State
 */
export default (state, action) => {
   switch (action.type) {
      case GET_USERS: //fetch all registered users
         return {
            ...state,
            users: action.payload,
            loading: false,
         };
      case USER_ERROR: //error regarding users
         return {
            ...state,
            error: action.payload,
         };
      case CLEAR_FILTER: //clear filter of user
         return {
            ...state,
            filtered: null,
         };
      case FILTER_USERS: //filter all possible users
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
