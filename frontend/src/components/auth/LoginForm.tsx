import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  KeyRound,
  Shield
} from "lucide-react";

import api from "../../services/api";

import { GradientButton } from "../ui/GradientButton";

export function LoginForm() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

      collegeCode: ""

    });

  // ====================================
  // HANDLE CHANGE
  // ====================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // ====================================
  // LOGIN
  // ====================================
const handleSubmit = async () => {

  try {

    setIsLoading(true);

    // ✅ CREATE PAYLOAD
    const payload: any = {

      email: formData.email,

      password: formData.password

    };

    // ✅ ONLY NORMAL USERS SEND COLLEGE CODE
    if (
      formData.email !==
      "superadmin@digiyantra.com"
    ) {

      payload.collegeCode =
        formData.collegeCode;

    }

    // ✅ LOGIN API
    const res = await api.post(

      "api/auth/login",

      payload

    );

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      res.data.token
    );

    // SAVE ROLE
    localStorage.setItem(
      "role",
      res.data.role.toLowerCase()
    );

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert("Login successful");

    // ROLE REDIRECT
    const role =
      res.data.role.toLowerCase();

    // SUPERADMIN
    if (role === "superadmin") {

      navigate("/superadmin");

    }

    // ADMIN
    else if (role === "admin") {

      navigate("/admin");

    }

    // SERVICE
    else if (role === "service") {

      navigate("/service");

    }

    // USER
    else {

      navigate("/user");

    }

  } catch (err: any) {

    console.log(err);

    alert(

      err.response?.data?.message ||

      "Login failed"

    );

  } finally {

    setIsLoading(false);

  }

};

  return (

    <div className="w-full max-w-md mx-auto p-6">

      {/* HEADER */}
      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">

          Welcome Back

        </h1>

        <p className="text-gray-500">

          Login to DigiYantra

        </p>

      </div>

      <div className="space-y-6">

        {/* EMAIL */}
        <div>

          <label className="text-sm font-medium">

            Email

          </label>

          <div className="relative">

            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-xl"
              placeholder="name@company.com"
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-sm font-medium">

            Password

          </label>

          <div className="relative">

            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-xl"
              placeholder="••••••••"
            />

          </div>

        </div>

        {/* COLLEGE CODE */}
        {formData.email !==
          "superadmin@digiyantra.com" && (

          <div>

            <label className="text-sm font-medium">

              College Code

            </label>

            <div className="relative">

              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                name="collegeCode"
                type="text"
                value={formData.collegeCode}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-xl"
                placeholder="ABC123"
              />

            </div>

          </div>

        )}

        {/* SUPER ADMIN NOTICE */}
        {formData.email ===
          "superadmin@digiyantra.com" && (

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700 flex items-center gap-2">

            <Shield className="w-4 h-4" />

            Super Admin login detected

          </div>

        )}

        {/* BUTTON */}
        <GradientButton
          onClick={handleSubmit}
          isLoading={isLoading}
          className="w-full"
        >

          Login

        </GradientButton>

      </div>

      {/* SIGNUP */}
      <div className="mt-8 text-center text-sm">

        Don't have an account?{" "}

        <Link
          to="/signup"
          className="text-orange-600 font-semibold"
        >

          Sign up

        </Link>

      </div>

    </div>
  );
}