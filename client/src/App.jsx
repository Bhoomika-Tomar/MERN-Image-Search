import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(undefined);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch user session on app load
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth/user`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data._id) {
          setUser(res.data); //  authenticated
        } else {
          setUser(null); //  not authenticated
        }
      })
      .catch(() => setUser(null));
  }, []);

  // While checking user status, prevent flicker
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              {/*  Pass setUser as onUserChange */}
              <Home user={user} onUserChange={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute user={user}>
              <History user={user} onUserChange={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
