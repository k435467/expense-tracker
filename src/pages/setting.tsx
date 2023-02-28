import React from "react";
import { useRouter } from "next/router";
import { signOut } from "@/firebase/google";
import { useProtectedRoute } from "@/utils/auth";
import { theme } from "@/utils";

export default function Setting() {
  const router = useRouter();
  const { user } = useProtectedRoute();

  const handleSignOut = () => {
    signOut().then(() => {
      router.push("/");
    });
  };

  if (!user) return null;

  return (
    <div className="m-auto flex flex-col items-center gap-4 p-6">
      <div className="h-[10vh]" />
      <img src={user?.photoURL ?? ""} alt="" className="rounded-full" />
      <div className="text-xl">{user?.displayName}</div>
      <button
        className={`w-full text-white ${theme.btn} ${theme.bDangerous} ${theme.bgDangerous}`}
        onClick={handleSignOut}
      >
        SIGN OUT
      </button>
    </div>
  );
}
