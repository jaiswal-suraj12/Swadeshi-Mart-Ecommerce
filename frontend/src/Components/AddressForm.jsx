import React, { useState, useContext } from "react";
import AppContext from "../Context/AppContext";
import { toast } from "react-toastify";

const AddressForm = ({ onAddressAdded }) => {
  const { addAddress } = useContext(AppContext);

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const success = await addAddress(form);

      if (success) {
        toast.success("Address saved successfully");

        setForm({
          fullName: "",
          address: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          phoneNumber: "",
        });

        if (onAddressAdded) onAddressAdded();
      } else {
        setError("Unable to save address. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full
    px-4
    py-3
    rounded-lg
    border
    border-gray-300 dark:border-gray-600
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition-colors duration-200
  `;

  return (
    <div
      className="
        max-w-2xl
        mx-auto
        bg-white dark:bg-gray-900
        border
        border-gray-200 dark:border-gray-700
        shadow-lg
        dark:shadow-black/30
        rounded-2xl
        p-6
        text-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      {/* TITLE */}
      <h2
        className="
          text-2xl
          font-semibold
          mb-4
          text-gray-800 dark:text-white
        "
      >
        Shipping Address
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          text-sm
          text-gray-500 dark:text-gray-400
          mb-6
        "
      >
        Please enter your delivery details carefully.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ERROR */}
        {error && (
          <div
            className="
              bg-red-100 dark:bg-red-950
              text-red-600 dark:text-red-400
              border
              border-red-200 dark:border-red-800
              p-3
              rounded
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* FULL NAME + PHONE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* ADDRESS */}
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
          required
          className={inputClass}
        />

        {/* CITY + STATE + PINCODE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Postal Code"
            value={form.pincode}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* COUNTRY */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className={inputClass}
        />

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full
            py-3
            rounded-xl
            font-semibold
            transition-all
            duration-200

            ${
              loading
                ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed text-white"
                : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            }
          `}
        >
          {loading ? "Saving Address..." : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;