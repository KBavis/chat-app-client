import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Profile from "./components/pages/Profile";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import ConversationsState from "./context/conversations/ConversationsState";

const App = () => {
   return (
      <AuthState>
         <ConversationsState>
            <Router>
               <Fragment>
                  <Navbar />
                  <div className="p-0 box-border m-auto overflow-hidden font-roboto h-full">
                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                     </Routes>
                  </div>
               </Fragment>
            </Router>
         </ConversationsState>
      </AuthState>
   );
};

export default App;
