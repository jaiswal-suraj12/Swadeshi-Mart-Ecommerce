import React, { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { getUserProfile, userProfile } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-gray-100 dark:bg-gray-950
        flex
        justify-center
        items-center
        p-6
        transition-colors duration-300
      "
    >
      <div
        className="
          bg-white dark:bg-gray-900
          border
          border-gray-200 dark:border-gray-700
          shadow-lg
          dark:shadow-black/40
          rounded-xl
          w-full
          max-w-md
          p-8
          transition-colors duration-300
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-2xl
            font-bold
            text-center
            mb-6
            text-gray-900 dark:text-white
          "
        >
          My Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-6">
          <img
            src={
              userProfile?.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="
              w-24
              h-24
              rounded-full
              border
              border-gray-300 dark:border-gray-600
              object-cover
            "
          />
        </div>

        {/* USER INFO */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Name
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {userProfile?.name || "Loading..."}
            </p>
          </div>

          {/* EMAIL */}
          <div>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Email
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {userProfile?.email || "Loading..."}
            </p>
          </div>

          {/* PHONE */}
          <div>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Phone
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {userProfile?.phone || "Loading..."}
            </p>
          </div>

          {/* ADDRESS */}
          <div>
            <p
              className="
                text-gray-500
                dark:text-gray-400
                text-sm
              "
            >
              Address
            </p>

            <p
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              {userProfile?.address || "Not available"}
            </p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8 gap-4">

          {/* EDIT PROFILE */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="
              flex-1
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            Edit Profile
          </button>

          {/* MY ORDERS */}
          <button
            onClick={() => navigate("/orders")}
            className="
              flex-1
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-4
              py-2
              rounded-lg
              transition
            "
          >
            My Orders
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;