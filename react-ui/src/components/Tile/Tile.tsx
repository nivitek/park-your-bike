import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const currDate = new Date();
  const formatedDate = currDate.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = new Date().getMonth();
  const formatedMonth = monthNames[monthIndex];
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUserLogin = () => {
    if (isLoggedIn) {
      navigate("/Main");
    } else {
      navigate("/Login");
    }
  };
  const handleUserList = () => {
    if (isLoggedIn) {
      navigate("/Lists");
    } else {
      navigate("/Login");
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-10">
        <div className="rounded overflow-hidden shadow-lg">
          <div className="relative">
            <button onClick={handleUserLogin} style={{ cursor: "pointer" }}>
              <img
                className="w-full"
                src="/assets/images/ParkingTile.jpg"
                alt="Sunset in the mountains"
              />
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </button>
            <div className="absolute bottom-0 left-0 bg-blue-800 px-4 py-2 text-white text-sm">
              {15} Slots Available
            </div>
            <div className="text-sm absolute top-0 right-0 bg-blue-800 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
              <span className="font-bold">{formatedDate}</span>
              <small>{formatedMonth}</small>
            </div>
          </div>
          <div className="px-6 py-4">
            <button
              className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
              onClick={handleUserLogin}
            >
              Book Your Slot Today!
            </button>
            <p className="text-gray-500 text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta,
              quae?
            </p>
          </div>
          <div className="px-6 py-4 flex flex-row items-center">
            <button
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
              onClick={handleUserLogin}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg">
          <div className="relative">
            <button onClick={handleUserList} style={{ cursor: "pointer" }}>
              <img
                className="w-full"
                src="/assets/images/ParkingTile.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
                alt="Sunset in the mountains"
              />
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </button>
            <div className="absolute bottom-0 left-0 bg-blue-800 px-4 py-2 text-white text-sm">
              Slot List
            </div>

            <div className="text-sm absolute top-0 right-0 bg-blue-800 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3">
              <span className="font-bold">{formatedDate}</span>
              <small>{formatedMonth}</small>
            </div>
          </div>
          <div className="px-6 py-4">
            <button
              className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
              onClick={handleUserList}
            >
              Booked Slots List
            </button>
            <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="px-6 py-4 flex flex-row items-center">
            <button
              className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
              onClick={handleUserList}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
