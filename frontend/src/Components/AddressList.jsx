
import React from "react";

const AddressList = ({ addresses, selectedAddress, onSelect }) => {
  if (!addresses || addresses.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        No addresses found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((addr) => {
        const isSelected = selectedAddress?._id === addr._id;

        return (
          <div
            key={addr._id}
            className={`
              border
              p-4
              rounded
              shadow-sm
              flex
              items-center
              gap-3

              transition-colors duration-200

              ${
                isSelected
                  ? `
                    border-green-600
                    bg-green-50
                    dark:border-green-500
                    dark:bg-green-950/40
                  `
                  : `
                    border-gray-200
                    dark:border-gray-700
                    bg-gray-50
                    dark:bg-gray-800
                  `
              }
            `}
          >
            {/* RADIO BUTTON */}
            {onSelect && (
              <input
                type="radio"
                name="shippingAddress"
                checked={isSelected}
                onChange={() => onSelect(addr)}
                className="
                  w-4
                  h-4
                  accent-green-600
                  cursor-pointer
                  flex-shrink-0
                "
              />
            )}

            {/* ADDRESS DETAILS */}
            <div
              className="
                text-gray-800
                dark:text-gray-200
                text-sm
                leading-6
              "
            >
              {/* NAME */}
              <p>
                <strong className="text-gray-900 dark:text-white">
                  {addr.fullName}
                </strong>
              </p>

              {/* ADDRESS */}
              <p>
                {addr.address}, {addr.city}, {addr.state},{" "}
                {addr.country} - {addr.pincode}
              </p>

              {/* PHONE */}
              <p>
                <span className="font-medium">
                  Phone:
                </span>{" "}
                {addr.phoneNumber || addr.phone}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;