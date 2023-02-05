import { useState, useEffect } from "react";
import { auth } from "@/firebase/google";
import { User } from "firebase/auth";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setUser(null);
      setLoading(false);
      return;
    }

    console.log("dbg authState: ", authState);

    setLoading(true);
    setUser(authState);
    setLoading(false);
  };

  // listen for firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}
