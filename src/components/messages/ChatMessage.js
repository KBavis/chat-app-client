const ChatMessage = ({ text, sentByUser }) => {
   return (
      <div
         className={`${
            sentByUser
               ? "ml-auto bg-blue-500 text-white"
               : "mr-auto bg-gray-200"
         } p-3 rounded-lg mb-2 max-w-xs`}
      >
         {text}
      </div>
   );
};

export default ChatMessage;
