import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiClipboard,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size and manage sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setIsOpen(false); // Mobile: closed by default
      } else {
        setIsOpen(true); // Desktop: always open
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome className="w-5 h-5 md:w-6 md:h-6" />, path: "/dashboard" },
    { name: "Take Attendance", icon: <FiClipboard className="w-5 h-5 md:w-6 md:h-6" />, path: "/take-attendance" },
    { name: "Students", icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, path: "/students" },
    { name: "Reports", icon: <FiBarChart2 className="w-5 h-5 md:w-6 md:h-6" />, path: "/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('ams_user');
    navigate("/");
  };

  // Close sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile/tablet */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-[60] bg-[#0D1224] text-white p-2.5 rounded-lg shadow-lg hover:bg-[#1A2340] transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Overlay - Only on mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-[#0D1224] text-white
          flex flex-col py-4 md:py-6 justify-between
          rounded-r-2xl shadow-2xl
          transition-transform duration-300 ease-in-out
          w-64 z-50
          ${!isMobile ? "translate-x-0" : (isOpen ? "translate-x-0" : "-translate-x-full")}
        `}
      >
        {/* TOP AREA */}
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center px-4 mb-2">
            <div className="font-bold text-blue-500 text-2xl md:text-3xl">
              AMS
            </div>
          </div>

          {/* MENU */}
          <nav className="mt-6 md:mt-8 flex flex-col gap-3 md:gap-4">
            {menuItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    relative flex items-center gap-3 md:gap-4 
                    px-4 md:px-6 py-2.5 md:py-3 
                    mx-2 md:mx-3
                    rounded-xl transition-all
                    ${active 
                      ? "bg-white text-black shadow-md" 
                      : "text-white hover:bg-[#1A2340]"
                    }
                  `}
                >
                  {/* ICON */}
                  <span className="flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </span>

                  {/* NAME */}
                  <span className={`text-sm md:text-base font-medium whitespace-nowrap ${
                    active ? "text-black" : "text-white"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 md:px-6 py-2.5 md:py-3 mx-2 md:mx-3 mb-4 rounded-xl transition-all hover:bg-red-600 text-white"
        >
          <FiLogOut className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          <span className="text-sm md:text-base font-medium">Logout</span>
        </button>
      </div>

      {/* SPACING FOR CONTENT - Only on desktop */}
      {!isMobile && <div className="ml-64"></div>}
    </>
  );
};

export default Sidebar;