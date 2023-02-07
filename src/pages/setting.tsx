import React from "react";
import { signOut } from "@/firebase/google";
import { useProtectedRoute } from "@/hooks/auth";

export default function Setting() {
  const { user } = useProtectedRoute();

  if (!user) return null;

  return (
    <div className="flex flex-col items-center m-auto p-6 gap-4">
      <div className="h-[10vh]" />
      <img src={user?.photoURL ?? ""} alt="" className="rounded-full" />
      <div className="text-xl">{user?.displayName}</div>
      <button
        className="w-full border-2 rounded flex items-center justify-center p-1 gap-1.5 border-rose-500 text-white bg-rose-500"
        onClick={signOut}
      >
        SIGN OUT
      </button>
    </div>
  );
}
