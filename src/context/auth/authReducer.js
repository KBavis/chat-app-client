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

/**
 * Authentication Reducer
 */
export default (state, action) => {
   switch (action.type) {
      case LOAD_USER: //loading a user into state
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload,
         };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem("token", action.payload.token); //put JWT token in sotrage
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true, //indicate user is authenticated
            loading: false,
         };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case LOGOUT:
         localStorage.removeItem("token"); //remove JWT token
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload,
         };
      case CLEAR_ERRORS: //remove any errors
         return {
            ...state,
            error: null,
         };
      case UPDATE_FAIL: //error updating users profile
         return {
            ...state,
            updateError: action.payload,
         };
      default:
         return state;
   }
};
