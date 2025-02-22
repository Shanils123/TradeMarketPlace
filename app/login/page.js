"use client";

import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Register from "../../components/Register"; // Correct import
import Login from "../../components/Login";

const Page = () => {
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleGoogleSuccess = async (response) => {
    const res = await fetch("/api/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/marketplace");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full sm:w-[360px] space-y-6">
          <h2 className="text-center text-3xl font-semibold text-gray-900 mb-6">
            {showRegister ? "Create an Account" : "Sign In"}
          </h2>
          <div className="flex justify-between mb-6 text-sm">
            <button
              onClick={() => setShowRegister(false)}
              className={`${
                !showRegister ? "text-indigo-600" : "text-gray-400"
              } font-semibold hover:text-indigo-500`}
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className={`${
                showRegister ? "text-indigo-600" : "text-gray-400"
              } font-semibold hover:text-indigo-500`}
            >
              Register
            </button>
          </div>
          <div className="space-y-6">
            {showRegister ? <Register /> : <Login />}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {showRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setShowRegister(false)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Not a member?{" "}
                  <button
                    onClick={() => setShowRegister(true)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Create an account
                  </button>
                </>
              )}
            </p>
          </div>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={(error) => console.log("Google login failed:", error)}
              useOneTap
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Page;