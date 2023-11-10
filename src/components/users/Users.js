import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../../context/users/userContext";
import UserItem from "./UserItem";

const Users = ({ onClose }) => {
   const { users } = useContext(UserContext);

   return users ? (
      <Fragment>
         <div className="grid grid-cols-2 gap-4">
            {users?.map((user) => (
               <UserItem key={user.user_id} user={user} onClose={onClose} />
            ))}
         </div>
      </Fragment>
   ) : (
      ""
   );
};

export default Users;
