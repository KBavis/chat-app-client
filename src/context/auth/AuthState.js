import React, { useReducer, useContext } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import removeAuthToken from "../../utils/removeAuthToken";
import one from "../../images/default.jpg";
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
import AlertContext from "../alert/alertContext";

const AuthState = (props) => {
   const initalState = {
      token: null,
      isAuthenticated: null,
      loading: true,
      error: null,
      user: null,
      updateError: null,
   };

   const [state, dispatch] = useReducer(authReducer, initalState);

   const { setAlert } = useContext(AlertContext);

   // Load User
   const loadUser = async () => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }

      try {
         const res = await axios.get("/users/load");
         const data = res.data;
         const { user_id, userName, firstName, lastName, profileImage } = data;
         const user =
            profileImage == null
               ? {
                    user_id,
                    userName,
                    firstName,
                    lastName,
                    profileImage: one,
                 }
               : {
                    user_id,
                    userName,
                    firstName,
                    lastName,
                    profileImage,
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
         removeAuthToken();
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
         removeAuthToken();
         const res = await axios.post("/auth/authenticate", formData, config);
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
         });
      } catch (err) {
         console.log(err.response);
         console.log(`Error Response: ${err.response.data}`);
         dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data,
         });
      }
   };

   //Update User
   const updateUser = async (formData, imageFile, imageUpdated, id) => {
      console.log(`Id Passsed: ${id}`);
      const userConfig = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const imageConfig = {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      };

      //Determine If We Need To Update Profile Image
      try {
         //Update Profile Image If Updated
         if (imageUpdated) {
            if (localStorage.token) {
               setAuthToken(localStorage.token);
            }

            //Create Form Data With Image
            const data = new FormData();
            data.append("file", imageFile);

            //Upload Image
            const res = await axios.post("/file/upload", data, imageConfig);
         }

         //Update Username & Name
         const res = await axios.put(`/users/${id}`, formData, userConfig);

         //Reload User
         loadUser();
         setAlert("Successfully updated user profile", "success");
      } catch (err) {
         console.error(err.response);
         console.log("In UPDATE FAIL!!!");
         dispatch({
            type: UPDATE_FAIL,
            payload: err.response.data,
         });
      }
   };

   //Logout User

   const logoutUser = () => {
      dispatch({ type: LOGOUT });
   };
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
            updateError: state.updateError,
            loadUser,
            register,
            loginUser,
            logoutUser,
            clearErrors,
            updateUser,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthState;
