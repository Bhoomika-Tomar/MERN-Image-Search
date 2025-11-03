import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TopSearchesBanner() {
  const [topSearches, setTopSearches] = useState([]);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/top-searches`, {
          withCredentials: true,
        });
        setTopSearches(res.data || []);
      } catch (err) {
        console.error("Error fetching top searches:", err);
      }
    };

    fetchTopSearches();
  }, []);

  if (!topSearches.length) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm py-2 shadow">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-2">
        <span className="font-semibold">🔥 Top Searches:</span>
        {topSearches.map((item, idx) => (
          <span
            key={idx}
            className="bg-white/20 hover:bg-white/30 cursor-pointer px-2 py-1 rounded-full text-xs transition"
            title={`${item.count} searches`}
          >
            {item.term}
          </span>
        ))}
      </div>
    </div>
  );
}
