import React from 'react';
import { motion } from 'framer-motion';
export function GeometricIllustration() {
  return (
    <div className="relative w-full h-full bg-gray-50 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50 opacity-50" />

      {/* Animated Shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />


      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-teal-400 opacity-10 blur-3xl" />


      {/* Sharp Geometric Elements */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1
        }}
        className="absolute top-[20%] left-[15%] w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 shadow-xl rotate-12 z-10" />


      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1,
          delay: 0.2
        }}
        className="absolute bottom-[30%] right-[20%] w-32 h-32 rounded-full border-4 border-teal-500/30 z-10" />


      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute top-[40%] right-[30%] w-16 h-16 border-2 border-orange-300 transform rotate-45 z-0" />


      <div className="absolute bottom-10 left-10 z-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Manage Assets <br /> with Confidence
        </h2>
        <p className="text-gray-600 max-w-xs">
          Streamline your device tracking and complaint resolution in one
          beautiful dashboard.
        </p>
      </div>
    </div>);

}