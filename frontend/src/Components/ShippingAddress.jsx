import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppState";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

const ShippingAddress = () => {
  const { addresses, getAddresses } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => { getAddresses(); }, [getAddresses]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shipping Addresses</h2>

      <AddressForm onAddressAdded={getAddresses} />

      <h3 className="text-xl font-semibold mt-6 mb-4">Saved Addresses</h3>
      {addresses.length === 0 && <p>No saved addresses yet.</p>}

      {addresses.length > 0 && (
        <AddressList addresses={addresses} selectedAddress={selectedAddress} onSelect={setSelectedAddress} />
      )}

      <button disabled={!selectedAddress} className={`mt-4 w-full py-2 px-4 rounded text-white font-semibold ${selectedAddress ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>
        Continue to Payment
      </button>
    </div>
  );
};

export default ShippingAddress;