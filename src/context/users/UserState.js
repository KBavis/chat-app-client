import { GET_USERS, USER_ERROR, FILTER_USERS, CLEAR_FILTER } from "./types";
import { useReducer, useContext } from "react";
import userReducer from "./userReducer";
import UserContext from "./userContext";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import apiUrl from "../../utils/config";

const UserState = (props) => {
   const initialState = {
      users: null,
      loading: false,
      filtered: null,
   };

   const [state, dispatch] = useReducer(userReducer, initialState);

   //Get Users
   const getUsers = async () => {
      try {
         if (localStorage.token) {
            //ensuere JWT token set (auth endpoint )
            setAuthToken(localStorage.token);
         }
         const res = await axios.get(`${apiUrl}/users`);
         const payloadData = res.data._embedded
            ? res.data._embedded.userResponseDTOes
            : null;
         dispatch({
            type: GET_USERS,
            payload: payloadData,
         });
      } catch (err) {
         console.error(err);
         dispatch({
            type: USER_ERROR,
            payload: err.response,
         });
      }
   };

   //Filter Users
   const filterUsers = (text) => {
      dispatch({ type: FILTER_USERS, payload: text });
   };

   //Clear Filter
   const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
   };

   /**
    * Return Global Users Provider
    */
   return (
      <UserContext.Provider
         value={{
            //State
            users: state.users,
            filtered: state.filtered,
            loading: state.loading,
            //Functions
            getUsers,
            filterUsers,
            clearFilter,
         }}
      >
         {props.children}
      </UserContext.Provider>
   );
};

export default UserState;
