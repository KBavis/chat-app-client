import React from "react";
import Users from "../../users/Users";
import FilterUsers from "../../users/FilterUsers";

/**
 * Create Conversation Modal
 *
 * @param {boolean} modalOpen -- local state to determine if modal should be displayed
 * @param {function} onClose -- function to close modal
 * @returns
 */
const CreateConversation = ({ modalOpen, onClose }) => {
   return modalOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
         <div className=" bg-white h-[600px] w-[600px] p-8 rounded shadow-lg overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-3xl font-bold m-auto text-sky-500">
                  Create Conversation
               </h2>
               <span onClick={onClose} className="cursor-pointer text-3xl">
                  &times;
               </span>
            </div>
            <div className="flex w-full">
               <p className="m-auto text-base w-full text-center mr-4 text-slate-500">
                  Select a user to start a conversation with
               </p>
            </div>
            <div className="flex justify-center w-full ">
               <FilterUsers />
            </div>
            <div className="flex flex-row mb-4 justify-center">
               <Users onClose={onClose} isCreateConversation={true}></Users>
            </div>
         </div>
      </div>
   ) : (
      ""
   );
};

export default CreateConversation;
