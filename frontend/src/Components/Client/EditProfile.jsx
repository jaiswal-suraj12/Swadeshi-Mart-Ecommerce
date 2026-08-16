// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../../Context/AppContext";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const {
//     userProfile,
//     getUserProfile,
//     updateProfile,
//   } = useContext(AppContext);

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   useEffect(() => {
//     if (userProfile) {
//       setFormData({
//         name: userProfile.name || "",
//         email: userProfile.email || "",
//         phone: userProfile.phone || "",
//         address: userProfile.address || "",
//       });

//       setPreview(userProfile.profilePic || "");
//     }
//   }, [userProfile]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("phone", formData.phone);
//     data.append("address", formData.address);

//     if (image) {
//       data.append("profilePic", image);
//     }

//     const res = await updateProfile(data);

//     if (res?.success) {
//       alert("Profile Updated Successfully");
//       navigate("/profile");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

//       <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Edit Profile
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div className="flex justify-center">

//             <label className="cursor-pointer">

//               <img
//                 src={
//                   preview ||
//                   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                 }
//                 alt="profile"
//                 className="w-28 h-28 rounded-full object-cover border-2"
//               />

//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={handleImage}
//               />

//             </label>

//           </div>

//           <div>
//             <label className="font-medium">
//               Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-2 mt-1"
//             />
//           </div>

//           <div>
//             <label className="font-medium">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-2 mt-1"
//             />
//           </div>

//           <div>
//             <label className="font-medium">
//               Phone
//             </label>

//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-2 mt-1"
//             />
//           </div>

//           <div>
//             <label className="font-medium">
//               Address
//             </label>

//             <textarea
//               name="address"
//               rows="3"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-2 mt-1"
//             />
//           </div>

//           <div className="flex justify-between">

//             <button
//               type="button"
//               onClick={() => navigate("/profile")}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//             >
//               Save Changes
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default EditProfile;
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const {
    userProfile,
    getUserProfile,
    updateProfile,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });

      setPreview(userProfile.profilePic || "");
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);

    if (image) {
      data.append("profilePic", image);
    }

    const res = await updateProfile(data);

    if (res?.success) {
      alert("Profile Updated Successfully");
      navigate("/profile");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        p-6

        bg-gray-100
        dark:bg-gray-950

        transition-colors
        duration-300
      "
    >
      <div
        className="
          bg-white
          dark:bg-gray-900

          border
          border-gray-200
          dark:border-gray-700

          rounded-xl
          shadow-lg
          dark:shadow-black/30

          p-8
          w-full
          max-w-lg

          transition-colors
          duration-300
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-2xl
            font-bold
            text-center
            mb-6

            text-gray-900
            dark:text-white
          "
        >
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className="
                  w-28
                  h-28
                  rounded-full
                  object-cover

                  border-2
                  border-gray-300
                  dark:border-gray-600

                  transition-colors
                  duration-300
                "
              />

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label
              className="
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-2
                mt-1

                bg-white
                dark:bg-gray-800

                text-gray-900
                dark:text-white

                border-gray-300
                dark:border-gray-600

                placeholder-gray-400
                dark:placeholder-gray-500

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                transition-colors
                duration-300
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-2
                mt-1

                bg-white
                dark:bg-gray-800

                text-gray-900
                dark:text-white

                border-gray-300
                dark:border-gray-600

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                transition-colors
                duration-300
              "
            />
          </div>

          {/* PHONE */}
          <div>
            <label
              className="
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-2
                mt-1

                bg-white
                dark:bg-gray-800

                text-gray-900
                dark:text-white

                border-gray-300
                dark:border-gray-600

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                transition-colors
                duration-300
              "
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label
              className="
                font-medium
                text-gray-700
                dark:text-gray-200
              "
            >
              Address
            </label>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-2
                mt-1

                bg-white
                dark:bg-gray-800

                text-gray-900
                dark:text-white

                border-gray-300
                dark:border-gray-600

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                transition-colors
                duration-300
              "
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between">

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="
                bg-gray-500
                hover:bg-gray-600

                dark:bg-gray-700
                dark:hover:bg-gray-600

                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700

                dark:bg-blue-500
                dark:hover:bg-blue-600

                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              Save Changes
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;