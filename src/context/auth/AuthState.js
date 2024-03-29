import React, { useReducer, useContext } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import removeAuthToken from "../../utils/removeAuthToken";
import one from "../../images/default.jpg";
import apiUrl from "../../utils/config";
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

/**
 * Global Authentication State
 *
 * @param {props} props
 * @returns
 */
const AuthState = (props) => {
   const initalState = {
      token: null,
      isAuthenticated: null,
      loading: true,
      error: null,
      user: null,
      updateError: null,
   };

   const [state, dispatch] = useReducer(authReducer, initalState); //utilize reducer

   const { setAlert } = useContext(AlertContext); //utilize alerts for success/failure

   // Load User into state
   const loadUser = async () => {
      if (localStorage.token) {
         setAuthToken(localStorage.token);
      }

      try {
         const res = await axios.get(`${apiUrl}/users/load`);
         const data = res.data;
         const { user_id, userName, firstName, lastName, profileImage } = data; //extract relevant data from user
         const user =
            profileImage == null
               ? {
                    user_id,
                    userName,
                    firstName,
                    lastName,
                    profileImage: one, //set profile image to default if there isn't one set
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

   // Register User To Our Application
   const register = async (formData) => {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      try {
         removeAuthToken(); //ensure there is no JWT token in storage prior to hitting endpoint
         const res = await axios.post(
            `${apiUrl}/auth/register`,
            formData,
            config
         );

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
         removeAuthToken(); //ensure there is no JWT token in storage prior to hitting endpoint
         const res = await axios.post(
            `${apiUrl}/auth/authenticate`,
            formData,
            config
         );
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

   //Update User
   const updateUser = async (formData, imageFile, imageUpdated, id) => {
      const userConfig = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      //config for updating our image
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
            await axios.post(`${apiUrl}/file/upload`, data, imageConfig);
         }

         //Update Username & Name
         await axios.put(`${apiUrl}/users/${id}`, formData, userConfig);

         //Reload User
         loadUser();
         setAlert("Successfully updated user profile", "success");
      } catch (err) {
         console.error(err.response);
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

   /**
    * Return Auth Global Provider
    */
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
