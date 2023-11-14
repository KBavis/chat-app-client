import axios from "axios";

const removeAuthToken = (token) => {
   try {
      if (localStorage.token) {
         delete axios.defaults.headers.common["Authorization"];
      }
   } catch (error) {
      console.error("Error Removing Auth Token");
   }
};

export default removeAuthToken;
