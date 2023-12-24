import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
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
   const { register, isAuthenticated, error, clearErrors } =
      useContext(AuthContext);
   const { alerts, setAlert } = useContext(AlertContext);

   /**
    * =========================
    * LOCAL STATES
    * ========================
    */
   const [user, setUser] = useState({
      name: "",
      username: "",
      password: "",
      password2: "",
   });

   //Navigate To Home Page If Succesful Registration
   useEffect(() => {
      if (isAuthenticated) {
         navigate("/");
      }
   }, [isAuthenticated]);

   //Set Error Alert When Error Registering
   useEffect(() => {
      if (error) {
         setAlert(error, "danger");
         clearErrors();
      }
   }, [error]);

   const { name, username, password, password2 } = user;

   //On Submit Button To Handle New Registration
   const onSubmit = async (e) => {
      e.preventDefault(); //prevent default form submission
      const firstNameLastName = name.split(" ");
      /**
       * @TODO Move This Client Side Checking To Server Side Error
       *
       * Ensure That Name Is Filled Out
       */
      if (firstNameLastName[0] === "" || firstNameLastName[1] === "") {
         setAlert("Please Enter A First And LastName", "danger");
      } else if (password !== password2) {
         /**
          * @TODO Move This Client Side Checking To Server Side Error
          *
          * Ensure That Passwords Match, Or Alert User And Clear Form
          *  */
         setAlert("Pasword's don't match, please try again", "danger");
         setUser({ ...user, password: "", password2: "" });
      }
      //Else, Attempt New Registration
      else {
         register({
            firstname: firstNameLastName[0],
            lastname: firstNameLastName[1],
            username,
            password,
         });
      }
   };

   //On Change Function To Update Local States
   const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   //Return Renderable JSX
   return (
      <div className="text-center rounded-xl py-10 my-10 max-w-[450px] m-auto bg-slate-200 border-2 border-slate-400">
         <h1 className="text-3xl pb-8 text-slate-800">
            Account <span className="text-sky-500">Register</span>
         </h1>
         <form action="">
            <div className="flex items-center mb-7">
               <label
                  className="w-[100px] text-left pl-5 text-slate-800"
                  htmlFor="name"
               >
                  Name
               </label>
               <input
                  className="mx-2 flex-1 py-0.5 rounded-md text-base border-2 border-solid border-slate-400"
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
               />
            </div>
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
            <div className="flex items-center mb-7">
               <label
                  className="w-[100px] text-left pl-5 text-slate-800"
                  htmlFor="password2"
               >
                  Confirm Password
               </label>
               <input
                  type="password"
                  name="password2"
                  value={password2}
                  className="mx-2 py-0.5 flex-1 rounded-md border-2 border-solid border-slate-400 text-base"
                  onChange={onChange}
               />
            </div>
            <input
               onClick={onSubmit}
               type="submit"
               value="Register"
               className="inline-block font-semibold px-3 py-2 rounded-2xl bg-sky-500 text-slate-800 cursor-pointer transition-colors ease-in border border-sky-500 text-lg mr-2 hover:bg-transparent hover:duration-300 hover:border-2 hover:border-sky-500 hover:text-sky-500"
            />
         </form>
      </div>
   );
};

export default Register;
