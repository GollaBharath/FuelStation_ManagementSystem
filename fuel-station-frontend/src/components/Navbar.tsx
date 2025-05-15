// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// src/components/Navbar.tsx
import { useAuth } from "../context/useAuth"; // ← your hook

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth(); // ← get auth state & actions
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();          // clears token & updates context
    navigate("/login");
  };

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/30 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex-shrink-0 text-xl font-bold text-purple-700">
            SRIKRISHNA FILLING STATION
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-white/20">
                Home
              </Link>
              {!isLoggedIn && (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-white/20">
                    Login
                  </Link>
                  <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-white/20">
                    Register
                  </Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-white/20">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-white/20"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 space-y-1 bg-white/30 backdrop-blur-lg">
          <Link to="/" className="block text-purple-700 py-2 hover:bg-white/20">Home</Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="block text-purple-700 py-2 hover:bg-white/20">Login</Link>
              <Link to="/register" className="block text-purple-700 py-2 hover:bg-white/20">Register</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="block text-purple-700 py-2 hover:bg-white/20">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 py-2 hover:bg-white/20"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

