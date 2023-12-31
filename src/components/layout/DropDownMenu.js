import React from "react";
import { useState, useContext } from "react";
import GenericModal from "./GenericModal";
import ConversationsContext from "../../context/conversations/conversationContext";
import AddUser from "../users/AddUser";

/**
 *
 * @param {function} setMenuOpen - opens/closes the drop-down menu
 * @param {boolean} menuOpen - determines if drop-down menu should be displayed
 * @returns
 */
const DropDownMenu = ({ setMenuOpen, menuOpen }) => {
   /**
    * ==========================
    * CONTEXT AND GLOBAL STATES
    * ==========================
    */
   const { leaveConversation, current, pinConversation, pinned } =
      useContext(ConversationsContext);
   const [leaveConversationModalOpen, setLeaveConversationModalOpen] =
      useState(false);

   /**
    * =========================
    * LOCAL STATES
    * ========================
    */
   const [addUserModalOpen, setAddUserModalOpen] = useState(false);

   //On-Click For Our Drop-Down Menu
   const handleOptionClick = (option) => {
      if (option === "Add User") {
         setAddUserModalOpen(true); //open add-user modal
      } else if (option === "Leave Conversation") {
         setLeaveConversationModalOpen(true); //open confimration modal
      } else {
         pinConversation(current.conversation_id); //pin selected confirmation & close
         setMenuOpen(false);
      }
   };

   //Once Confirmed, Leave Selected Conversation
   const handleConfirmLeaveConversation = async () => {
      setLeaveConversationModalOpen(false);
      await leaveConversation(current.conversation_id);
      setMenuOpen(false); //close modal
   };

   //Return Renderable JSX (if menu should be displayed)
   return !menuOpen ? null : (
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
