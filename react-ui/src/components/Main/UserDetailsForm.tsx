import React, { useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  bikeMakeModel: string;
  bikeNumberPlate: string;
}

const UserDetailsForm = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    bikeMakeModel: "",
    bikeNumberPlate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="p-4 border-2 border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="tel"
          name="phone"
          value={userDetails.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="bikeMakeModel"
          value={userDetails.bikeMakeModel}
          onChange={handleChange}
          placeholder="Bike Model"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="bikeNumberPlate"
          value={userDetails.bikeNumberPlate}
          onChange={handleChange}
          placeholder="Bike Number Plate"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
