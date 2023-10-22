import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import img from "../../images/profile_pic_cropped.jpg";
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_ERRORS,
} from "./types";

{
   /* @TODO: Change user to null and set up loadUser */
}
const AuthState = (props) => {
   const initalState = {
      token: localStorage.getItem("token"),
      isAuthenticated: null,
      loading: true,
      error: null,
      user: {
         id: 4,
         profileImage: img,
         name: "Kellen Bavis",
         conversations: null,
         messagesSent: null,
         title: "Software Engineer",
      },
   };

   const [state, dispatch] = useReducer(authReducer, initalState);

   // Load User
   // const loadUser = async () => {
   //    if (localStorage.token) {
   //       setAuthToken(localStorage.token);
   //    }

   //    try {
   //       const res = await axios.get("/auth/register");
   //       dispatch({
   //          type: USER_LOADED,
   //          payload: res.data,
   //       });
   //    } catch (err) {
   //       dispatch({ type: AUTH_ERROR });
   //    }
   // };

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
         console.error(err.message);
         dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg,
         });
      }
   };

   //Login User
   const loginUser = () => console.log("Login User");

   //Logout User

   const logoutUser = () => console.log("Logout User");
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
