import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   LOAD_USER,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS,
   AUTH_ERROR,
   UPDATE_FAIL,
} from "./types";

export default (state, action) => {
   switch (action.type) {
      case LOAD_USER:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload,
         };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem("token", action.payload.token);
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false,
         };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload,
         };
      case CLEAR_ERRORS:
         return {
            ...state,
            error: null,
         };
      case UPDATE_FAIL:
         console.log("In Udpatee Fail");
         console.log(action.payload);
         return {
            ...state,
            error: action.payload,
         };
      default:
         return state;
   }
};
