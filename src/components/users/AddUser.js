import React from "react";

const AddUser = () => {
   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div className=" bg-white p-8 rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">{title}</h2>
               <span className="cursor-pointer" onClick={onClose}>
                  &times;
               </span>
            </div>
            <div className="mb-4">{content}</div>
            <div className="flex justify-end">
               <button
                  onClick={onClose}
                  className="modal-button-cancel px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
               >
                  Cancel
               </button>
               <button
                  onClick={onConfirm}
                  className="modal-button-confirm px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   );
};

export default AddUser;
