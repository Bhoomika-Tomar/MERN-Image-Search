import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchHistory() {
  const [history, setHistory] = useState([]);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/history`, {
          withCredentials: true,
        });
        setHistory(res.data || []);
      } catch (err) {
        console.error("Error fetching search history:", err);
      }
    };

    fetchHistory();
  }, []);

  if (!history.length)
    return (
      <p className="text-gray-500 text-center mt-10">
        No search history found yet.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
        🕒 Your Search History
      </h2>
      <ul className="divide-y divide-gray-200">
        {history.map((item) => (
          <li
            key={item._id}
            className="py-2 flex justify-between items-center text-gray-700"
          >
            <span>{item.term}</span>
            <span className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
