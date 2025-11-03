import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const History = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/history`, {
          withCredentials: true,
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          Your Search History
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven’t searched for anything yet.
          </p>
        ) : (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Search Term</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {item.term}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
