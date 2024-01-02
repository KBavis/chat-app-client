import React, { useReducer, useState } from "react";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

const AlertState = (props) => {
   const initalState = [];
   const [state, dispatch] = useReducer(alertReducer, initalState);
   const [id, setID] = useState(1);

   /**
    * Set an alert (on success or error)
    *
    * @param {string} msg - message of alert
    * @param {string} type - type of alert
    */
   const setAlert = (msg, type) => {
      dispatch({
         type: SET_ALERT,
         payload: { msg, type, id },
      });

      //Remove Alert
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
      setID(id + 1); //increment alert id for mapping
   };

   /**
    * Alert Provider
    */
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
