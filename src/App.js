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
import MessageState from "./context/messages/MessageState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/alert/Alert";

const App = () => {
   return (
      <AlertState>
         <AuthState>
            <ConversationsState>
               <MessageState>
                  <Router>
                     <Fragment>
                        <Navbar />
                        <div className="p-0 box-border m-auto overflow-hidden font-roboto h-full">
                           <Alerts />
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
               </MessageState>
            </ConversationsState>
         </AuthState>
      </AlertState>
   );
};

export default App;
