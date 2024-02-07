import React, { useEffect, useContext, useState } from "react";
import img from "../../images/default.jpg";
import ConversationsContext from "../../context/conversations/conversationContext";
import AlertContext from "../../context/alert/alertContext";

/**
 *
 * @param {User} user - user the item is representing
 * @param {function} onClose - closing of the AddUser or
 * @param {boolean} isCreateConversation - determines whether this is for Creating a Conversation OR for Adding A User
 * @param {function} setMenuOpen - opens menu
 * @returns
 */
const UserItem = ({ user, onClose, isCreateConversation, setMenuOpen }) => {
   /**
    * =========================
    * CONTEXT AND GLOBAL STATES
    * ========================
    */
   const { createConversation, error, current, addUser } =
      useContext(ConversationsContext);
   const { setAlert } = useContext(AlertContext);

   /**
    * =========================
    * LOCAL STATES
    * ========================
    */
   const [currImage, setCurrImage] = useState("");
   const { profileImage } = user; //extract profile image from passed in user

   //Sets The Profile Image Upon Component Mounting
   useEffect(() => {
      if (profileImage == null) {
         setCurrImage(img);
      } else {
         setCurrImage(profileImage);
      }
   }, []);

   //On Click For Creating A Converastion or Adding A User
   const onClick = async () => {
      if (isCreateConversation) {
         await createConversation(user.user_id); //create conversation in backend
         if (error) {
            setAlert(error.msg, "danger");
         } else {
            setAlert("Conversation successfully created", "success");
         }
         onClose(); //close modal
      } else {
         addUser(current.conversation_id, user.user_id); //add user to conversation in backend
         if (error) {
            setAlert(error.msg, "danger");
         } else {
            setAlert("User succesfully added to conversation", "success");
         }
         setMenuOpen(false);
         onClose(); //close modal
      }
   };

   //return renderable JSX
   return (
      <div
         onClick={onClick}
         className="flex p-4 bg-slate-100 mt-3 font-semibold w-full rounded-lg border-[2.5px] border-solid border-sky-500 hover:scale-105 hover:cursor-pointer"
      >
         {currImage && (
            <img
               className="w-16 h-16 rounded-full object-cover object-top border-sky-500 border-[3px]"
               src={currImage}
               alt="User Image"
            />
         )}
         <div>
            <p className="text-xl ml-3">
               {user.firstName} {user.lastName}
            </p>
            <p className="ml-3 text-sm text-gray-400 font-light">
               {user.userName}
            </p>
         </div>
      </div>
   );
};

export default UserItem;
