import React, { useReducer, useState } from "react";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

const AlertState = (props) => {
   const initalState = [];
   const [state, dispatch] = useReducer(alertReducer, initalState);
   const [id, setID] = useState(1);

   const setAlert = (msg, type) => {
      dispatch({
         type: SET_ALERT,
         payload: { msg, type, id },
      });

      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
      setID(id + 1);
   };
   return (
      <AlertContext.Provider
         value={{
            alerts: state,
            setAlert,
         }}
      >
         {props.children}
      </AlertContext.Provider>
   );
};

export default AlertState;
