import React from "react";
import { useNavigate } from "react-router-dom";

const RegisteredUser = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Account Created Successfully! 🎉</h2>
        <p className="mt-2">You can now log in with your credentials.</p>
        <button
          onClick={() => navigate("/Login")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RegisteredUser;
