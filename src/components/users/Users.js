import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../../context/users/userContext";
import UserItem from "./UserItem";

/**
 *
 * @param {function} onClose - function to close this modal
 * @param {function} setMenuOpen - function to open a modal
 * @param {boolean} isCreateConversation - determines whether this is for creating a conversation
 * @returns
 */
const Users = ({ onClose, isCreateConversation, setMenuOpen }) => {
   //Users Global Context
   const { users, filtered } = useContext(UserContext);

   //return renderable JSX
   return users ? (
      <Fragment>
         <div className="grid grid-cols-2 gap-4">
            {filtered !== null //return filtered user if non-null
               ? filtered &&
                 filtered?.map((user) => (
                    <UserItem
                       key={user.user_id}
                       user={user}
                       onClose={onClose}
                       isCreateConversation={isCreateConversation}
                       setMenuOpen={setMenuOpen}
                    />
                 ))
               : users &&
                 users?.map(
                    (
                       user //return non-filtered users
                    ) => (
                       <UserItem
                          key={user.user_id}
                          user={user}
                          onClose={onClose}
                          isCreateConversation={isCreateConversation}
                          setMenuOpen={setMenuOpen}
                       />
                    )
                 )}
         </div>
      </Fragment>
   ) : (
      ""
   );
};

export default Users;
