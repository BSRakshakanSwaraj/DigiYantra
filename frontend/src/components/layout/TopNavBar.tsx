import { useState, useEffect } from "react";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { AnimatedBadge } from "../ui/AnimatedBadge";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api";
import { UserRole } from "../../data/mockData";

interface TopNavBarProps {
  currentRole: UserRole;
  onNavigate: (view: string) => void;
}

export function TopNavBar({ currentRole, onNavigate }: TopNavBarProps) {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ get logged-in user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const res = await api.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotifications(res.data);

    } catch (err) {
      console.log("Notification fetch error", err);
    }

  };

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => handleNavClick("dashboard")}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-white font-bold text-xl">
                D
              </div>

              <span className="text-xl font-bold text-gradient-brand">
                DigiYantra
              </span>

            </Link>
          </div>


          {/* Right Actions */}
          <div className="flex items-center gap-6">

            {/* Notifications */}
            <button
              onClick={() => onNavigate("notifications")}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >

              <Bell className="w-6 h-6" />

              <div className="absolute top-1 right-1">
                <AnimatedBadge count={notifications.length} />
              </div>

            </button>


            {/* Profile Dropdown */}
            <div className="relative">

              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >

                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm ring-2 ring-gray-100"
                />

                <div className="hidden md:block text-left">

                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-500 capitalize">
                    {currentRole}
                  </p>

                </div>

                <ChevronDown className="w-4 h-4 text-gray-400" />

              </button>


              <AnimatePresence>

                {isProfileOpen && (

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                  >

                    <button
                      onClick={() => handleNavClick("profile")}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                    >
                      <User className="w-4 h-4 mr-3" /> Profile
                    </button>


                    <button
                      onClick={() => handleNavClick("settings")}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                    >
                      <Settings className="w-4 h-4 mr-3" /> Settings
                    </button>


                    <div className="h-px bg-gray-100 my-1" />


                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" /> Sign out
                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </nav>

  );

}