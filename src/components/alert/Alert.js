import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
   const { alerts } = useContext(AlertContext);
   return (
      alerts.length > 0 &&
      alerts.map((alert) => (
         <div
            key={alert.id}
            className={`p-2 rounded-lg w-1/2 m-auto text-lg font-bold mt-5 italic ${
               alert.type === "danger" ? "bg-red-500" : "bg-green-500"
            }`}
         >
            <i className="fas fa-info-circle"> {alert.msg}</i>
         </div>
      ))
   );
};

export default Alerts;
