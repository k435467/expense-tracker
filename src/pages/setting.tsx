import React from "react";
import { useRouter } from "next/router";
import { signOut } from "@/firebase/google";
import { useAuth } from "@/utils/auth";
import { theme } from "@/utils";
import { clearRecordsCache } from "@/utils/firestore";

export default function Setting() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut().then(() => {
      clearRecordsCache();
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
        version &#10; 1841b0bbd511490e940adf2e4c5389ff31607b05
      </div>
    </div>
  );
}
