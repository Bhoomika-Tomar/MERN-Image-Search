import React from "react";

const Login = () => {
  const SERVER_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleLogin = (provider) => {
    window.open(`${SERVER_URL}/auth/${provider}`, "_self");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-6">Login to Continue</h1>

        <button
          onClick={() => handleLogin("google")}
          className="w-full bg-red-500 text-white py-2 rounded-lg mb-4 hover:bg-red-600"
        >
          Continue with Google
        </button>

        <button
          onClick={() => handleLogin("github")}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
