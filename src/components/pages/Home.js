import React, { useEffect, useContext } from "react";
import ConversationSidebar from "../conversations/sidebar/ConversationsSidebar";
import Conversation from "../conversations/current/Conversation";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import removeAuthToken from "../../utils/removeAuthToken";
/**
 *
 * @returns Main Page (only page as of now)
 */
const Home = () => {
   const { isAuthenticated, loadUser } = useContext(AuthContext);
   const navigate = useNavigate();

   //Direct User To Login Page If Not Authenticated
   useEffect(() => {
      //If There Is A Token In Storage, Try And Load User's Infomration
      if (localStorage.token) {
         loadUser();
      } else {
         removeAuthToken();
         navigate("/login");
      }
   }, [isAuthenticated]);

   //Return Renderable JSX
   return (
      <div className="grid grid-cols-4 w-full h-full">
         <div className="col-span-1  bg-slate-200  p-4 h-full">
            <ConversationSidebar />
         </div>
         <div className="col-span-3 bg-slate-100 p-4">
            <Conversation />
         </div>
      </div>
   );
};

export default Home;
