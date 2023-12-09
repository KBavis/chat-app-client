import { useContext, useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import MessageContext from "../../context/messages/messageContext";
import AuthContext from "../../context/auth/authContext";
import ConversationsContext from "../../context/conversations/conversationContext";
import Loading from "../layout/Loading";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/users/userContext";

const Messages = () => {
   const {
      messages,
      filtered,
      current,
      sendMessage,
      getMessages,
      setLoading,
      loading,
   } = useContext(MessageContext);
   const { user } = useContext(AuthContext);
   const conversationContext = useContext(ConversationsContext);
   const { users } = useContext(UserContext);
   const [text, setText] = useState("");
   const [recentMessage, setRecentMessage] = useState({});
   const messagesRef = useRef(null);
   const { setAlert } = useContext(AlertContext);
   const [conversationMessages, setConversationMessages] = useState(null);

   const onChange = (e) => {
      setText(e.target.value);
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (text === "") {
         setAlert("Unable to send a blank message", "danger");
         return;
      } else if (text.length > 300) {
         setAlert("Max message size is 300 characters", "danger");
         return;
      }
      const newMessage = {
         content: text,
      };
      if (conversationContext.current)
         sendMessage(newMessage, conversationContext.current.conversation_id);
      setText("");
   };

   useEffect(() => {
      if (messagesRef.current) {
         messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
      }
   }, [messages]);

   useEffect(() => {
      if (conversationContext.current !== null) {
         setLoading();
         getMessages(conversationContext.current.conversation_id);
      }
   }, [conversationContext.current]);

   useEffect(() => {
      setConversationMessages(messages);
   }, [messages]);

   useEffect(() => {}, [messages?.length, conversationMessages]);

   //Recieving A New Message Logic
   useEffect(() => {
      if (
         conversationContext.recentConversation &&
         conversationContext.recentConversation.messages
      ) {
         const recentConvoMessages =
            conversationContext.recentConversation.messages;
         const latestRecentMessage =
            recentConvoMessages[recentConvoMessages.length - 1];

         setRecentMessage(latestRecentMessage);

         if (
            conversationContext.current &&
            conversationContext.current.conversation_id ===
               latestRecentMessage.conversationId
         ) {
            //Fetch Profile Image for This Message
            let user = users.filter(
               (u) => u.user_id === latestRecentMessage.senderId
            );

            const updatedLatestMessage = {
               ...latestRecentMessage,
               sender: {
                  profileImage: user[0].profileImage,
               },
            };

            setConversationMessages((prevConversationMessages) => [
               ...(prevConversationMessages || []),
               updatedLatestMessage,
            ]);
         }
      }
   }, [conversationContext.recentConversation]);

   if (loading == true) {
      return <Loading></Loading>;
   }
   return user ? (
      // Flex Flex-Col Ensures That The Input/Send Message Is BELOW The Messages
      <div className="flex flex-col h-[85vh] mt-5">
         {/*Flex Grow Causes The Div To Grow Vertically To Fill & Overflow-Y-Auto Causes it To Be Scrollable*/}
         <div
            className="flex-grow p-4 border overflow-y-auto overflow-hidden no-scrollbar"
            ref={messagesRef}
         >
            {/* Flex Col Causes The Messages To Descend Vertically */}
            <div className="flex flex-col space-y-2">
               {conversationMessages !== null &&
                  conversationMessages.map((message) => {
                     if (typeof message === "string")
                        message = JSON.parse(message);
                     return (
                        <ChatMessage
                           key={message.message_id}
                           text={message.content}
                           sentByUser={
                              user.user_id ===
                              (message.senderId
                                 ? message.senderId
                                 : message.sender
                                 ? message.sender.user_id
                                 : null)
                           }
                           message={message}
                        />
                     );
                  })}
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
