// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AppContext from "../../Context/AppContext";

// function Login() {
//   const navigate = useNavigate();
//   const { loginUserAndAdmin } = useContext(AppContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   // Handle login
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const role = await loginUserAndAdmin(email, password);
//       console.log("role", role);

//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
//           Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         {message && <p className="mt-4 text-center text-red-600">{message}</p>}

//         {/* ✅ Register Button */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500 mb-2">
//             Don’t have an account?
//           </p>
//           <Link to="/register">
//             <button className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
//               Register
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";

function Login() {
  const navigate = useNavigate();
  const { loginUserAndAdmin } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const role = await loginUserAndAdmin(email, password);
      console.log("role", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please try again.");
    }
  };

  const inputClass = `
    w-full
    border
    border-gray-300 dark:border-gray-600
    rounded
    px-3
    py-2

    bg-white dark:bg-gray-800
    text-gray-900 dark:text-white

    placeholder-gray-400 dark:placeholder-gray-500

    focus:outline-none
    focus:ring-2
    focus:ring-blue-500

    transition-colors duration-200
  `;

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        p-4

        bg-gray-100 dark:bg-gray-950

        transition-colors duration-300
      "
    >
      <div
        className="
          w-full
          max-w-md

          bg-white dark:bg-gray-900

          border
          border-gray-200 dark:border-gray-700

          shadow-lg
          dark:shadow-black/40

          rounded-2xl
          p-6

          transition-colors duration-300
        "
      >
        {/* ================= TITLE ================= */}
        <h2
          className="
            text-2xl
            font-bold
            mb-4
            text-center

            text-gray-800 dark:text-white
          "
        >
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* ================= EMAIL ================= */}
          <div>
            <label
              className="
                block
                text-gray-700 dark:text-gray-200
                mb-1
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* ================= PASSWORD ================= */}
          <div>
            <label
              className="
                block
                text-gray-700 dark:text-gray-200
                mb-1
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* ================= LOGIN BUTTON ================= */}
          <button
            type="submit"
            className="
              w-full
              py-2

              bg-blue-600
              hover:bg-blue-700

              text-white

              rounded

              transition
            "
          >
            Login
          </button>
        </form>

        {/* ================= ERROR MESSAGE ================= */}
        {message && (
          <p
            className="
              mt-4
              text-center
              text-red-600 dark:text-red-400
            "
          >
            {message}
          </p>
        )}

        {/* ================= REGISTER ================= */}
        <div className="mt-6 text-center">

          <p
            className="
              text-sm
              text-gray-500 dark:text-gray-400
              mb-2
            "
          >
            Don’t have an account?
          </p>

          <Link to="/register">
            <button
              type="button"
              className="
                w-full
                py-2

                border
                border-blue-600

                text-blue-600
                dark:text-blue-400

                rounded

                hover:bg-blue-600
                hover:text-white

                transition
              "
            >
              Register
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;