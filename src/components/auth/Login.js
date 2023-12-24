import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
   /**
    * =========================
    * REACT HOOKS
    * ========================
    */
   const navigate = useNavigate();

   /**
    * =========================
    * CONTEXT AND GLOBAL STATES
    * ========================
    */
   const { loginUser, error, isAuthenticated, clearErrors } =
      useContext(AuthContext);
   const { setAlert } = useContext(AlertContext);

   /**
    * =========================
    * LOCAL STATES
    * ========================
    */
   const [user, setUser] = useState({
      username: "",
      password: "",
   });

   //De-Strucutre Users Local State (Credentials )
   const { username, password } = user;

   //On Change Udpates Local State Holding Value Of Credentials
   const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   //On Submit Function For Submission of Credentials
   const onSubmit = (e) => {
      e.preventDefault(); //prevent default form submit
      /**
       * @TODO: Make This Server Side Error Handling Instead of Client Side Checking
       *
       * Ensures Users Enters Username and Password
       */
      if (username === "" || password == "") {
         setAlert("Please Enter A Username And Password", "danger");
      }
      //Attempt To Log User In
      else {
         loginUser({
            username: username,
            password: password,
         });
      }
   };

   //Load Home Page If User Succesfully Logs In
   useEffect(() => {
      if (isAuthenticated) {
         navigate("/");
      }
   }, [isAuthenticated]);

   //Set Error On Incorrect Login
   useEffect(() => {
      if (error) {
         setAlert(error, "danger");
         clearErrors();
      }
   }, [error]);

   //Return Renderable JSX
   return (
      <div className="text-center rounded-xl py-10 my-10 max-w-[450px] m-auto bg-slate-200 border-2 border-slate-400">
         <h1 className="text-3xl pb-8 text-slate-800">
            Account <span className="text-sky-500">Login</span>
         </h1>
         <form action="">
            <div className="flex items-center mb-7">
               <label
                  className="w-[100px] text-left pl-5 text-slate-800"
                  htmlFor="username"
               >
                  Username
               </label>
               <input
                  className="mx-2 flex-1 py-0.5 rounded-md text-base border-2 border-solid border-slate-400"
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
               />
            </div>
            <div className="flex items-center mb-7">
               <label
                  className="w-[100px] text-left pl-5 text-slate-800"
                  htmlFor="password"
               >
                  Password
               </label>
               <input
                  className="mx-2 py-0.5 flex-1 rounded-md text-base border-2 border-solid border-slate-400"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
               />
            </div>
            <input
               type="submit"
               onClick={onSubmit}
               value="Login"
               className="inline-block font-semibold px-3 py-2 rounded-lg bg-sky-500 text-slate-800 cursor-pointer transition-colors ease-in border border-sky-500 text-lg mr-2 hover:bg-transparent hover:duration-300 hover:border-2 hover:border-sky-500 hover:text-sky-500"
            />
         </form>
      </div>
   );
};

export default Login;
