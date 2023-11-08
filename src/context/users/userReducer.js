import { GET_USER, GET_USERS, USER_ERROR } from "./types";

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
   }
};
