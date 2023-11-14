import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../../context/users/userContext";
import UserItem from "./UserItem";
import FilterUsers from "./FilterUsers";

const Users = ({ onClose, isCreateConversation }) => {
   const { users, filtered } = useContext(UserContext);

   return users ? (
      <Fragment>
         {/* <div className="grid grid-cols-2 gap-4">
            {users?.map((user) => (
               <UserItem key={user.user_id} user={user} onClose={onClose} />
            ))}
         </div> */}
         <div className="grid grid-cols-2 gap-4">
            {filtered !== null
               ? filtered &&
                 filtered?.map((user) => (
                    <UserItem
                       key={user.user_id}
                       user={user}
                       onClose={onClose}
                       isCreateConversation={isCreateConversation}
                    />
                 ))
               : users &&
                 users?.map((user) => (
                    <UserItem
                       key={user.user_id}
                       user={user}
                       onClose={onClose}
                       isCreateConversation={isCreateConversation}
                    />
                 ))}
         </div>
      </Fragment>
   ) : (
      ""
   );
};

export default Users;
