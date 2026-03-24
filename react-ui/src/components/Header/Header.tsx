import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by checking localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // User is logged in
    } else {
      setIsAuthenticated(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate("/");
  };

  // Return null or loading state if authentication check is in progress
  if (isAuthenticated === null) {
    return null; // Or you can render a loading spinner here if preferred
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Park Your Bike</span>
            <img alt="Logo" src="/logoipsum-336.svg" className="h-8 w-auto" />
          </a>
        </div>

        {/* Conditionally render buttons or profile icon */}
        {!isAuthenticated ? (
          <>
            <Link to="/Register">
              <button
                className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Sign Up
              </button>
            </Link>
            <Link to="/Login">
              <button className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* Profile Icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src="/assets/images/profile-icon.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 ring-1 ring-black ring-opacity-5">
                <Link
                  to="/Profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <img
                    src="/assets/images/updateprofile-icon.jpg"
                    alt="Update Profile"
                    className="w-5 h-5 inline-block mr-2"
                  />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <img
                    src="/assets/images/logout.jpg"
                    alt="Logout"
                    className="w-5 h-5 inline-block mr-2"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
