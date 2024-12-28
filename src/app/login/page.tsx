'use client'
import React from 'react';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-center">
          Sign In
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
