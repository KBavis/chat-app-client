import React, { useContext, useRef, useState } from "react";
import UserContext from "../../context/users/userContext";

const FilterUsers = () => {
   const { filterUsers, clearFilter } = useContext(UserContext);
   const [inputValue, setInputValue] = useState("");

   const onChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (value !== "") {
         filterUsers(inputValue);
      } else {
         clearFilter();
      }
   };

   return (
      <div className="mt-5 relative">
         {inputValue === "" && (
            <i className="fa-solid fa-magnifying-glass absolute top-2 left-2 text-gray-400"></i>
         )}
         <input
            className="w-full pl-7 py-4 h-7 rounded-xl bg-gray-200 text-sm border-none text-gray-600 focus:outline-none"
            type="text"
            value={inputValue}
            placeholder="Filter Users..."
            onChange={onChange}
         />
      </div>
   );
};

export default FilterUsers;
