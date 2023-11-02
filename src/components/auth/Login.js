import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { useNavigate } from "react-router-dom";

//@TOOD Add Username/Email Attribute To The REST API for Register/Logging In
const Login = () => {
   const navigate = useNavigate();
   const { loginUser, error, isAuthenticated, clearErrors } =
      useContext(AuthContext);
   const { setAlert } = useContext(AlertContext);
   const [user, setUser] = useState({
      username: "",
      password: "",
   });

   //@TODO Add On Submit To Make a Request to API

   const { username, password } = user;

   const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      if (username === "" || password == "") {
         setAlert("Please Enter A Username And Password", "danger");
      } else {
         loginUser({
            username: username,
            password: password,
         });
      }
   };

   useEffect(() => {
      if (isAuthenticated) {
         navigate("/");
      }

      if (error) {
         setAlert(error, "danger");
         clearErrors();
      }
   }, [isAuthenticated, error]);

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
