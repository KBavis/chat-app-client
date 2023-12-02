import React from "react";
import { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import ConversationsContext from "../../context/conversations/conversationContext";
import AddUser from "../users/AddUser";
const DropDownMenu = ({ setMenuOpen, menuOpen }) => {
   const {
      leaveConversation,
      current,
      setCurrent,
      conversations,
      pinConversation,
      pinned,
   } = useContext(ConversationsContext);
   const [leaveConversationModalOpen, setLeaveConversationModalOpen] =
      useState(false);
   const [addUserModalOpen, setAddUserModalOpen] = useState(false);
   if (!menuOpen) return null;

   const handleOptionClick = (option) => {
      if (option === "Add User") {
         setAddUserModalOpen(true);
      } else if (option === "Leave Conversation") {
         //Pop Up Modal To Ensure That They Want to Leave Conversation
         setLeaveConversationModalOpen(true);
      } else {
         pinConversation(current.conversation_id);
         setMenuOpen(false);
      }
   };

   const handleConfirmLeaveConversation = async () => {
      setLeaveConversationModalOpen(false);
      //Ensure That This Is Executed
      await leaveConversation(current.conversation_id);
      setMenuOpen(false);
   };

   const handleConfirmAddUser = () => {
      setAddUserModalOpen(false);
      //addUser(user);
   };

   return (
      <div className="absolute right-0 bottom-[-60px] mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
         <div
            onClick={() => handleOptionClick("Add User")}
            className="menu-option px-4 py-2 cursor-pointer border-[1px] border-gray-300 hover:bg-gray-100"
         >
            Add User
         </div>
         <div
            onClick={() => handleOptionClick("Leave Conversation")}
            className="menu-option px-4 py-2 cursor-pointer border-[1px] border-gray-300 hover:bg-gray-100"
         >
            Leave Conversation
         </div>
         <div
            onClick={() => handleOptionClick("Pin Conversation")}
            className="menu-option px-4 py-2 cursor-pointer border-[1px] border-gray-300 hover:bg-gray-100"
         >
            {current.conversation_id === pinned
               ? "Un-pin Conversation"
               : "Pin Conversation"}
            {current.conversati}
         </div>
         <GenericModal
            isOpen={leaveConversationModalOpen}
            onClose={() => setLeaveConversationModalOpen(false)}
            title="Leave Conversation"
            content="Are you sure you want to leave this conversation?"
            onConfirm={handleConfirmLeaveConversation}
         />
         <AddUser
            modalOpen={addUserModalOpen}
            onClose={() => setAddUserModalOpen(false)}
            setMenuOpen={setMenuOpen}
         />
      </div>
   );
};

export default DropDownMenu;
