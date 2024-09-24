"use client";
import { useState } from "react";
import { deleteUser } from "../app/utils"; 

export default function DeleteUserForm() {
  const [userId, setUserId] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const tx = await deleteUser(userId);
      setSuccessMessage(`User with ID ${userId} deleted successfully.`);
      console.log("User deletion transaction:", tx);
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border mt-8 border-black rounded-lg overflow-hidden bg-white text-black">
      <div className="p-4 border-b border-black">
        <h2 className="text-2xl font-bold">Delete User</h2>
      </div>
      <form onSubmit={handleDelete} className="p-4">
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
            placeholder="ID Number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </div>
  );
}
