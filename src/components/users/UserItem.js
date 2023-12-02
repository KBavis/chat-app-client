import React, { useEffect, useContext, useState } from "react";
import img from "../../images/default.jpg";
import UserContext from "../../context/users/userContext";
import ConversationsContext from "../../context/conversations/conversationContext";
import AlertContext from "../../context/alert/alertContext";

const UserItem = ({ user, onClose, isCreateConversation, setMenuOpen }) => {
   const { profileImage } = user;
   const {
      createConversation,
      error,
      current,
      addUser,
      setCurrent,
      conversations,
   } = useContext(ConversationsContext);
   const [currImage, setCurrImage] = useState("");
   const { setAlert } = useContext(AlertContext);

   useEffect(() => {
      if (profileImage == null) {
         setCurrImage(img);
      } else {
         setCurrImage(profileImage);
      }
   }, []);

   const onClick = async () => {
      if (isCreateConversation) {
         await createConversation(user.user_id);
         if (error) {
            setAlert(error.msg, "danger");
         } else {
            setAlert("Conversation successfully created", "success");
         }
         onClose();
      } else {
         addUser(current.conversation_id, user.user_id);
         if (error) {
            setAlert(error.msg, "danger");
         } else {
            setAlert("User succesfully added to conversation", "success");
         }
         setMenuOpen(false);
         onClose();
      }
   };

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
