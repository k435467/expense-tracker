import React from "react";
import { useRouter } from "next/router";
import { signOut } from "@/firebase/google";
import { useAuth } from "@/utils/auth";
import { theme } from "@/utils";

export default function Setting() {
  const router = useRouter();
  const { user } = useAuth();

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
      <div className="text-center text-slate-300">
        version &#10; 48d3feae62b8485527eb5430b8c9ce4b151e1ce6
      </div>
    </div>
  );
}
