import { GET_USER, GET_USERS, USER_ERROR } from "./types";
import { useReducer, useContext } from "react";
import userReducer from "./userReducer";
import UserContext from "./userContext";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";

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
            setAuthToken(localStorage.token);
         }
         const res = await axios.get("/users");
         const payloadData = res.data._embedded
            ? res.data._embedded.userResponseDTOes
            : null;
         console.log(`Payload Data: ${payloadData}`);
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

   return (
      <UserContext.Provider
         value={{
            //State
            users: state.users,
            filtered: state.filtered,
            loading: state.loading,
            //Functions
            getUsers,
         }}
      >
         {props.children}
      </UserContext.Provider>
   );
};

export default UserState;
