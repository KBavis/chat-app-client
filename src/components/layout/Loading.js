import React from "react";

const Loading = () => {
   return (
      <div className="flex justify-center h-screen items-center">
         <div className="border-t-4 border-black rounded-full animate-spin w-16 h-16 text-blue-600"></div>
      </div>
   );
};

export default Loading;
