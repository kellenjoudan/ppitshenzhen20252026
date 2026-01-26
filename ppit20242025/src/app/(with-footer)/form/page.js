"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#7E0C0E] text-white p-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mt-10 mb-6">
        <div>
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-semibold">{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500 text-red-400 rounded-full text-sm hover:bg-red-500/10 transition"
        >
          Log out
        </button>
      </div>

      {/* Form content */}
      <h1 className="text-2xl font-bold">Form</h1>
    </div>
  );
}
