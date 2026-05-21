import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GradientButton } from "../ui/GradientButton";
import { StepIndicator } from "./StepIndicator";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  ArrowLeft,
  KeyRound
} from "lucide-react";

import api from "../../services/api";

export function SignupForm() {

  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 FORM DATA
  const [formData, setFormData] = useState({

    email: "",

    password: "",

    name: "",

    mobile: "",

    role: "user",

    // ✅ NEW
    collegeCode: ""

  });

  // 🔥 HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // NEXT STEP
  const nextStep = () => {
    setStep((s) => Math.min(s + 1, 3));
  };

  // PREVIOUS STEP
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  // 🔥 FINAL SUBMIT
  const handleSubmit = async () => {

    try {

      setIsLoading(true);

      // VALIDATION
      if (
        !formData.email ||
        !formData.password ||
        !formData.name ||
        !formData.collegeCode
      ) {

        alert("Please fill all fields");

        return;

      }

      const res = await api.post(
        "/auth/signup",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err: any) {

      alert(
        err.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setIsLoading(false);

    }
  };

  const variants = {

    enter: {
      x: 50,
      opacity: 0
    },

    center: {
      x: 0,
      opacity: 1
    },

    exit: {
      x: -50,
      opacity: 0
    }

  };

  return (

    <div className="w-full max-w-md mx-auto p-6">

      {/* HEADER */}
      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>

        <p className="text-gray-500">
          Join DigiYantra to manage your assets
        </p>

      </div>

      {/* STEP INDICATOR */}
      <StepIndicator
        currentStep={step}
        totalSteps={3}
      />

      <div className="relative overflow-hidden min-h-[350px]">

        <AnimatePresence mode="wait">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (

            <motion.div
              key="step1"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >

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

              <GradientButton
                onClick={nextStep}
                className="w-full"
              >

                Continue

                <ArrowRight className="ml-2 w-4 h-4" />

              </GradientButton>

            </motion.div>

          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (

            <motion.div
              key="step2"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >

              {/* FULL NAME */}
              <div>

                <label className="text-sm font-medium">
                  Full Name
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 border rounded-xl"
                    placeholder="John Doe"
                  />

                </div>

              </div>

              {/* COLLEGE CODE */}
              <div>

                <label className="text-sm font-medium">
                  College Code
                </label>

                <div className="relative">

                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    name="collegeCode"
                    value={formData.collegeCode}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 border rounded-xl"
                    placeholder="ABC123"
                  />

                </div>

              </div>

              {/* ROLE */}
              <div>

                <label className="text-sm font-medium">
                  Role
                </label>

                <div className="relative">

                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 border rounded-xl bg-white"
                  >

                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                    <option value="service">
                      Service Team
                    </option>

                  </select>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                <GradientButton
                  variant="outline"
                  onClick={prevStep}
                >

                  <ArrowLeft className="mr-2 w-4 h-4" />

                  Back

                </GradientButton>

                <GradientButton onClick={nextStep}>

                  Continue

                  <ArrowRight className="ml-2 w-4 h-4" />

                </GradientButton>

              </div>

            </motion.div>

          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (

            <motion.div
              key="step3"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">

                <h3 className="font-semibold text-orange-700 mb-2">
                  Review Details
                </h3>

                <p><b>Name:</b> {formData.name}</p>

                <p><b>Email:</b> {formData.email}</p>

                <p><b>Role:</b> {formData.role}</p>

                <p><b>College Code:</b> {formData.collegeCode}</p>

              </div>

              <div className="flex gap-3">

                <GradientButton
                  variant="outline"
                  onClick={prevStep}
                >

                  <ArrowLeft className="mr-2 w-4 h-4" />

                  Back

                </GradientButton>

                <GradientButton
                  onClick={handleSubmit}
                  isLoading={isLoading}
                >

                  Create Account

                </GradientButton>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

      {/* LOGIN LINK */}
      <div className="mt-8 text-center text-sm">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-orange-600 font-semibold"
        >

          Sign in

        </Link>

      </div>

    </div>
  );
}