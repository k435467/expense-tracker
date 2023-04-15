import React, { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "@/firebase/google";
import { useAuth } from "@/utils/auth";
import { theme, themeModes } from "@/utils";
import { clearRecordsCache } from "@/utils/firestore";
import { Modal } from "@/components/Modal";
import { MdCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectThemeMode, setTheme } from "@/redux/themeSlice";

export default function Setting() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();
  const [openTheme, setOpenTheme] = useState(false);
  const { themeMode } = useAppSelector(selectThemeMode);

  const handleSignOut = () => {
    signOut().then(() => {
      clearRecordsCache();
      router.push("/");
    });
  };

  if (!user) return null;

  return (
    <div className="m-auto flex flex-col items-center gap-4 p-6">
      <div className="h-20" />
      <img
        src={user?.photoURL ?? ""}
        alt=""
        className="rounded-full"
        referrerPolicy="no-referrer"
      />
      <div className="text-xl">{user?.displayName}</div>
      <button
        className={`w-full text-white ${theme.btn} ${theme.bT} ${theme.bgDangerous}`}
        onClick={handleSignOut}
      >
        SIGN OUT
      </button>
      <button
        className={`w-full ${theme.btn}`}
        onClick={() => setOpenTheme(true)}
      >
        THEME
      </button>
      <a
        className="m-4 text-center text-slate-300 no-underline"
        href="https://github.com/k435467/expense-tracker"
      >
        version &#10; cee3bd7f83ccba7b82a4ac68fcb003198a9251bf
      </a>

      <Modal narrow onClose={() => setOpenTheme(false)} show={openTheme}>
        <div className="divide-y divide-solid divide-zinc-500">
          {themeModes.map((tm) => (
            <button
              key={tm}
              onClick={() => {
                setOpenTheme(false);
                dispatch(setTheme(tm));
              }}
              className="flex w-full items-center justify-center py-6 px-16 capitalize"
            >
              {tm}
              {themeMode === tm && (
                <MdCheck className="ml-1 mt-1 !text-blue-500" />
              )}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
