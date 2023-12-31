import React, { useContext, useRef, useState } from "react";
import UserContext from "../../context/users/userContext";

/**
 *
 * @returns filter input for finding users
 */
const FilterUsers = () => {
   const { filterUsers, clearFilter } = useContext(UserContext); //users global context

   const [inputValue, setInputValue] = useState(""); //local state for filtering

   //On Change For A User Typing To Filter
   const onChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      if (value !== "" || value.length() > 0) {
         filterUsers(inputValue);
      } else {
         clearFilter();
      }
   };

   //return renderable JSX
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
