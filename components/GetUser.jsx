"use client";
import { useState } from "react";
import { getUser } from "../app/utils"; 

export default function GetUserForm() {
  const [userId, setUserId] = useState(""); 
  const [userDetails, setUserDetails] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await getUser(userId);
      setUserDetails(user);
    } catch (err) {
      setError("Failed to fetch user details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border mt-6 border-black rounded-lg overflow-hidden bg-white text-black">
      <div className="p-4 border-b border-black">
        <h2 className="text-2xl font-bold">Get User</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-black mb-1"
          >
            ID
          </label>
          <input
            id="id"
            type="text"
            placeholder="Enter ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-emerald-600 transition-colors rounded"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get User"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userDetails && (
        <div className="mt-4 p-4 border-t border-black">
          <h3 className="text-lg font-bold">User Details</h3>
          <p>ID: {userDetails.id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Favorite Number: {userDetails.favNumber}</p>
        </div>
      )}
    </div>
  );
}
