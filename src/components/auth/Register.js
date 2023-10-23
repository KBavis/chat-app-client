import React, { useState } from "react";

//@TODO Add To REST API the need for username/email so a User can login
const Register = () => {
   const [user, setUser] = useState({
      name: "",
      password: "",
      password2: "",
   });

   //@TODO Add OnSubmit to request Registration to REST API

   const { name, password, password2 } = user;

   const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

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
               type="submit"
               value="Register"
               className="inline-block font-semibold px-3 py-2 rounded-2xl bg-sky-500 text-slate-800 cursor-pointer transition-colors ease-in border border-sky-500 text-lg mr-2 hover:bg-transparent hover:duration-300 hover:border-2 hover:border-sky-500 hover:text-sky-500"
            />
         </form>
      </div>
   );
};

export default Register;
