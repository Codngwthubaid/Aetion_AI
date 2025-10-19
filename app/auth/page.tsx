"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative overflow-hidden"
      >
        <Image
          src="/login-bg.jpg" // ✅ replace with your image (e.g., /assets/login.jpg)
          alt="Login background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-8">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold"
          >
            Welcome to Aetion AI
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg text-gray-200 max-w-md"
          >
            Empowering intelligence with seamless AI-driven solutions.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Section - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center bg-white"
      >
        <div className="max-w-md w-full p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Sign in to Aetion AI
          </h2>
          <p className="text-gray-500 mb-8">
            Sign in with your Google account to continue
          </p>

          <Button
            variant="default"
            className="w-full py-6 text-base font-medium flex items-center justify-center gap-3"
          >
            <Image
              src="/google-icon.svg" // ✅ replace with your Google icon
              alt="Google Icon"
              width={24}
              height={24}
            />
            Login with Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
