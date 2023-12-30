import { useContext, useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import MessageContext from "../../context/messages/messageContext";
import AuthContext from "../../context/auth/authContext";
import ConversationsContext from "../../context/conversations/conversationContext";
import Loading from "../layout/Loading";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/users/userContext";
import dayDifference from "../../utils/dateUtil";

const Messages = () => {
   /**
    * ===================
    * Contexts and Global States
    * ===================
    */
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

   /**
    *  ==========================
    *  Local States
    *  ========================
    */
   const [text, setText] = useState("");
   const [recentMessage, setRecentMessage] = useState({});
   const messagesRef = useRef(null);
   const { setAlert } = useContext(AlertContext);
   const [conversationMessages, setConversationMessages] = useState(null);
   const [messageIds, setMessageIds] = useState([]);
   const [showDate, setShowDate] = useState(null);

   const onChange = (e) => {
      setText(e.target.value);
   };

   /**
    *  Clears Converastion Messages When New Conversation Opened (To Cause Re-Render)
    */
   useEffect(() => {
      setConversationMessages(null);
   }, [conversationContext.current]);

   /**
    * On Submit For Sending a Message
    *
    * @param {*} e
    * @returns
    */
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

   //Ensures That We Are Automatically Viewing mOst Recent Message
   useEffect(() => {
      if (messagesRef.current) {
         messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
      }
   }, [messages]);

   /**
    * Fetch Messages Upon Changing Conversations
    */
   useEffect(() => {
      if (conversationContext.current !== null) {
         setLoading();
         getMessages(conversationContext.current.conversation_id);
      }
   }, [conversationContext.current]);

   //Updates Our Conversation Mesage When We Change Current Conversation
   useEffect(() => {
      //On Initial Render, We Should Update State With Messages From Our
      if (!conversationMessages || conversationMessages.length == 0) {
         setConversationMessages(messages);
         let msgIds = null;
         if (messages && messages.length > 0) {
            msgIds = messages.map((m) => {
               return m.message_id;
            });
         }
         setMessageIds(msgIds);
      } else {
         let messageToAdd = messages[messages.length - 1];
         let isPresent = false;
         //If Message Already In Conversation Messages (Ensures We Don't Add Message Twice)
         if (messageIds && messageIds.length > 0) {
            //ensure message Ids has entries
            for (let i = 0; i < messageIds.length; i++) {
               if (messageToAdd.message_id === messageIds[i]) {
                  isPresent = true;
               }
            }
         }
         if (!isPresent) {
            setConversationMessages([
               ...conversationMessages,
               messages[messages.length - 1],
            ]);
         }
      }
   }, [messages]);

   useEffect(() => {}, [messages?.length, conversationMessages]);

   //Recieving A New Message
   useEffect(() => {
      console.log("WE HAVE RECEIVED A NEW MESSAGE");
      console.log(conversationContext.recentConversation);
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
            let foundUser = users.filter(
               (u) => u.user_id === latestRecentMessage.senderId
            );

            //Updating Latest Message Profile Image For Sender
            const updatedLatestMessage = {
               ...latestRecentMessage,
               sender: {
                  profileImage: foundUser[0]?.profileImage,
               },
            };

            console.log("UPDATED LATES TMESSGES");
            console.log(updatedLatestMessage);

            //Ensuring That We Don't Render Auth User Mesasge Twice
            if (user.user_id !== latestRecentMessage.senderId) {
               setConversationMessages((prevConversationMessages) => [
                  ...(prevConversationMessages || []),
                  updatedLatestMessage,
               ]);

               //Determine If We SHould Show This Date Or Not
               if (
                  conversationMessages > 1 &&
                  conversationMessages[conversationMessages.length - 2]
               ) {
                  let previousMessageDate =
                     conversationMessages[conversationMessages.length - 2]
                        .sendDate;

                  let res = dayDifference(
                     new Date(previousMessageDate),
                     new Date(updatedLatestMessage.sendDate)
                  );
                  console.log("DAY DIFFERENCE  IN SHOWDATE()");
                  console.log(res);
                  setShowDate(res);
               }
            }
         }
      }
   }, [conversationContext.recentConversation]);

   //Return Renderable JSX
   if (loading == true) {
      return <Loading></Loading>; //spinner for messages loads
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
