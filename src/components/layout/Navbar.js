import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ConversationsContext from "../../context/conversations/conversationContext";
import MessageContext from "../../context/messages/messageContext";
import removeAuthToken from "../../utils/removeAuthToken";

const Navbar = () => {
   /**
    * ==========================
    * CONTEXT AND GLOBAL STATES
    * ==========================
    */
   const { logoutUser, isAuthenticated } = useContext(AuthContext);
   const { clearConversations, clearCurrent } =
      useContext(ConversationsContext);
   const { clearMessages } = useContext(MessageContext);

   //clear necessary front-end stored infomration on logout
   const onLogout = () => {
      clearCurrent();
      logoutUser();
      clearConversations();
      clearMessages();
      removeAuthToken(); //remove JWT token
   };

   return isAuthenticated ? ( //auth links
      <div className="bg-sky-500 flex justify-between items-center p-3 z-999 w-full text-white font-roboto">
         <h1 className="text-4xl ml-5 font-bold">
            <i className="fa-solid fa-comment" /> Chit-Chat
         </h1>
         <ul className="flex space-x-6 text-lg">
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80 "
                  to="/"
               >
                  Home
               </Link>
            </li>
            <li>
               <a
                  onClick={onLogout}
                  href="#!"
                  className="transition-opacity ease-in hover:opacity-80"
               >
                  <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
               </a>
            </li>
         </ul>
      </div>
   ) : (
      //non-auth links
      <div className="bg-sky-500 flex justify-between items-center p-3 z-999 w-full text-white font-roboto">
         <h1 className="text-4xl ml-5 font-bold">
            <i className="fa-solid fa-comment" /> Chit-Chat
         </h1>
         <ul className="flex space-x-6 text-lg">
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80"
                  to="/register"
               >
                  Register
               </Link>
            </li>
            <li>
               <Link
                  className="transition-opacity ease-in hover:opacity-80"
                  to="/login"
               >
                  Login
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Navbar;
