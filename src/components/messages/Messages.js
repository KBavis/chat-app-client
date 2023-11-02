import { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import MessageContext from "../../context/messages/messageContext";
import AuthContext from "../../context/auth/authContext";

const Messages = () => {
   const { messages, filtered, current, sendMessage } =
      useContext(MessageContext);
   const { user } = useContext(AuthContext);
   const [text, setText] = useState("");

   const onChange = (e) => {
      setText(e.target.value);
   };

   //@TODO: Interact With Rest API
   const onSubmit = (e) => {
      e.preventDefault();
      if (text === "") {
         //@TODO Configure An Alert To Inform User
      }
      const newMessage = {
         id: Math.random() * 1000 + 1,
         content: text,
         sender: {
            id: user.id,
            name: user.name,
         },
         sendDate: new Date(),
      };
      sendMessage(newMessage);
      setText("");
   };

   //@TODO: Based on Current Conversation, Fetch Messages From That Conversation
   useEffect(() => {}, [current]);
   return user ? (
      // Flex Flex-Col Ensures That The Input/Send Message Is BELOW The Messages
      <div className="flex flex-col h-screen mt-5">
         {/*Flex Grow Causes The Div To Grow Vertically To Fill*/}
         <div className="flex-grow p-4 border">
            {/* Flex Col Causes The Messages To Descend Vertically */}
            <div className="flex flex-col space-y-2">
               {messages !== null &&
                  messages.map((message) => (
                     <ChatMessage
                        key={message.id}
                        text={message.content}
                        sentByUser={user.id === message.sender.id}
                     />
                  ))}
            </div>
         </div>
         <div className="flex p-4 border-t">
            <input
               type="text"
               placeholder="Type a message..."
               className="flex-grow px-3 py-2 rounded-full focus:outline-none"
               value={text}
               onChange={onChange}
            />
            <button
               onClick={onSubmit}
               className="ml-2 p-2 bg-blue-500 text-white rounded-full"
            >
               Send
            </button>
         </div>
      </div>
   ) : (
      "Please Sign In"
   );
};

export default Messages;
