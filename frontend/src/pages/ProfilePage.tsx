import { useState } from "react";
import { motion } from "framer-motion";

import {
  Camera,
  Mail,
  Phone,
  User,
  Save,
  MapPin,
  Briefcase,
  Shield,
  Building2,
} from "lucide-react";

import { Card } from "../components/ui/Card";
import { GradientButton } from "../components/ui/GradientButton";

export function ProfilePage() {

  const [isLoading, setIsLoading] = useState(false);

  // ✅ GET LOGGED-IN USER
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  // ✅ USER DETAILS
  const [firstName, setFirstName] = useState(
    user?.name?.split(" ")[0] || ""
  );

  const [lastName, setLastName] = useState(
    user?.name?.split(" ").slice(1).join(" ") || ""
  );

  const [email] = useState(
    user?.email || ""
  );

  const [phone, setPhone] = useState(
    user?.mobile || ""
  );

  const [bio, setBio] = useState(
    ""
  );

  // ✅ SAVE PROFILE
  const handleSave = () => {

    setIsLoading(true);

    // 🔥 UPDATE LOCAL USER
    const updatedUser = {

      ...user,

      name: `${firstName} ${lastName}`,

      mobile: phone

    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setTimeout(() => {

      setIsLoading(false);

      alert("Profile updated successfully");

    }, 1000);

  };

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="max-w-6xl mx-auto space-y-6"

    >

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your personal information and account settings
          </p>

        </div>

        <GradientButton
          onClick={handleSave}
          isLoading={isLoading}
        >

          <Save className="w-4 h-4 mr-2" />

          Save Changes

        </GradientButton>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT PROFILE CARD ================= */}
        <Card className="lg:col-span-1">

          <div className="flex flex-col items-center text-center">

            {/* PROFILE IMAGE */}
            <div className="relative group">

              <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-r from-orange-500 to-red-500">

                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=ffffff&color=111827&size=256`}
                  alt={user?.name || "User"}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />

              </div>

              <button className="absolute bottom-2 right-2 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-orange-50 transition">

                <Camera className="w-4 h-4 text-orange-600" />

              </button>

            </div>

            {/* USER INFO */}
            <div className="mt-5">

              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name || "User"}
              </h2>

              <p className="capitalize text-gray-500 mt-1">
                {user?.role || "user"}
              </p>

            </div>

            {/* USER DETAILS */}
            <div className="w-full mt-6 border-t pt-6 space-y-4">

              <div className="flex items-center text-sm text-gray-700">

                <Shield className="w-4 h-4 mr-3 text-orange-500" />

                Role: {user?.role?.toUpperCase()}

              </div>

              <div className="flex items-center text-sm text-gray-700">

                <Building2 className="w-4 h-4 mr-3 text-orange-500" />

                College ID: {user?.collegeId || "N/A"}

              </div>

              <div className="flex items-center text-sm text-gray-700">

                <Briefcase className="w-4 h-4 mr-3 text-orange-500" />

                DigiYantra Member

              </div>

              <div className="flex items-center text-sm text-gray-700">

                <MapPin className="w-4 h-4 mr-3 text-orange-500" />

                India

              </div>

            </div>

          </div>

        </Card>

        {/* ================= RIGHT FORM CARD ================= */}
        <Card className="lg:col-span-2">

          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Personal Information
          </h3>

          <form className="space-y-6">

            {/* NAME ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* FIRST NAME */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />

                </div>

              </div>

              {/* LAST NAME */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />

              </div>

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed"
                />

              </div>

            </div>

            {/* PHONE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />

              </div>

            </div>

            {/* BIO */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>

              <textarea
                rows={5}
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                placeholder="Write something about yourself..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none resize-none"
              />

            </div>

          </form>

        </Card>

      </div>

    </motion.div>
  );
}