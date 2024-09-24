import { useState } from "react";
import { createUser } from "../app/utils"; 

export default function CreateUser() {
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
      // Call the createUser function from utils.js
      const transaction = await createUser(name, favNumber);
      setSuccess("User created successfully!");
      console.log("Transaction:", transaction);
    } catch (err) {
      setError(
        "Failed to create user. Please check the console for more details."
      );
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto mt-8 px-4">
        <div className="w-full max-w-md mx-auto border border-black rounded-lg overflow-hidden">
          <div className="p-4 border-b border-black">
            <h2 className="text-2xl font-bold">Create User</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="username"
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="favNumber"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Favorite Number
                </label>
                <input
                  id="favNumber"
                  type="number"
                  value={favNumber}
                  onChange={(e) => setFavNumber(e.target.value)}
                  placeholder="Favorite Number"
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {success && <p className="mt-4 text-green-500">{success}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}
