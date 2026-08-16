
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/AppContext";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

const Shipping = ({ onSelectAddress }) => {
  const { addresses, getAddresses } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    getAddresses();
  }, []);

  // Send selected address to parent
  const handleSelect = (address) => {
    setSelectedAddress(address);

    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  return (
    <div
      className="
        max-w-3xl
        mx-auto
        p-6
        space-y-6

        text-gray-900 dark:text-white

        transition-colors duration-300
      "
    >
      {/* ================= ADDRESS FORM ================= */}
      <AddressForm onAddressAdded={getAddresses} />

      {/* ================= TITLE ================= */}
      <h2
        className="
          text-xl
          font-semibold
          text-gray-900 dark:text-white
        "
      >
        Select an Address
      </h2>

      {/* ================= ADDRESS LIST ================= */}
      <AddressList
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelect={handleSelect}
      />

      {/* ================= INFO ================= */}
      <p
        className="
          text-sm
          text-gray-500 dark:text-gray-400
          mt-2
        "
      >
        Select address and continue from checkout page
      </p>
    </div>
  );
};

export default Shipping;