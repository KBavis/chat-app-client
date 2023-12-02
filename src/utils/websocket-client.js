const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

// Maintain a collection of stomp clients for different conversations
const stompClients = {};

const subscribeToConversation = async (conversation_id) => {
   // Check if stomp client for the conversation already exists
   if (!stompClients[conversation_id]) {
      const socket = new SockJS("/connect");
      const stompClient = Stomp.over(socket);

      stompClient.connect(
         {},
         (frame) => {
            console.log(`Connected to conversation ${conversation_id}:`, frame);

            let subscriptionUrl = `/topic/conversation/${conversation_id}`;

            // Subscribe to the specific conversation topic
            stompClient.subscribe(subscriptionUrl, (message) => {
               // Push message into frontend
               console.log(
                  `Received message for conversation ${conversation_id}:`,
                  message.body
               );
            });
         },
         (error) => {
            console.error(
               `Error connecting to conversation ${conversation_id}:`,
               error
            );
         }
      );

      // Store the stomp client in the collection
      stompClients[conversation_id] = stompClient;
   } else {
      console.log(`Already subscribed to conversation ${conversation_id}`);
   }
};

export default subscribeToConversation;
