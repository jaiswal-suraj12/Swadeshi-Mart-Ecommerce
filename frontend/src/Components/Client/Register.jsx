import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { userRegister } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handlerSubmitButton = async (e) => {
    e.preventDefault();

    const success = await userRegister(
      name,
      email,
      phone,
      password,
      address,
      role
    );

    console.log(success);

    if (success) {
      navigate("/login");
    }
  };

  const inputClass = `
    w-full
    border
    border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    p-2
    rounded

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
      <form
        onSubmit={handlerSubmitButton}
        className="
          flex
          flex-col
          gap-4

          max-w-md
          w-full

          bg-white dark:bg-gray-900

          border
          border-gray-200 dark:border-gray-700

          p-6
          rounded-2xl

          shadow-lg
          dark:shadow-black/40

          transition-colors duration-300
        "
      >
        {/* ================= TITLE ================= */}
        <h1
          className="
            text-4xl
            font-extrabold
            text-center

            bg-gradient-to-r
            from-blue-500
            to-purple-600

            text-transparent
            bg-clip-text

            mb-6
          "
        >
          Register Page
        </h1>

        {/* ================= NAME ================= */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className={inputClass}
        />

        {/* ================= EMAIL ================= */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className={inputClass}
        />

        {/* ================= PASSWORD ================= */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={inputClass}
        />

        {/* ================= PHONE ================= */}
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone"
          className={inputClass}
        />

        {/* ================= ADDRESS ================= */}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className={inputClass}
        />

        {/* ================= ROLE ================= */}
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className={inputClass}
        />

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          className="
            bg-blue-500
            text-white

            py-2
            rounded

            hover:bg-blue-600

            transition
          "
        >
          Submit
        </button>

        {/* ================= LOGIN ================= */}
        <div className="mt-4 text-center">
          <p
            className="
              text-sm
              text-gray-500 dark:text-gray-400
              mb-2
            "
          >
            Already registered?
          </p>

          <Link to="/login">
            <button
              type="button"
              className="
                w-full
                py-2

                border
                border-blue-500

                text-blue-500

                rounded

                hover:bg-blue-500
                hover:text-white

                transition
              "
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;