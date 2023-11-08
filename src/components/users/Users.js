import React, { Fragment, useContext, useEffect } from "react";
import UserContext from "../../context/users/userContext";
import UserItem from "./UserItem";

const Users = () => {
   const { users, getUsers, loading, filtered } = useContext(UserContext);
   useEffect(() => {
      getUsers();
   }, [users]);

   return users ? (
      <Fragment>
         {users?.map((user) => (
            <UserItem key={user.user_id} user={user} />
         ))}
      </Fragment>
   ) : (
      ""
   );
};

export default Users;
