import React, { useState } from "react";
import axios from "axios";
import TopSearchesBanner from "../components/TopSearchesBanner";
import ImageGrid from "../components/ImageGrid";
import Navbar from "../components/Navbar";
import SearchHistory from "../components/SearchHistory"; 

const Home = ({ user, onUserChange }) => {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ---------- HANDLE SEARCH ----------
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/search`,
        { term },
        { withCredentials: true }
      );

      setImages(res.data.results || []);
      setMessage(
        `You searched for "${term}" — ${res.data.results.length} results.`
      );
    } catch (err) {
      console.error("Search error:", err);
      setMessage("❌ Please log in again or check your connection.");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------- TOGGLE IMAGE SELECTION ----------
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*  Pass onUserChange to Navbar */}
      <Navbar user={user} onUserChange={onUserChange} />

      <TopSearchesBanner />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 mb-6 justify-center"
        >
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for images..."
            className="w-full md:w-2/3 p-3 border rounded-lg shadow-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {message && (
          <p className="text-center text-gray-600 mb-4">{message}</p>
        )}

        {selected.length > 0 && (
          <div className="text-center text-lg font-semibold mb-4">
            Selected: {selected.length} images
          </div>
        )}

        {/* ✅ Prevent render errors while loading */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ImageGrid
            images={images}
            selected={selected}
            toggleSelect={toggleSelect}
          />
        )}

        
        <SearchHistory />
      </div>
    </div>
  );
};

export default Home;
