import React, { useEffect, useContext } from "react";
import ConversationSidebar from "../conversations/sidebar/ConversationsSidebar";
import Conversation from "../conversations/current/Conversation";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import removeAuthToken from "../../utils/removeAuthToken";
const Home = () => {
   const { user, isAuthenticated, loadUser } = useContext(AuthContext);
   const navigate = useNavigate();

   //Direct User To Login Page If Not Authenticated
   useEffect(() => {
      if (!isAuthenticated) {
         removeAuthToken();
         navigate("/login");
      } else {
         loadUser();
      }
   }, [isAuthenticated]);

   return (
      <div className="grid grid-cols-4 w-full h-full">
         <div className="col-span-1  bg-slate-200  p-4 h-full">
            <ConversationSidebar />
         </div>
         <div className="col-span-3 border-2 bg-slate-100 border-blue-500 p-4">
            <Conversation />
         </div>
         {/* <div className="col-span-1 border-2 border-red-500 p-4">
            Right Column
         </div> */}
      </div>
   );
};

export default Home;
