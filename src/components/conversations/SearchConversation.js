import React, { useContext, useRef, useState } from "react";
import ConversationContext from "../../context/conversations/conversationContext";

const SearchConversation = () => {
   const { filtered } = useContext(ConversationContext);
   const [inputValue, setInputValue] = useState("");

   const onChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (value !== "") {
         //@TODO Filter Conversations
      } else {
         //@TODO Clear Filter
      }
   };

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

export default SearchConversation;
