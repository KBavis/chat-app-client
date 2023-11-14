import axios from "axios";

const setAuthToken = (token) => {
   try {
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
         delete axios.defaults.headers.common["Authorization"];
      }
   } catch (error) {
      console.error(`Error Setting Auth Token: ${token}`);
   }
};

const removeAuthToken = (token) => {
   try {
      if (localStorage.token) {
         delete axios.defaults.headers.common["Authorization"];
      }
   } catch (error) {
      console.error("Error Removing Auth Token");
   }
};

export default setAuthToken;
