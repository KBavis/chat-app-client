import React from "react";
import Users from "./Users";
import FilterUsers from "./FilterUsers";

/**
 *
 * @param {boolean} modalOpen - determines whether to display this component
 * @param {function} onClose - function for closing this component
 * @param {function} setMenuOpen - function fro opening the menu
 * @returns
 */
const AddUser = ({ modalOpen, onClose, setMenuOpen }) => {
   //return renderable JSX
   return modalOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
         <div className=" bg-white h-[600px] w-[600px] p-8 rounded shadow-lg overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-3xl font-bold m-auto text-sky-500">
                  Add User
               </h2>
               <span onClick={onClose} className="cursor-pointer text-3xl">
                  &times;
               </span>
            </div>
            <div className="flex w-full">
               <p className="m-auto text-base w-full text-center mr-4 text-slate-500">
                  Select a user to add to the conversation
               </p>
            </div>
            <div className="flex justify-center w-full ">
               <FilterUsers />
            </div>
            <div className="flex flex-row mb-4">
               <Users
                  onClose={onClose}
                  isCreateConversation={false}
                  setMenuOpen={setMenuOpen}
               ></Users>
            </div>
         </div>
      </div>
   ) : (
      ""
   );
};

export default AddUser;
