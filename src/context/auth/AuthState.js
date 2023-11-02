import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import img from "../../images/profile_pic_cropped.jpg";
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   LOAD_USER,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS,
   AUTH_ERROR,
} from "./types";

{
   /* @TODO: Change user to null and set up loadUser */
}
const AuthState = (props) => {
   // const initalState = {
   //    token: localStorage.getItem("token"),
   //    isAuthenticated: null,
   //    loading: true,
   //    error: null,
   //    user: {
   //       id: 4,
   //       profileImage: img,
   //       name: "Kellen Bavis",
   //       conversations: null,
   //       messagesSent: null,
   //       title: "Software Engineer",
   //    },
   // };

   const initalState = {
      token: null,
      isAuthenticated: null,
      loading: true,
      error: null,
      user: null,
      // user: {
      //    id: 4,
      //    profileImage: img,
      //    name: "Kellen Bavis",
      //    conversations: null,
      //    messagesSent: null,
      //    title: "Software Engineer",
      // },
   };

   const [state, dispatch] = useReducer(authReducer, initalState);

   // Load User
   const loadUser = async () => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }

      try {
         const res = await axios.get("/users/load");
         const data = res.data;
         const { user_id, userName, firstName, lastName } = data;
         let user = {
            user_id,
            userName,
            firstName,
            lastName,
         };
         dispatch({
            type: LOAD_USER,
            payload: user,
         });
      } catch (err) {
         dispatch({ type: AUTH_ERROR });
      }
   };

   // Register User
   const register = async (formData) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      try {
         const res = await axios.post("/auth/register", formData, config);

         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
         });
      } catch (err) {
         console.error(`Error Message: ${err.response.data}`);
         dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data,
         });
      }
   };

   //Login User
   const loginUser = async (formData) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      try {
         const res = await axios.post("/auth/authenticate", formData, config);
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
         });
      } catch (err) {
         dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data,
         });
      }
   };

   //Logout User

   const logoutUser = () => dispatch({ type: LOGOUT });
   //Clear Errors
   const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

   return (
      <AuthContext.Provider
         value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            loginUser,
            logoutUser,
            clearErrors,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
