import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";
import { signIn } from "@/firebase/google";
import { MdMoneyOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

/**
 * redirect if user has logged in
 */
const useRedirect = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && user) {
      router.push("/create");
    }
  });
};

const SignInButton: React.FC<{
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}> = ({ children, title, onClick }) => {
  return (
    <button
      className="w-full border-2 rounded flex items-center justify-center p-1 gap-1.5"
      onClick={onClick}
    >
      {children}
      <div className="text-lg">{title}</div>
    </button>
  );
};

export default function Home() {
  useRedirect();
  return (
    <div className="flex flex-col items-center m-auto p-6 gap-4">
      <div className="h-[10vh]" />
      <div>
        <MdMoneyOff className="text-7xl my-6" />
      </div>
      <div className="text-3xl font-bold mb-2">Sign In</div>

      <SignInButton title="Continue with Google" onClick={signIn}>
        <FcGoogle className="text-lg" />
      </SignInButton>

      <hr className="w-full my-2" />

      <div className="text-sm font-thin mt-[-0.25rem] flex flex-col items-center">
        Secured by Firebase
        <a
          className="underline"
          href="https://firebase.google.com/docs/auth#key_capabilities"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
