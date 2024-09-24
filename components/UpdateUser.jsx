import { useState } from "react";
import { updateUser } from "../app/utils"; 

export default function UpdateUserForm() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [favNumber, setFavNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Call the updateUser function from utils.js
      const transaction = await updateUser(userId, name, favNumber);
      setSuccess("User update successfully!");
      console.log("Transaction:", transaction);
    } catch (err) {
      setError(
        "Failed to update user. Please check the console for more details."
      );
      console.error(err);
    }

    setLoading(false);
  };
  return (
    <div className="w-full mt-6 max-w-md mx-auto border border-black rounded-lg overflow-hidden bg-white text-black">
      <div className="p-4 border-b border-black">
        <h2 className="text-2xl font-bold">updateUser</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-black mb-1">
              ID
            </label>
            <input
              id="id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="enter ID"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter Name"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="favNumber" className="block text-sm font-medium text-black mb-1">
              Fav Number
            </label>
            <input
              id="favNumber"
              type="text"
              value={favNumber}
              onChange={(e) => setFavNumber(e.target.value)}
              placeholder="favNumber"
              className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
            disabled={loading}
          >
             {loading ? "Updating..." : "Update User"}
          </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
            {success && <p className="mt-4 text-green-500">{success}</p>}
      </form>
    </div>
  )
}