import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
   const { alerts } = useContext(AlertContext);

   return (
      alerts.length > 0 &&
      alerts.map((alert) => (
         <div
            key={alert.id}
            className={`fixed bottom-20 right-10 rounded-lg p-[30px] text-lg font-bold italic ${
               alert.type === "danger" ? "bg-red-500" : "bg-green-500"
            }`}
         >
            <i className="fas fa-info-circle"></i> {alert.msg}
         </div>
      ))
   );
};

export default Alerts;
