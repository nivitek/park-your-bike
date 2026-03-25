import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Logged in Successfully! 🎉</h2>
        <p className="mt-2">You can start booking your slot.</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/Main")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
