import React from 'react';
import { GeometricIllustration } from '../components/auth/GeometricIllustration';
import { LoginForm } from '../components/auth/LoginForm';
export function LoginPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:block w-[45%] relative">
        <GeometricIllustration />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>);

}