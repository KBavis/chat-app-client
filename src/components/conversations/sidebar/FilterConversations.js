import React, { useContext, useRef, useState } from "react";
import ConversationContext from "../../../context/conversations/conversationContext";

/**
 *
 * Filter Conversation Input For Sidebar
 *
 * @returns FilterConversations Input
 */
const FilterConversations = () => {
   const { filterConversations, clearFilter } = useContext(ConversationContext);
   const [inputValue, setInputValue] = useState("");

   //Filter Conversations In Real Time Based On Input
   const onChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (value !== "") {
         filterConversations(inputValue);
      } else {
         clearFilter();
      }
   };

   //Return Renderable JSX
   return (
      <div className="mt-10 relative">
         {inputValue === "" && (
            <i className="fa-solid fa-magnifying-glass absolute top-2 left-2 text-gray-400"></i>
         )}
         <input
            className="w-full pl-7 py-4 h-7 rounded-xl bg-white text-sm border-none text-gray-600 focus:outline-none"
            type="text"
            value={inputValue}
            placeholder="Filter Conversations..."
            onChange={onChange}
         />
      </div>
   );
};

export default FilterConversations;
