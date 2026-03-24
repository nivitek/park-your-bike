import React, { useState, useEffect } from "react";
import ProfileUpdated from "../PopUps/ProfileUpdatedPopUp";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    vehiclenumber: "",
    password: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      console.log("Auth", token);
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser({
            name: data.name,
            email: data.email,
            phone: data.phone,
            vehiclenumber: data.vehiclenumber,
            password: data.password,
          });
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (response.ok) {
        window.dispatchEvent(new Event("storage"));
        setIsUpdated(true);
      } else {
        alert(`Error: ${data.message}`);
        // setIsUpdated(false);
      }
    } catch (error) {
      setIsUpdated(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-4 rounded-lg shadow relative m-10 p-6">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Employee Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                required
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-50 border border-gray-300 p-2.5 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Employee Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={user.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-50 border border-gray-300 p-2.5 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Mobile Number
              </label>
              <input
                type="text"
                name="phone"
                required
                value={user.phone}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-50 border border-gray-300 p-2.5 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehiclenumber"
                required
                value={user.vehiclenumber}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-50 border border-gray-300 p-2.5 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Update Password
              </label>
              <input
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-50 border border-gray-300 p-2.5 text-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 text-white bg-indigo-600 hover:bg-indigo-800 px-5 py-2.5 rounded-lg text-sm font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>
      {isUpdated && <ProfileUpdated />}
    </>
  );
}
