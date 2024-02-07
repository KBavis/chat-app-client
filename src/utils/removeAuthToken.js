import axios from "axios";

/**
 * Remove JWT Authentication Token from Headers
 *
 * @param {string} token
 */
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
