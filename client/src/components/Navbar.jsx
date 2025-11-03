import React from 'react';
import api from '../utils/api';

export default function Navbar({ user, onUserChange }) {
  async function logout() {
    try {
      await api.get('/auth/logout', { withCredentials: true });
      if (typeof onUserChange === 'function') {
        onUserChange(null); //  clear user state in parent
      }
      window.location.href = '/login'; // redirect cleanly
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Image Search</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
              )}
              <div className="text-sm">{user.name || user.displayName}</div>
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 text-sm">
              <a
                className="px-3 py-1 bg-blue-600 text-white rounded"
                href="http://localhost:5000/auth/google"
              >
                Google
              </a>
              <a
                className="px-3 py-1 bg-gray-800 text-white rounded"
                href="http://localhost:5000/auth/github"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
