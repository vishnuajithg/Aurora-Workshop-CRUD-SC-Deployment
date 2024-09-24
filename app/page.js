"use client"
import CreateUser from "@/components/CreateUser";
import DeleteUserForm from "@/components/DeleteUser";
import UpdateUserForm from "@/components/UpdateUser";
import GetUserForm from "@/components/GetUser";
import UserCountButton from "@/components/GetUsersButton"
import { connectWithMetamask } from "./utils"

export default function Home() {
  return (
    <div className="bg-white p-3">
      <nav className="flex justify-between items-center p-4 bg-black text-white rounded">
        <h1 className="text-2xl font-bold">My App</h1>
        <button className="px-8 font-semibold py-2 border border-white text-white hover:bg-white hover:text-black transition-colors">
          Connect Wallet
        </button>
      </nav>
      <div className="grid grid-cols-3">
        <CreateUser />
        <DeleteUserForm />
        <UpdateUserForm />
        <GetUserForm />
        <UserCountButton />
      </div>

    </div>
  );
}
