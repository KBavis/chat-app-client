import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import one from "../../images/default.jpg";
import AlertContext from "../../context/alert/alertContext";

const UserProfile = ({ modalOpen, onClose }) => {
   //Fetch Authenticated User
   const { user, updateUser, error } = useContext(AuthContext);

   //Set Alerts
   const { setAlert } = useContext(AlertContext);

   // Destructure User
   const { firstName, lastName, userName, profileImage, user_id } = user;

   //Default State If No Img Is Set For Authenticated User
   const defaultState = {
      image: one,
      name: firstName + " " + lastName,
      username: userName,
   };

   //Conditionally Use Default State If Profile Image is Null
   const [updates, setUpdates] = useState(
      !profileImage
         ? defaultState
         : {
              image: profileImage,
              name: firstName + " " + lastName,
              username: userName,
           }
   );

   //State to track new profile image file
   const [imageFile, setImageFile] = useState(null);

   //State to track if the image file was change
   const [imageUpdated, setImageUpdated] = useState(false);

   const { name, username, image } = updates;

   const onChange = (e) => {
      setUpdates({ ...updates, [e.target.name]: e.target.value });
   };

   const onImageChange = (e) => {
      const file = e.target.files[0]; // Get the selected file
      setImageFile(file);
      setImageUpdated(true);
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setUpdates({
               ...updates,
               image: reader.result,
            });
         };
         reader.readAsDataURL(file);
      }
   };

   const onSubmit = (e) => {
      e.preventDefault();
      let names = updates.name.split(" ");
      let updatedUser = {
         userName: updates.username,
         firstName: names[0],
         lastName: names[1],
      };
      updateUser(updatedUser, imageFile, imageUpdated, user_id);
      setImageUpdated(false);
      if (!error) {
         setAlert("Successfully updated user profile", "success");
      }
      onClose();
   };
   return modalOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
         <div className=" bg-white h-[600px] w-[600px] p-8 rounded shadow-lg overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-3xl underline font-bold m-auto text-sky-500">
                  Edit Profile
               </h2>
               <span onClick={onClose} className="cursor-pointer text-3xl">
                  &times;
               </span>
            </div>
            <form action="">
               <div className="flex items-center flex-col text-lg mt-10">
                  <img
                     src={image} // Display the current image
                     className="m-auto w-[144px] h-[144px] rounded-full object-cover object-top border-sky-500 border-2"
                     alt="User Image"
                  />
                  <input
                     type="file"
                     accept=".jpg, .jpeg, .png"
                     onChange={onImageChange}
                     className="flex flex-col text-sm mt-3 mx-auto"
                  />
               </div>
               <div className="flex items-center text-lg justify-between mt-10">
                  <label
                     htmlFor="name"
                     className="w-[150px] text-left font-bold text-sky-500 text-xl"
                  >
                     Name
                  </label>
                  <input
                     type="text"
                     className="bg-gray-100 rounded-md w-full outline-none border-none px-2 py-1 mb-1"
                     name="name"
                     value={name}
                     onChange={onChange}
                  />
               </div>
               <div className="flex items-center text-lg justify-between mt-10">
                  <label
                     htmlFor="name"
                     className="w-[150px] text-left font-bold text-sky-500 text-xl"
                  >
                     Username
                  </label>
                  <input
                     type="text"
                     className="bg-gray-100 rounded-md w-full outline-none border-none px-2 py-1 mb-1"
                     value={username}
                     name="username"
                     onChange={onChange}
                  />
               </div>
               <div className="flex justify-center items-center mt-10 px-2 py-1">
                  <button
                     onClick={onSubmit}
                     className="p-4 rounded-xl bg-sky-500 font-medium text-lg text-white border-[1px] duration-300 ease-in border-sky-500 hover:bg-transparent hover:text-sky-500"
                     type="submit"
                  >
                     Submit
                  </button>
               </div>
            </form>
         </div>
      </div>
   ) : (
      ""
   );
};

export default UserProfile;
